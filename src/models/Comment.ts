import mongoose, { Schema, type Model, type Document } from "mongoose";

export interface ICommentDocument extends Document {
  pageId?: string;
  slug: string;
  selector?: string;
  offsetX?: number;
  offsetY?: number;
  content?: string;
  status: "open" | "pending" | "done";
  screenSize: "mobile" | "tablet" | "desktop" | "all";
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<ICommentDocument>(
  {
    pageId: { type: String },
    slug: { type: String, required: true, lowercase: true },
    selector: { type: String },
    offsetX: { type: Number },
    offsetY: { type: Number },
    content: { type: String },
    status: {
      type: String,
      enum: ["open", "pending", "done"],
      default: "open",
    },
    screenSize: {
      type: String,
      enum: ["mobile", "tablet", "desktop", "all"],
      default: "all",
    },
  },
  { timestamps: true },
);

CommentSchema.index({ slug: 1 });

const Comment =
  (mongoose.models.Comment as Model<ICommentDocument>) ??
  mongoose.model<ICommentDocument>("Comment", CommentSchema);

export default Comment;
