"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { VideoForm } from "@/components/admin/VideoForm"
import { useAppDispatch } from "@/lib/store/hooks"
import { updateVideoThunk } from "@/lib/store/videos/videosThunks"
import type { VideoFormData, VideoModel } from "@/lib/store/videos/videosTypes"

export default function AdminEditVideoPage() {
  const router = useRouter()
  const params = useParams()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const [video, setVideo] = useState<VideoModel | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/videos/${params.id}`)
        const json = await res.json()
        if (json.success) {
          setVideo(json.data as VideoModel)
        }
      } catch {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.id])

  async function handleSubmit(data: VideoFormData) {
    const result = await dispatch(updateVideoThunk({ id: params.id as string, data }))
    if (updateVideoThunk.fulfilled.match(result)) {
      router.push("/admin/videos")
      router.refresh()
      return true
    }
    return false
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Video not found
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/videos"
          className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Video</h1>
          <p className="text-sm text-muted-foreground">Update video details</p>
        </div>
      </div>

      <VideoForm
        initialData={video}
        submitLabel="Save Changes"
        cancelHref="/admin/videos"
        onSubmit={handleSubmit}
      />
    </div>
  )
}
