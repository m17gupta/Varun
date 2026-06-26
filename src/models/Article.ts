import mongoose, { Schema, type Model, type Document } from "mongoose";

export interface IArticleDocument extends Document {
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
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticleDocument>(
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
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

ArticleSchema.index({ slug: 1 });
ArticleSchema.index({ tags: 1 });
ArticleSchema.index({ category: 1, published: 1 });
ArticleSchema.index({ published: 1, createdAt: -1 });

const Article =
  (mongoose.models.Article as Model<IArticleDocument>) ??
  mongoose.model<IArticleDocument>("Article", ArticleSchema);

export default Article;
