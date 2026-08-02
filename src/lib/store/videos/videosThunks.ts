import { createAsyncThunk } from "@reduxjs/toolkit"
import type { VideoModel, VideoFormData } from "./videosTypes"

export const fetchVideosThunk = createAsyncThunk(
  "videos/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/videos?limit=100")
      const json = await res.json()
      if (!res.ok) return rejectWithValue(json.error || "Failed to fetch videos")
      return json.data as VideoModel[]
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  },
)

export const createVideoThunk = createAsyncThunk(
  "videos/create",
  async (data: VideoFormData, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) return rejectWithValue(json.error || "Failed to create video")
      return json.data as VideoModel
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  },
)

export const updateVideoThunk = createAsyncThunk(
  "videos/update",
  async ({ id, data }: { id: string; data: Partial<VideoFormData> }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) return rejectWithValue(json.error || "Failed to update video")
      return json.data as VideoModel
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  },
)

export const deleteVideoThunk = createAsyncThunk(
  "videos/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/videos/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (!res.ok) return rejectWithValue(json.error || "Failed to delete video")
      return id
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  },
)
