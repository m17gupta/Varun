"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { VideoForm } from "@/components/admin/VideoForm"
import { useAppDispatch } from "@/lib/store/hooks"
import { createVideoThunk } from "@/lib/store/videos/videosThunks"
import type { VideoFormData } from "@/lib/store/videos/videosTypes"

export default function AdminNewVideoPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  async function handleSubmit(data: VideoFormData) {
    const result = await dispatch(createVideoThunk(data))
    if (createVideoThunk.fulfilled.match(result)) {
      router.push("/admin/videos")
      router.refresh()
      return true
    }
    return false
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
          <h1 className="text-2xl font-bold tracking-tight">Add Video</h1>
          <p className="text-sm text-muted-foreground">
            Add a video to show on the home page
          </p>
        </div>
      </div>

      <VideoForm
        submitLabel="Create Video"
        cancelHref="/admin/videos"
        onSubmit={handleSubmit}
      />
    </div>
  )
}
