import mongoose, { Schema, type Model, type Document } from "mongoose";

export interface IVideoDocument extends Document {
  title: string;
  slug: string;
  description: string;
  videoUrl: string;
  thumbnail?: string;
  duration: number;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  transcript?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<IVideoDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnail: { type: String },
    duration: { type: Number, required: true },
    category: { type: String, required: true },
    tags: [{ type: String, lowercase: true }],
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    transcript: { type: String },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

VideoSchema.index({ slug: 1 });
VideoSchema.index({ category: 1, published: 1 });
VideoSchema.index({ published: 1, createdAt: -1 });

const Video =
  (mongoose.models.Video as Model<IVideoDocument>) ??
  mongoose.model<IVideoDocument>("Video", VideoSchema);

export default Video;
