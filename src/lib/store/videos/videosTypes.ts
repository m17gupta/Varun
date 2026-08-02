export interface VideoModel {
  _id?: string
  title: string
  slug: string
  description: string
  videoUrl: string
  thumbnail?: string
  duration: number
  category: string
  tags?: string[]
  published?: boolean
  featured?: boolean
  transcript?: string
  views?: number
  createdAt?: string
  updatedAt?: string
}

export interface VideoFormData {
  title: string
  slug: string
  description: string
  videoUrl: string
  thumbnail: string
  duration: number
  category: string
  tags: string[]
  published: boolean
  featured: boolean
}

export interface VideosState {
  videos: VideoModel[]
  selectedVideo: VideoModel | null
  loading: boolean
  error: string | null
  isFetchedVideos: boolean
}
