import { z } from "zod"
import { connectDB } from "@/lib/mongodb"
import { apiSuccess, apiError, apiPaginated, parsePagination, requireAdmin } from "@/lib/api-helpers"
import Book from "@/models/Book"

const createSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  label: z.string().min(1),
  excerpt: z.string().min(1),
  image: z.string().optional(),
  href: z.string().min(1),
  featured: z.boolean().optional().default(false),
  order: z.number().optional().default(0),
  published: z.boolean().optional().default(true),
})

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const { page, limit, sort, order, skip } = parsePagination(searchParams)

    const filter: Record<string, unknown> = { type: "book" }

    const [books, total] = await Promise.all([
      Book.find(filter)
        .sort({ [sort]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Book.countDocuments(filter),
    ])

    return apiPaginated(books, total, page, limit)
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to fetch books", 500)
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    await connectDB()
    const body = await request.json()
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) {
      return apiError(parsed.error.message, 400)
    }
    const book = await Book.create(parsed.data)
    return apiSuccess(book, 201)
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401)
    }
    return apiError(error instanceof Error ? error.message : "Failed to create book", 500)
  }
}
