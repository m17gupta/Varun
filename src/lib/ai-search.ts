import OpenAI from "openai";

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAI();
  if (!openai) throw new Error("OPENAI_API_KEY not configured");
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
}

export async function searchContent(
  query: string,
  embeddedContent: { id: string; text: string; embedding: number[] }[],
  topK: number = 5,
) {
  const queryEmbedding = await generateEmbedding(query);

  const scored = embeddedContent.map((item) => {
    const score = cosineSimilarity(queryEmbedding, item.embedding);
    return { ...item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

export async function generateAnswer(
  query: string,
  contextChunks: { text: string; source: string }[],
): Promise<string> {
  const openai = getOpenAI();
  if (!openai) throw new Error("OPENAI_API_KEY not configured");

  const context = contextChunks
    .map((c) => `Source (${c.source}):\n${c.text}`)
    .join("\n\n");

  const response = await openai.chat.completions.create({
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
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion: ${query}`,
      },
    ],
    temperature: 0.3,
    max_tokens: 1024,
  });

  return response.choices[0]?.message?.content ?? "I couldn't generate an answer.";
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}
