"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAppDispatch  } from "@/lib/store/hooks"
import { fetchBooksThunk, updateBookThunk } from "@/lib/store/books/booksThunks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload"
import type { BookModel } from "@/lib/store/books/booksTypes"

export default function AdminEditBookPage() {
  const router = useRouter()
  const params = useParams()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    async function load() {
      try {
        await dispatch(fetchBooksThunk())
        const res = await fetch(`/api/admin/books/${params.id}`)
        const json = await res.json()
        if (json.success) {
          const book = json.data as BookModel
          setForm({
            title: book.title ?? "",
            slug: book.slug ?? "",
            label: book.label ?? "",
            excerpt: book.excerpt ?? "",
            image: book.image ?? "",
            href: book.href ?? "",
            featured: book.featured ?? false,
            order: book.order ?? 0,
            published: book.published ?? true,
          })
        }
      } catch {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [dispatch, params.id])

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
    const result = await dispatch(updateBookThunk({ id: params.id as string, data: form }))
    if (updateBookThunk.fulfilled.match(result)) {
      router.push("/admin/books")
      router.refresh()
    } else {
      alert("Failed to save book")
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
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
          <h1 className="text-2xl font-bold tracking-tight">Edit Book</h1>
          <p className="text-sm text-muted-foreground">Update book details</p>
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
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={form.label}
                onChange={(e) => set("label", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="href">Link Destination</Label>
              <Input
                id="href"
                value={form.href}
                onChange={(e) => set("href", e.target.value)}
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
            {saving ? "Saving…" : "Save Changes"}
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
