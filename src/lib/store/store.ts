import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./comments/commentSlice";

export const store = configureStore({
  reducer: {
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
