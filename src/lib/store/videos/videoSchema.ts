import { z } from "zod"

export const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, URL-friendly (e.g. my-video)"),
  description: z.string().min(1, "Description is required"),
  videoUrl: z.string().url("Must be a valid URL (e.g. https://youtube.com/watch?v=...)"),
  thumbnail: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  duration: z.coerce
    .number()
    .positive("Duration must be greater than 0")
    .max(86400, "Duration must be in seconds (max 24h)"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
})

export const videoUpdateSchema = videoSchema.partial()

export type VideoInput = z.infer<typeof videoSchema>
export type VideoUpdateInput = z.infer<typeof videoUpdateSchema>
