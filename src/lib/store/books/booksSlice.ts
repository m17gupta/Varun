import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { BooksState, BookModel } from "./booksTypes"
import {
  fetchBooksThunk,
  createBookThunk,
  updateBookThunk,
  deleteBookThunk,
} from "./booksThunks"

const initialState: BooksState = {
  books: [],
  selectedBooks: null,
  loading: false,
  error: null,
  isFetchedBooks: false,
}

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSelectedBooks: (state, action: PayloadAction<BookModel | null>) => {
      state.selectedBooks = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBooksThunk.fulfilled, (state, action) => {
        state.books = action.payload
        state.loading = false
        state.isFetchedBooks = true
      })
      .addCase(fetchBooksThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createBookThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createBookThunk.fulfilled, (state, action) => {
        state.books.unshift(action.payload)
        state.loading = false
      })
      .addCase(createBookThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateBookThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateBookThunk.fulfilled, (state, action) => {
        const idx = state.books.findIndex((b) => b._id === action.payload._id)
        if (idx !== -1) state.books[idx] = action.payload
        if (state.selectedBooks?._id === action.payload._id) state.selectedBooks = action.payload
        state.loading = false
      })
      .addCase(updateBookThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deleteBookThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteBookThunk.fulfilled, (state, action) => {
        state.books = state.books.filter((b) => b._id !== action.payload)
        if (state.selectedBooks?._id === action.payload) state.selectedBooks = null
        state.loading = false
      })
      .addCase(deleteBookThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setSelectedBooks, clearError } = booksSlice.actions
export default booksSlice.reducer
