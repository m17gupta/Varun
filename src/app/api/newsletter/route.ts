import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { resend } from "@/lib/resend";
import { apiSuccess, apiError, apiPaginated, parsePagination, sortOrder, requireAdmin } from "@/lib/api-helpers";
import Newsletter from "@/models/Newsletter";
import Member from "@/models/Member";

const createSchema = z.object({
  subject: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  previewText: z.string().optional(),
  scheduledAt: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
});

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const { page, limit, sort, order, skip } = parsePagination(searchParams);

    const [issues, total] = await Promise.all([
      Newsletter.find({})
        .sort({ [sort]: sortOrder(order) })
        .skip(skip)
        .limit(limit)
        .lean(),
      Newsletter.countDocuments({}),
    ]);

    return apiPaginated(issues, total, page, limit);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to fetch newsletters", 500);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    await connectDB();
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.message, 400);
    }

    const issue = await Newsletter.create({
      ...parsed.data,
      scheduledAt: parsed.data.scheduledAt ? new Date(parsed.data.scheduledAt) : undefined,
    });

    const sendNow = body.sendNow ?? false;
    if (sendNow) {
      const subscribers = await Member.find({ newsletter: true }).lean();
      const emails = subscribers.map((s: { email: string }) => s.email);

      if (emails.length > 0 && resend) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: admin.email,
          bcc: emails,
          subject: parsed.data.subject,
          html: parsed.data.content,
        });
      }

      await Newsletter.findByIdAndUpdate(issue._id, {
        published: true,
        sentAt: new Date(),
      });
    }

    return apiSuccess(issue, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError(error instanceof Error ? error.message : "Failed to create newsletter", 500);
  }
}
