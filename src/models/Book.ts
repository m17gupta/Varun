import mongoose, { Schema, type Model, type Document } from "mongoose";

export interface IBookReview {
  name: string;
  title?: string;
  content: string;
  rating: number;
  source?: string;
}

export interface IBookDocument extends Document {
  title: string;
  slug: string;
  label: string;
  excerpt: string;
  image?: string;
  href: string;
  featured: boolean;
  order: number;
  published: boolean;
  type: string;
  description?: string;
  coverImage?: string;
  amazonUrl?: string;
  kindleUrl?: string;
  audibleUrl?: string;
  pages?: number;
  isbn?: string;
  publishedDate?: Date;
  publisher?: string;
  category?: string;
  tags?: string[];
  excerpts?: string[];
  reviews?: IBookReview[];
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IBookReview>(
  {
    name: { type: String, required: true },
    title: { type: String },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    source: { type: String },
  },
  { _id: false },
);

const BookSchema = new Schema<IBookDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    label: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String },
    href: { type: String, required: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    type: { type: String, default: "book" },
    description: { type: String },
    coverImage: { type: String },
    amazonUrl: { type: String },
    kindleUrl: { type: String },
    audibleUrl: { type: String },
    pages: { type: Number },
    isbn: { type: String },
    publishedDate: { type: Date },
    publisher: { type: String },
    category: { type: String },
    tags: [{ type: String, lowercase: true }],
    excerpts: [{ type: String }],
    reviews: [ReviewSchema],
  },
  { timestamps: true },
);

BookSchema.index({ slug: 1 });
BookSchema.index({ featured: 1 });
BookSchema.index({ type: 1 });

const Book =
  (mongoose.models.Book as Model<IBookDocument>) ??
  mongoose.model<IBookDocument>("Book", BookSchema);

export default Book;
