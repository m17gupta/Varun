import { connectDB } from "@/lib/mongodb"
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-helpers"
import Video from "@/models/Video"
import { videoUpdateSchema } from "@/lib/store/videos/videoSchema"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB()
    const { id } = await params
    const video = await Video.findById(id).lean()
    if (!video) return apiError("Video not found", 404)
    return apiSuccess(video)
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to fetch video", 500)
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin()
    await connectDB()
    const { id } = await params
    const body = await request.json()
    const parsed = videoUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return apiError(parsed.error.issues[0]?.message ?? "Invalid update data", 400)
    }
    const video = await Video.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true },
    ).lean()
    if (!video) return apiError("Video not found", 404)
    return apiSuccess(video)
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401)
    }
    return apiError(error instanceof Error ? error.message : "Failed to update video", 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin()
    await connectDB()
    const { id } = await params
    const video = await Video.findByIdAndDelete(id).lean()
    if (!video) return apiError("Video not found", 404)
    return apiSuccess({ message: "Video deleted" })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401)
    }
    return apiError(error instanceof Error ? error.message : "Failed to delete video", 500)
  }
}
