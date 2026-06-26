import mongoose, { Schema, type Model, type Document } from "mongoose";
import bcrypt from "bcryptjs";

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
  courseId: mongoose.Types.ObjectId;
  completedLessons: string[];
  percentage: number;
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

export interface IMemberDocument extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: MemberRole;
  tier: MembershipTier;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStatus: SubscriptionStatus;
  courseProgress: ICourseProgress[];
  bio?: string;
  newsletter: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const CourseProgressSchema = new Schema<ICourseProgress>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    completedLessons: [{ type: String }],
    percentage: { type: Number, default: 0, min: 0, max: 100 },
    completed: { type: Boolean, default: false },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { _id: false },
);

const MemberSchema = new Schema<IMemberDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    image: { type: String },
    role: {
      type: String,
      enum: ["admin", "paid_member", "free_member"],
      default: "free_member",
    },
    tier: {
      type: String,
      enum: ["free", "monthly", "yearly", "lifetime"],
      default: "free",
    },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    subscriptionStatus: {
      type: String,
      enum: ["active", "past_due", "canceled", "incomplete", "trialing", "unpaid"],
      default: "incomplete",
    },
    courseProgress: [CourseProgressSchema],
    bio: { type: String },
    newsletter: { type: Boolean, default: true },
  },
  { timestamps: true },
);

MemberSchema.index({ email: 1 });
MemberSchema.index({ role: 1 });
MemberSchema.index({ stripeCustomerId: 1 });

MemberSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

MemberSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const Member =
  (mongoose.models.Member as Model<IMemberDocument>) ??
  mongoose.model<IMemberDocument>("Member", MemberSchema);

export default Member;
