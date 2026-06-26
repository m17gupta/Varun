import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { apiSuccess, apiError, apiPaginated, parsePagination, sortOrder, requireAdmin } from "@/lib/api-helpers";
import Video from "@/models/Video";

const createSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  videoUrl: z.string().min(1),
  thumbnail: z.string().optional(),
  duration: z.number().positive(),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  transcript: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const { page, limit, sort, order, skip } = parsePagination(searchParams);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (tag) filter.tags = tag;

    const [videos, total] = await Promise.all([
      Video.find(filter)
        .sort({ [sort]: sortOrder(order) })
        .skip(skip)
        .limit(limit)
        .lean(),
      Video.countDocuments(filter),
    ]);

    return apiPaginated(videos, total, page, limit);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to fetch videos", 500);
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
    const video = await Video.create(parsed.data);
    return apiSuccess(video, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError(error instanceof Error ? error.message : "Failed to create video", 500);
  }
}
