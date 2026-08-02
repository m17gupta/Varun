"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchVideosThunk, deleteVideoThunk } from "@/lib/store/videos/videosThunks"

function formatDuration(seconds?: number) {
  if (!seconds || seconds <= 0) return "—"
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${String(secs).padStart(2, "0")}`
}

export default function AdminVideosPage() {
  const dispatch = useAppDispatch()
  const { videos, loading, isFetchedVideos } = useAppSelector((s) => s.videos)

  useEffect(() => {
    if (!isFetchedVideos) dispatch(fetchVideosThunk())
  }, [dispatch, isFetchedVideos])

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this video?")) return
    dispatch(deleteVideoThunk(id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Videos</h1>
          <p className="text-sm text-muted-foreground">
            Manage lectures and videos shown on the home page
          </p>
        </div>
        <Link
          href="/admin/videos/new"
          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-transparent bg-primary px-2.5 text-sm font-medium text-primary-foreground whitespace-nowrap transition-all hover:bg-primary/80"
        >
          <Plus className="size-4" />
          Add New
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search videos…" className="pl-8" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Thumb</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-24 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="size-10 rounded" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                </TableRow>
              ))
            : videos.length === 0
              ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No videos found. Add your first video.
                  </TableCell>
                </TableRow>
              )
              : videos.map((video) => (
                  <TableRow key={video._id}>
                    <TableCell>
                      {video.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={video.thumbnail}
                          alt=""
                          className="size-10 rounded object-cover"
                        />
                      ) : (
                        <div className="size-10 rounded bg-muted" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{video.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{video.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDuration(video.duration)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={video.published ? "default" : "secondary"}>
                          {video.published ? "Published" : "Draft"}
                        </Badge>
                        {video.featured && <Badge variant="outline">Featured</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/videos/${video._id}`}
                          className="inline-flex size-7 items-center justify-center rounded-lg text-sm font-medium whitespace-nowrap transition-all hover:bg-muted hover:text-foreground"
                        >
                          <Edit className="size-4" />
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => video._id && handleDelete(video._id)}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
        </TableBody>
      </Table>
    </div>
  )
}
