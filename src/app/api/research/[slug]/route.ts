import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-helpers";
import Research from "@/models/Research";

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().min(1).optional(),
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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();
    const { slug } = await params;
    const research = await Research.findOne({ slug }).lean();
    if (!research) return apiError("Research paper not found", 404);
    return apiSuccess(research);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to fetch research paper", 500);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin();
    await connectDB();
    const { slug } = await params;
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.message, 400);
    }
    const research = await Research.findOneAndUpdate(
      { slug },
      { $set: parsed.data },
      { new: true, runValidators: true },
    ).lean();
    if (!research) return apiError("Research paper not found", 404);
    return apiSuccess(research);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError(error instanceof Error ? error.message : "Failed to update research paper", 500);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin();
    await connectDB();
    const { slug } = await params;
    const research = await Research.findOneAndDelete({ slug }).lean();
    if (!research) return apiError("Research paper not found", 404);
    return apiSuccess({ message: "Research paper deleted" });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError(error instanceof Error ? error.message : "Failed to delete research paper", 500);
  }
}
