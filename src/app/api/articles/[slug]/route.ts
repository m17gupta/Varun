import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-helpers";
import Article from "@/models/Article";

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
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();
    const { slug } = await params;
    const article = await Article.findOne({ slug }).lean();
    if (!article) return apiError("Article not found", 404);
    return apiSuccess(article);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to fetch article", 500);
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
    const article = await Article.findOneAndUpdate(
      { slug },
      { $set: parsed.data },
      { new: true, runValidators: true },
    ).lean();
    if (!article) return apiError("Article not found", 404);
    return apiSuccess(article);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError(error instanceof Error ? error.message : "Failed to update article", 500);
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
    const article = await Article.findOneAndDelete({ slug }).lean();
    if (!article) return apiError("Article not found", 404);
    return apiSuccess({ message: "Article deleted" });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError(error instanceof Error ? error.message : "Failed to delete article", 500);
  }
}
