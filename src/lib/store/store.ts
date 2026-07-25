import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./comments/commentSlice";
import authReducer from "./auth/authSlice";
import booksReducer from "./books/booksSlice";

export const store = configureStore({
  reducer: {
    comments: commentReducer,
    auth: authReducer,
    books: booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
