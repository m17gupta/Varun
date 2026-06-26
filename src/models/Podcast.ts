import mongoose, { Schema, type Model, type Document } from "mongoose";

export interface IPodcastGuest {
  name: string;
  title?: string;
  bio?: string;
  website?: string;
}

export interface IPodcastDocument extends Document {
  title: string;
  slug: string;
  description: string;
  audioUrl: string;
  coverImage?: string;
  duration: number;
  episodeNumber: number;
  seasonNumber?: number;
  transcript?: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  guest?: IPodcastGuest;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const GuestSchema = new Schema<IPodcastGuest>(
  {
    name: { type: String, required: true },
    title: { type: String },
    bio: { type: String },
    website: { type: String },
  },
  { _id: false },
);

const PodcastSchema = new Schema<IPodcastDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    audioUrl: { type: String, required: true },
    coverImage: { type: String },
    duration: { type: Number, required: true },
    episodeNumber: { type: Number, required: true },
    seasonNumber: { type: Number },
    transcript: { type: String },
    tags: [{ type: String, lowercase: true }],
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    guest: GuestSchema,
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

PodcastSchema.index({ slug: 1 });
PodcastSchema.index({ episodeNumber: 1 });
PodcastSchema.index({ published: 1, createdAt: -1 });
PodcastSchema.index({ seasonNumber: 1, episodeNumber: 1 });

const Podcast =
  (mongoose.models.Podcast as Model<IPodcastDocument>) ??
  mongoose.model<IPodcastDocument>("Podcast", PodcastSchema);

export default Podcast;
