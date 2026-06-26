import mongoose, { Schema, type Model, type Document } from "mongoose";

export type SpeakingType =
  | "keynote"
  | "workshop"
  | "panel"
  | "lecture"
  | "podcast"
  | "webinar"
  | "conference";

export interface ISpeakingDocument extends Document {
  title: string;
  slug: string;
  description: string;
  event: string;
  venue?: string;
  city?: string;
  country?: string;
  date: Date;
  endDate?: Date;
  url?: string;
  recordingUrl?: string;
  coverImage?: string;
  tags: string[];
  type: SpeakingType;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SpeakingSchema = new Schema<ISpeakingDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    event: { type: String, required: true },
    venue: { type: String },
    city: { type: String },
    country: { type: String },
    date: { type: Date, required: true },
    endDate: { type: Date },
    url: { type: String },
    recordingUrl: { type: String },
    coverImage: { type: String },
    tags: [{ type: String, lowercase: true }],
    type: {
      type: String,
      enum: ["keynote", "workshop", "panel", "lecture", "podcast", "webinar", "conference"],
      required: true,
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

SpeakingSchema.index({ slug: 1 });
SpeakingSchema.index({ date: -1 });
SpeakingSchema.index({ type: 1 });
SpeakingSchema.index({ featured: 1 });

const Speaking =
  (mongoose.models.Speaking as Model<ISpeakingDocument>) ??
  mongoose.model<ISpeakingDocument>("Speaking", SpeakingSchema);

export default Speaking;
