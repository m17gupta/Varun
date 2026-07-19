import { connectDB } from "@/lib/mongodb";
import { apiSuccess, apiError } from "@/lib/api-helpers";
import Comment from "@/models/Comment";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const comment = await Comment.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!comment) return apiError("Comment not found", 404);

    return apiSuccess(comment);
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Failed to update comment",
      500,
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
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
