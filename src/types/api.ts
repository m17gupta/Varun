export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SearchResult {
  id: string;
  type: "article" | "research" | "video" | "course" | "podcast" | "book" | "media" | "speaking";
  title: string;
  excerpt: string;
  slug: string;
  url: string;
  score: number;
  thumbnail?: string;
  date: Date;
}

export interface SearchResponse {
  success: boolean;
  results: SearchResult[];
  total: number;
  query: string;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
  details?: unknown;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface QueryParams extends PaginationParams {
  search?: string;
  category?: string;
  tag?: string;
  featured?: boolean;
  published?: boolean;
}
