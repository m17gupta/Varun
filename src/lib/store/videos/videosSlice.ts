import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { VideosState, VideoModel } from "./videosTypes"
import {
  fetchVideosThunk,
  createVideoThunk,
  updateVideoThunk,
  deleteVideoThunk,
} from "./videosThunks"

const initialState: VideosState = {
  videos: [],
  selectedVideo: null,
  loading: false,
  error: null,
  isFetchedVideos: false,
}

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setSelectedVideo: (state, action: PayloadAction<VideoModel | null>) => {
      state.selectedVideo = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideosThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVideosThunk.fulfilled, (state, action) => {
        state.videos = action.payload
        state.loading = false
        state.isFetchedVideos = true
      })
      .addCase(fetchVideosThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createVideoThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createVideoThunk.fulfilled, (state, action) => {
        state.videos.unshift(action.payload)
        state.loading = false
      })
      .addCase(createVideoThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateVideoThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateVideoThunk.fulfilled, (state, action) => {
        const idx = state.videos.findIndex((v) => v._id === action.payload._id)
        if (idx !== -1) state.videos[idx] = action.payload
        if (state.selectedVideo?._id === action.payload._id) {
          state.selectedVideo = action.payload
        }
        state.loading = false
      })
      .addCase(updateVideoThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deleteVideoThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteVideoThunk.fulfilled, (state, action) => {
        state.videos = state.videos.filter((v) => v._id !== action.payload)
        if (state.selectedVideo?._id === action.payload) {
          state.selectedVideo = null
        }
        state.loading = false
      })
      .addCase(deleteVideoThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setSelectedVideo, clearError } = videosSlice.actions
export default videosSlice.reducer
