import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { apiSuccess, apiError, apiPaginated, parsePagination, sortOrder, requireAdmin } from "@/lib/api-helpers";
import Invitation from "@/models/Invitation";

const createSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  youtubeUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  theme: z.string().min(1),
});

export async function GET(request: Request) {
  try {
    await requireAdmin();
    await connectDB();
    const { searchParams } = new URL(request.url);
    const { page, limit, sort, order, skip } = parsePagination(searchParams);
    const status = searchParams.get("status");

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;

    const [invitations, total] = await Promise.all([
      Invitation.find(filter)
        .sort({ [sort]: sortOrder(order) })
        .skip(skip)
        .limit(limit)
        .lean(),
      Invitation.countDocuments(filter),
    ]);

    return apiPaginated(invitations, total, page, limit);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError(error instanceof Error ? error.message : "Failed to fetch invitations", 500);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.issues[0]?.message ?? "Invalid invitation data", 400);
    }
    const invitation = await Invitation.create(parsed.data);
    return apiSuccess(invitation, 201);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to save invitation", 500);
  }
}
