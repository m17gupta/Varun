import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Annotation } from "@/components/annotationPlugin/store";

interface CommentsState {
  allComments: Annotation[];
  pageComments: Annotation[];
  isFetchedComments: boolean;
  loading: boolean;
}

const initialState: CommentsState = {
  allComments: [],
  pageComments: [],
  isFetchedComments: false,
  loading: false,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setAllComments(state, action: PayloadAction<Annotation[]>) {
      state.allComments = action.payload;
      state.isFetchedComments = true;
    },
    setPageComments(state, action: PayloadAction<Annotation[]>) {
      state.pageComments = action.payload;
    },
    addComment(state, action: PayloadAction<Annotation>) {
      state.allComments.unshift(action.payload);
    },
    updateComment(state, action: PayloadAction<Annotation>) {
      const idx = state.allComments.findIndex(
        (c) => (c._id ?? c.id) === (action.payload._id ?? action.payload.id),
      );
      if (idx !== -1) state.allComments[idx] = action.payload;
    },
    removeComment(state, action: PayloadAction<string>) {
      state.allComments = state.allComments.filter(
        (c) => (c._id ?? c.id) !== action.payload,
      );
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setAllComments,
  setPageComments,
  addComment,
  updateComment,
  removeComment,
  setLoading,
} = commentSlice.actions;
export default commentSlice.reducer;
