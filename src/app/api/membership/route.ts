import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { getStripeServer } from "@/lib/stripe";
import { apiSuccess, apiError, getAuthUser } from "@/lib/api-helpers";
import Member from "@/models/Member";

const checkoutSchema = z.object({
  priceId: z.string().min(1),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

const updateSchema = z.object({
  tier: z.enum(["free", "monthly", "yearly", "lifetime"]),
});

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) return apiError("Unauthorized", 401);
    await connectDB();
    const member = await Member.findById(user._id).lean();
    if (!member) return apiError("Member not found", 404);
    return apiSuccess(member);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to get membership info", 500);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return apiError("Unauthorized", 401);
    await connectDB();

    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.message, 400);
    }

    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await getStripeServer().customers.create({
        email: user.email,
        name: user.name,
        metadata: { memberId: String(user._id) },
      });
      stripeCustomerId = customer.id;
      await Member.findByIdAndUpdate(user._id, { stripeCustomerId });
    }

    const session = await getStripeServer().checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      line_items: [{ price: parsed.data.priceId, quantity: 1 }],
      success_url: parsed.data.successUrl,
      cancel_url: parsed.data.cancelUrl,
      metadata: { memberId: String(user._id) },
    });

    return apiSuccess({ url: session.url, sessionId: session.id });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to create checkout session", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return apiError("Unauthorized", 401);
    await connectDB();

    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.message, 400);
    }

    const member = await Member.findByIdAndUpdate(
      user._id,
      { tier: parsed.data.tier },
      { new: true },
    ).lean();

    return apiSuccess(member);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Failed to update membership", 500);
  }
}
