import mongoose, { Schema, type Model, type Document } from "mongoose";

export type MediaType =
  | "interview"
  | "article"
  | "podcast"
  | "video"
  | "appearance"
  | "quote"
  | "mention";

export interface IMediaDocument extends Document {
  title: string;
  slug: string;
  description: string;
  type: MediaType;
  url: string;
  coverImage?: string;
  publication?: string;
  date: Date;
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMediaDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["interview", "article", "podcast", "video", "appearance", "quote", "mention"],
      required: true,
    },
    url: { type: String, required: true },
    coverImage: { type: String },
    publication: { type: String },
    date: { type: Date, required: true },
    tags: [{ type: String, lowercase: true }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

MediaSchema.index({ slug: 1 });
MediaSchema.index({ type: 1 });
MediaSchema.index({ date: -1 });
MediaSchema.index({ featured: 1 });

const Media =
  (mongoose.models.Media as Model<IMediaDocument>) ??
  mongoose.model<IMediaDocument>("Media", MediaSchema);

export default Media;
