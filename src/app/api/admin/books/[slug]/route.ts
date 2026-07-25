import { z } from "zod"
import { connectDB } from "@/lib/mongodb"
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-helpers"
import Book from "@/models/Book"

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  label: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  image: z.string().optional(),
  href: z.string().min(1).optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  published: z.boolean().optional(),
})

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB()
    const { slug } = await params
    const book = await Book.findById(slug).lean()
    if (!book) return apiError("Book not found", 404)
    return apiSuccess(book)
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to fetch book", 500)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin()
    await connectDB()
    const { slug } = await params
    const body = await request.json()
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      return apiError(parsed.error.message, 400)
    }
    const book = await Book.findByIdAndUpdate(
      slug,
      { $set: parsed.data },
      { new: true, runValidators: true },
    ).lean()
    if (!book) return apiError("Book not found", 404)
    return apiSuccess(book)
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401)
    }
    return apiError(error instanceof Error ? error.message : "Failed to update book", 500)
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin()
    await connectDB()
    const { slug } = await params
    const book = await Book.findByIdAndDelete(slug).lean()
    if (!book) return apiError("Book not found", 404)
    return apiSuccess({ message: "Book deleted" })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401)
    }
    return apiError(error instanceof Error ? error.message : "Failed to delete book", 500)
  }
}
