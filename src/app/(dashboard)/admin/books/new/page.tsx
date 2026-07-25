"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/store/hooks"
import { createBookThunk } from "@/lib/store/books/booksThunks"
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
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload"

const LABEL_OPTIONS = ["Book 01", "Book 02", "Essay Series", "Research"]

export default function AdminNewBookPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: "",
    slug: "",
    label: "",
    excerpt: "",
    image: "",
    href: "",
    featured: false,
    order: 0,
    published: true,
  })

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
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
    setSaving(true)
    const result = await dispatch(createBookThunk(form))
    if (createBookThunk.fulfilled.match(result)) {
      router.push("/admin/books")
      router.refresh()
    } else {
      alert("Failed to save book")
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/books"
          className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add Book</h1>
          <p className="text-sm text-muted-foreground">Create a new book or essay series entry</p>
        </div>
      </div>

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
                placeholder="The Mahabharata: A Modern Reader's Companion"
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="mahabharata-modern-reader-companion"
                required
              />
              <p className="text-xs text-muted-foreground">
                Auto-generated from title. Edit if needed — must be unique.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Select value={form.label} onValueChange={(val) => val && set("label", val)}>
                <SelectTrigger id="label">
                  <SelectValue placeholder="Select a label" />
                </SelectTrigger>
                <SelectContent>
                  {LABEL_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="href">Link Destination</Label>
              <Input
                id="href"
                value={form.href}
                onChange={(e) => set("href", e.target.value)}
                placeholder="/books/dharma-in-dialogue"
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Cover Image</Label>
              <CloudinaryUpload value={form.image} onChange={(url) => set("image", url)} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="A guide to the epic's characters, philosophical themes, and layered narrative structure."
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                min={0}
                value={form.order}
                onChange={(e) => set("order", Number(e.target.value))}
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

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="size-4 animate-spin" />}
            {saving ? "Saving…" : "Create Book"}
          </Button>
          <Link
            href="/admin/books"
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium whitespace-nowrap transition-all hover:bg-muted hover:text-foreground"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
