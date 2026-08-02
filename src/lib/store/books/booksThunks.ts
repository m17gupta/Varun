import { createAsyncThunk } from "@reduxjs/toolkit"
import type { BookModel, BookFormData } from "./booksTypes"

export const fetchBooksThunk = createAsyncThunk(
  "books/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/admin/books")
      const json = await res.json()
      if (!res.ok) return rejectWithValue(json.message || "Failed to fetch books")
      return json.data as BookModel[]
    } catch (error: any) {
      return rejectWithValue(error.message || "An unexpected error occurred")
    }
  },
)

export const createBookThunk = createAsyncThunk(
  "books/create",
  async (data: BookFormData, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/admin/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) return rejectWithValue(json.message || "Failed to create book")
      return json.data as BookModel
    } catch (error: any) {
      return rejectWithValue(error.message || "An unexpected error occurred")
    }
  },
)

export const updateBookThunk = createAsyncThunk(
  "books/update",
  async ({ id, data }: { id: string; data: Partial<BookFormData> }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/admin/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) return rejectWithValue(json.message || "Failed to update book")
      return json.data as BookModel
    } catch (error: any) {
      return rejectWithValue(error.message || "An unexpected error occurred")
    }
  },
)

export const deleteBookThunk = createAsyncThunk(
  "books/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/admin/books/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (!res.ok) return rejectWithValue(json.message || "Failed to delete book")
      return id
    } catch (error: any) {
      return rejectWithValue(error.message || "An unexpected error occurred")
    }
  },
)
