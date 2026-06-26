import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { apiSuccess, apiError, apiPaginated, parsePagination, sortOrder, requireAdmin } from "@/lib/api-helpers";
import Course from "@/models/Course";

const lessonSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  duration: z.number().optional(),
  content: z.string().optional(),
  order: z.number().int().nonnegative(),
});

const moduleSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  lessons: z.array(lessonSchema),
});

const createSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  coverImage: z.string().optional(),
  price: z.number().nonnegative(),
  stripePriceId: z.string().optional(),
  modules: z.array(moduleSchema).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  duration: z.number().positive(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  prerequisites: z.array(z.string()).optional(),
  learningOutcomes: z.array(z.string()).optional(),
});

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const { page, limit, sort, order, skip } = parsePagination(searchParams);
    const category = searchParams.get("category");
    const level = searchParams.get("level");

    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (level) filter.level = level;

    const [courses, total] = await Promise.all([
      Course.find(filter)
        .sort({ [sort]: sortOrder(order) })
        .skip(skip)
        .limit(limit)
        .lean(),
      Course.countDocuments(filter),
    ]);

    return apiPaginated(courses, total, page, limit);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to fetch courses", 500);
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
    const course = await Course.create(parsed.data);
    return apiSuccess(course, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError(error instanceof Error ? error.message : "Failed to create course", 500);
  }
}
