import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { apiSuccess, apiError } from "@/lib/api-helpers";
import Comment from "@/models/Comment";

const createSchema = z.object({
  pageId: z.string().optional(),
  slug: z.string().min(1),
  selector: z.string().optional(),
  offsetX: z.number().optional(),
  offsetY: z.number().optional(),
  content: z.string().optional(),
  status: z.enum(["open", "pending", "done"]).optional(),
  screenSize: z.enum(["mobile", "tablet", "desktop", "all"]).optional(),
});

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const filter: Record<string, unknown> = {};
    if (slug) filter.slug = slug;

    const comments = await Comment.find(filter)
      .sort({ createdAt: -1 })
      .lean();
    return apiSuccess(comments);
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Failed to fetch comments",
      500,
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.message, 400);
    }
    const comment = await Comment.create(parsed.data);
    return apiSuccess(comment, 201);
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Failed to create comment",
      500,
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Missing comment id", 400);

    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) return apiError("Comment not found", 404);

    return apiSuccess({ deleted: true });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Failed to delete comment",
      500,
    );
  }
}
