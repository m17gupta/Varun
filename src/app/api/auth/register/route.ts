import { z } from "zod"
import { connectDB } from "@/lib/mongodb"
import { apiSuccess, apiError } from "@/lib/api-helpers"
import Member from "@/models/Member"

const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed"
      return apiError(firstError, 400)
    }

    const { name, email, password } = parsed.data

    await connectDB()

    const existing = await Member.findOne({ email }).select("_id")
    if (existing) {
      return apiError("An account with this email already exists", 409)
    }

    const member = await Member.create({ name, email, password })

    return apiSuccess(
      {
        id: member._id,
        name: member.name,
        email: member.email,
        role: member.role,
        tier: member.tier,
      },
      201,
    )
  } catch (error) {
    return apiError("Registration failed. Please try again.", 500)
  }
}
