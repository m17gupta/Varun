export interface IArticle {
  _id: string;
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

export interface IResearch {
  _id: string;
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

export interface ISource {
  title: string;
  url?: string;
  author?: string;
  publisher?: string;
  year?: number;
}

export interface IVideo {
  _id: string;
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

export interface ICourse {
  _id: string;
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

export interface ICourseModule {
  title: string;
  description?: string;
  lessons: ILesson[];
}

export interface ILesson {
  title: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
  content?: string;
  order: number;
}

export interface IPodcast {
  _id: string;
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

export interface IPodcastGuest {
  name: string;
  title?: string;
  bio?: string;
  website?: string;
}

export interface IBook {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  amazonUrl?: string;
  kindleUrl?: string;
  audibleUrl?: string;
  pages?: number;
  isbn?: string;
  publishedDate?: Date;
  publisher?: string;
  category: string;
  tags: string[];
  featured: boolean;
  excerpts?: string[];
  reviews?: IBookReview[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookReview {
  name: string;
  title?: string;
  content: string;
  rating: number;
  source?: string;
}

export interface IMedia {
  _id: string;
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

export type MediaType =
  | "interview"
  | "article"
  | "podcast"
  | "video"
  | "appearance"
  | "quote"
  | "mention";

export interface ISpeaking {
  _id: string;
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

export type SpeakingType =
  | "keynote"
  | "workshop"
  | "panel"
  | "lecture"
  | "podcast"
  | "webinar"
  | "conference";

export interface IMember {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: MemberRole;
  tier: MembershipTier;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStatus: SubscriptionStatus;
  courseProgress: ICourseProgress[];
  bio?: string;
  newsletter: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type MemberRole = "admin" | "paid_member" | "free_member";

export type MembershipTier = "free" | "monthly" | "yearly" | "lifetime";

export type SubscriptionStatus = "active" | "past_due" | "canceled" | "incomplete" | "trialing";

export interface ICourseProgress {
  courseId: string;
  completedLessons: string[];
  percentage: number;
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

export interface INewsletter {
  _id: string;
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
