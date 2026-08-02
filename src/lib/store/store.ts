import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./comments/commentSlice";
import authReducer from "./auth/authSlice";
import booksReducer from "./books/booksSlice";
import videosReducer from "./videos/videosSlice";
import invitationsReducer from "./invitations/invitationSlice";

export const store = configureStore({
  reducer: {
    comments: commentReducer,
    auth: authReducer,
    books: booksReducer,
    videos: videosReducer,
    invitations: invitationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
