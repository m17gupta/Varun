export type MemberRole = "admin" | "paid_member" | "free_member";

export type MembershipTier = "free" | "monthly" | "yearly" | "lifetime";

export type SubscriptionStatus =
  | "active"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "trialing"
  | "unpaid";

export interface ICourseProgress {
  courseId: string;
  completedLessons: string[];
  percentage: number;
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

export interface IMemberSession {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: MemberRole;
  tier: MembershipTier;
}
