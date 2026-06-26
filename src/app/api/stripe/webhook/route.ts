import { connectDB } from "@/lib/mongodb";
import { getStripeServer } from "@/lib/stripe";
import { apiError } from "@/lib/api-helpers";
import Member from "@/models/Member";

export async function POST(request: Request) {
  try {
    const buf = await request.text();
    const sig = request.headers.get("stripe-signature");
    if (!sig) {
      return apiError("Missing stripe-signature header", 400);
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return apiError("STRIPE_WEBHOOK_SECRET not configured", 500);
    }

    let event;
    try {
      event = getStripeServer().webhooks.constructEvent(buf, sig, webhookSecret);
    } catch {
      return apiError("Invalid signature", 400);
    }

    await connectDB();

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as { metadata?: Record<string, string>; customer?: string; subscription?: string };
        const memberId = session.metadata?.memberId;
        if (memberId) {
          const update: Record<string, unknown> = {
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            subscriptionStatus: "active",
          };
          await Member.findByIdAndUpdate(memberId, { $set: update });
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as {
          customer?: string;
          id?: string;
          status?: string;
          items?: { data?: { price?: { product?: string } }[] };
        };
        const customerId = subscription.customer;
        const tier = mapSubscriptionToTier(subscription);
        const update: Record<string, unknown> = {
          stripeSubscriptionId: subscription.id,
          subscriptionStatus: subscription.status,
        };
        if (tier) update.tier = tier;
        await Member.findOneAndUpdate(
          { stripeCustomerId: customerId },
          { $set: update },
        );
        break;
      }

      case "customer.subscription.deleted": {
        const deletedSub = event.data.object as { customer?: string };
        await Member.findOneAndUpdate(
          { stripeCustomerId: deletedSub.customer },
          {
            $set: {
              subscriptionStatus: "canceled",
              tier: "free",
              stripeSubscriptionId: null,
            },
          },
        );
        break;
      }
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return apiError(
      error instanceof Error ? error.message : "Webhook processing failed",
      500,
    );
  }
}

function mapSubscriptionToTier(subscription: {
  items?: { data?: { price?: { product?: string } }[] };
}): string | null {
  const productId = subscription.items?.data?.[0]?.price?.product;
  if (!productId) return null;
  const productMap: Record<string, string> = {
    [process.env.STRIPE_MONTHLY_PRODUCT_ID ?? ""]: "monthly",
    [process.env.STRIPE_YEARLY_PRODUCT_ID ?? ""]: "yearly",
    [process.env.STRIPE_LIFETIME_PRODUCT_ID ?? ""]: "lifetime",
  };
  return productMap[productId] ?? null;
}
