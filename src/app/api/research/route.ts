import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { apiSuccess, apiError, apiPaginated, parsePagination, sortOrder, requireAdmin } from "@/lib/api-helpers";
import Research from "@/models/Research";

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
  sources: z.array(z.object({
    title: z.string().min(1),
    url: z.string().optional(),
    author: z.string().optional(),
    publisher: z.string().optional(),
    year: z.number().optional(),
  })).optional(),
});

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const { page, limit, sort, order, skip } = parsePagination(searchParams);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (search) filter.title = { $regex: search, $options: "i" };

    const [research, total] = await Promise.all([
      Research.find(filter)
        .sort({ [sort]: sortOrder(order) })
        .skip(skip)
        .limit(limit)
        .lean(),
      Research.countDocuments(filter),
    ]);

    return apiPaginated(research, total, page, limit);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to fetch research papers", 500);
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
    const research = await Research.create(parsed.data);
    return apiSuccess(research, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError(error instanceof Error ? error.message : "Failed to create research paper", 500);
  }
}
