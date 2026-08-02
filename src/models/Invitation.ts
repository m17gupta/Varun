import mongoose, { Schema, type Model, type Document } from "mongoose";

export type InvitationStatus = "new" | "contacted" | "closed";

export interface IInvitationDocument extends Document {
  name: string;
  email: string;
  phone?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  theme: string;
  status: InvitationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const InvitationSchema = new Schema<IInvitationDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    youtubeUrl: { type: String, trim: true },
    instagramUrl: { type: String, trim: true },
    theme: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true },
);

InvitationSchema.index({ email: 1 });
InvitationSchema.index({ status: 1, createdAt: -1 });

const Invitation =
  (mongoose.models.Invitation as Model<IInvitationDocument>) ??
  mongoose.model<IInvitationDocument>("Invitation", InvitationSchema);

export default Invitation;
