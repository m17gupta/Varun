import mongoose, { Schema, type Model, type Document } from "mongoose";

export interface ISource {
  title: string;
  url?: string;
  author?: string;
  publisher?: string;
  year?: number;
}

export interface IResearchDocument extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  category: string;
  published: boolean;
  featured: boolean;
  readingTime: number;
  sources: ISource[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const SourceSchema = new Schema<ISource>(
  {
    title: { type: String, required: true },
    url: { type: String },
    author: { type: String },
    publisher: { type: String },
    year: { type: Number },
  },
  { _id: false },
);

const ResearchSchema = new Schema<IResearchDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    tags: [{ type: String, lowercase: true }],
    category: { type: String, required: true },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    readingTime: { type: Number, default: 0 },
    sources: [SourceSchema],
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

ResearchSchema.index({ slug: 1 });
ResearchSchema.index({ category: 1, published: 1 });
ResearchSchema.index({ published: 1, createdAt: -1 });

const Research =
  (mongoose.models.Research as Model<IResearchDocument>) ??
  mongoose.model<IResearchDocument>("Research", ResearchSchema);

export default Research;
