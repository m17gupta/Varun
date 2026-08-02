"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload"
import { videoSchema } from "@/lib/store/videos/videoSchema"
import type { VideoFormData, VideoModel } from "@/lib/store/videos/videosTypes"

export const VIDEO_CATEGORIES = [
  "lectures",
  "conference-talks",
  "podcast-interviews",
  "panel-discussions",
  "book-talks",
]

interface VideoFormProps {
  initialData?: VideoModel | null
  submitLabel: string
  cancelHref: string
  onSubmit: (data: VideoFormData) => Promise<boolean>
}

export function VideoForm({ initialData, submitLabel, cancelHref, onSubmit }: VideoFormProps) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<VideoFormData>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    description: initialData?.description ?? "",
    videoUrl: initialData?.videoUrl ?? "",
    thumbnail: initialData?.thumbnail ?? "",
    duration: initialData?.duration ?? 0,
    category: initialData?.category ?? "",
    tags: initialData?.tags ?? [],
    published: initialData?.published ?? false,
    featured: initialData?.featured ?? false,
  })

  function set<K extends keyof VideoFormData>(key: K, value: VideoFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const payload: VideoFormData = {
      ...form,
      duration: Number(form.duration) || 0,
      tags: form.tags.filter((t) => t.trim() !== ""),
    }

    const parsed = videoSchema.safeParse(payload)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please fix the form errors")
      return
    }

    setSaving(true)
    const ok = await onSubmit(payload)
    setSaving(false)
    if (!ok) setError("Failed to save video")
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="space-y-4 rounded-lg border p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => {
                set("title", e.target.value)
                if (!form.slug || form.slug === generateSlug(form.title)) {
                  set("slug", generateSlug(e.target.value))
                }
              }}
              placeholder="The Mahabharata War: Myth or Reality?"
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="mahabharata-war-myth-or-reality"
              required
            />
            <p className="text-xs text-muted-foreground">
              Auto-generated from title. Edit if needed — must be unique.
            </p>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              type="url"
              value={form.videoUrl}
              onChange={(e) => set("videoUrl", e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              required
            />
            <p className="text-xs text-muted-foreground">
              YouTube, Vimeo, or direct video file URL shown on the home page.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={form.category} onValueChange={(val) => val && set("category", val)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {VIDEO_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (seconds)</Label>
            <Input
              id="duration"
              type="number"
              min={1}
              value={form.duration || ""}
              onChange={(e) => set("duration", Number(e.target.value))}
              placeholder="2720"
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Thumbnail</Label>
            <CloudinaryUpload value={form.thumbnail} onChange={(url) => set("thumbnail", url)} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="A brief description of the video content and topics covered."
              className="min-h-[100px]"
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={form.tags.join(", ")}
              onChange={(e) =>
                set("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))
              }
              placeholder="dharma, mahabharata, lecture"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 pt-2">
          <div className="flex items-center gap-3">
            <Switch
              id="featured"
              checked={form.featured}
              onCheckedChange={(checked) => set("featured", checked)}
            />
            <Label htmlFor="featured" className="cursor-pointer">Featured on home page</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={form.published}
              onCheckedChange={(checked) => set("published", checked)}
            />
            <Label htmlFor="published" className="cursor-pointer">Published</Label>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="size-4 animate-spin" />}
          {saving ? "Saving…" : submitLabel}
        </Button>
        <Link
          href={cancelHref}
          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium whitespace-nowrap transition-all hover:bg-muted hover:text-foreground"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
