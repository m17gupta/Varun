import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { generateEmbedding, generateAnswer } from "@/lib/ai-search";
import { apiError } from "@/lib/api-helpers";
import Article from "@/models/Article";
import Research from "@/models/Research";

const searchSchema = z.object({
  query: z.string().min(1),
  generateAnswer: z.boolean().optional(),
  topK: z.number().int().min(1).max(20).optional(),
});

const encoder = new TextEncoder();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = searchSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.message, 400);
    }

    const { query, generateAnswer: shouldAnswer, topK = 5 } = parsed.data;
    await connectDB();

    const queryEmbedding = await generateEmbedding(query);

    const [articles, researchPapers] = await Promise.all([
      Article.find({ published: true }).lean(),
      Research.find({ published: true }).lean(),
    ]);

    const allContent: { id: string; text: string; embedding: number[]; source: string; slug: string; title: string }[] = [];

    for (const article of articles) {
      if ((article as unknown as Record<string, unknown>).embedding) {
        allContent.push({
          id: String(article._id),
          text: `${article.title}\n${article.excerpt}\n${article.content}`,
          embedding: (article as unknown as Record<string, unknown>).embedding as number[],
          source: "article",
          slug: article.slug,
          title: article.title,
        });
      }
    }

    for (const paper of researchPapers) {
      if ((paper as unknown as Record<string, unknown>).embedding) {
        allContent.push({
          id: String(paper._id),
          text: `${paper.title}\n${paper.excerpt}\n${paper.content}`,
          embedding: (paper as unknown as Record<string, unknown>).embedding as number[],
          source: "research",
          slug: paper.slug,
          title: paper.title,
        });
      }
    }

    function cosineSimilarity(a: number[], b: number[]): number {
      const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
      const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
      const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
      return dot / (magA * magB);
    }

    const scored = allContent
      .map((item) => ({
        ...item,
        score: cosineSimilarity(queryEmbedding, item.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    const results = scored.map((item) => ({
      id: item.id,
      type: item.source,
      title: item.title,
      excerpt: item.text.slice(0, 200),
      slug: item.slug,
      url: `/${item.source === "article" ? "articles" : "research"}/${item.slug}`,
      score: item.score,
    }));

    if (!shouldAnswer) {
      return Response.json({ success: true, results, total: results.length, query });
    }

    const contextChunks = scored.map((item) => ({
      text: item.text.slice(0, 2000),
      source: `${item.source === "article" ? "Article" : "Research"}: ${item.title}`,
    }));

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const header = JSON.stringify({
            success: true,
            results,
            total: results.length,
            query,
          }) + "\n";

          controller.enqueue(encoder.encode(header));

          const openai = (await import("openai")).default;
          const client = new openai.OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

          const context = contextChunks
            .map((c) => `Source (${c.source}):\n${c.text}`)
            .join("\n\n");

          const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are a knowledgeable assistant for Varun Gupta's knowledge platform. " +
                  "Answer the user's question based solely on the provided context. " +
                  "If the context doesn't contain enough information, say so. " +
                  "Cite specific sources when possible.",
              },
              { role: "user", content: `Context:\n${context}\n\nQuestion: ${query}` },
            ],
            temperature: 0.3,
            max_tokens: 1024,
            stream: true,
          });

          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          controller.enqueue(
            encoder.encode(`\n\n[Error generating answer: ${err instanceof Error ? err.message : "Unknown error"}]`),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Search failed", 500);
  }
}
