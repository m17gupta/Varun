import mongoose, { Schema, type Model, type Document } from "mongoose";

export interface INewsletterDocument extends Document {
  subject: string;
  slug: string;
  content: string;
  previewText?: string;
  published: boolean;
  scheduledAt?: Date;
  sentAt?: Date;
  openRate?: number;
  clickRate?: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSchema = new Schema<INewsletterDocument>(
  {
    subject: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    previewText: { type: String },
    published: { type: Boolean, default: false },
    scheduledAt: { type: Date },
    sentAt: { type: Date },
    openRate: { type: Number, default: 0, min: 0, max: 100 },
    clickRate: { type: Number, default: 0, min: 0, max: 100 },
    tags: [{ type: String, lowercase: true }],
  },
  { timestamps: true },
);

NewsletterSchema.index({ slug: 1 });
NewsletterSchema.index({ published: 1, sentAt: -1 });
NewsletterSchema.index({ scheduledAt: 1 });

const Newsletter =
  (mongoose.models.Newsletter as Model<INewsletterDocument>) ??
  mongoose.model<INewsletterDocument>("Newsletter", NewsletterSchema);

export default Newsletter;
