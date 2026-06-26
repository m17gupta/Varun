import mongoose, { Schema, type Model, type Document } from "mongoose";

export interface ILesson {
  title: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
  content?: string;
  order: number;
}

export interface ICourseModule {
  title: string;
  description?: string;
  lessons: ILesson[];
}

export interface ICourseDocument extends Document {
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  price: number;
  stripePriceId?: string;
  modules: ICourseModule[];
  published: boolean;
  featured: boolean;
  category: string;
  tags: string[];
  duration: number;
  level: "beginner" | "intermediate" | "advanced";
  prerequisites?: string[];
  learningOutcomes: string[];
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String },
    duration: { type: Number },
    content: { type: String },
    order: { type: Number, required: true },
  },
  { _id: false },
);

const ModuleSchema = new Schema<ICourseModule>(
  {
    title: { type: String, required: true },
    description: { type: String },
    lessons: [LessonSchema],
  },
  { _id: false },
);

const CourseSchema = new Schema<ICourseDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    coverImage: { type: String },
    price: { type: Number, required: true },
    stripePriceId: { type: String },
    modules: [ModuleSchema],
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    category: { type: String, required: true },
    tags: [{ type: String, lowercase: true }],
    duration: { type: Number, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    prerequisites: [{ type: String }],
    learningOutcomes: [{ type: String }],
  },
  { timestamps: true },
);

CourseSchema.index({ slug: 1 });
CourseSchema.index({ category: 1, published: 1 });
CourseSchema.index({ level: 1 });
CourseSchema.index({ published: 1, price: 1 });

const Course =
  (mongoose.models.Course as Model<ICourseDocument>) ??
  mongoose.model<ICourseDocument>("Course", CourseSchema);

export default Course;
