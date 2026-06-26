import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { apiSuccess, apiError, apiPaginated, parsePagination, sortOrder, requireAdmin } from "@/lib/api-helpers";
import Article from "@/models/Article";

const createSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().min(1),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const { page, limit, sort, order, skip } = parsePagination(searchParams);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const accessTier = searchParams.get("accessTier");

    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (accessTier) filter.accessTier = accessTier;

    const [articles, total] = await Promise.all([
      Article.find(filter)
        .sort({ [sort]: sortOrder(order) })
        .skip(skip)
        .limit(limit)
        .lean(),
      Article.countDocuments(filter),
    ]);

    return apiPaginated(articles, total, page, limit);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to fetch articles", 500);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    await connectDB();
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.message, 400);
    }
    const article = await Article.create(parsed.data);
    return apiSuccess(article, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError(error instanceof Error ? error.message : "Failed to create article", 500);
  }
}
