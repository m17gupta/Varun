import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Annotation } from "@/components/annotationPlugin/store";
import { setAllComments, addComment, removeComment, updateComment, setLoading } from "./commentSlice";

const BASE = "/api/comments";

export const fetchCommentsThunk = createAsyncThunk(
  "comments/fetchAll",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const res = await fetch(BASE);
      const json = await res.json();
      if (json.success) {
        dispatch(setAllComments(json.data));
      }
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const createCommentThunk = createAsyncThunk(
  "comments/create",
  async (commentData: Omit<Annotation, "id" | "createdAt">, { dispatch }) => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });
    const json = await res.json();
    if (json.success) {
      dispatch(addComment(json.data));
    }
    return json;
  },
);

export const updateCommentThunk = createAsyncThunk(
  "comments/update",
  async (
    { id, commentData }: { id: string; commentData: Partial<Annotation> },
    { dispatch },
  ) => {
    const res = await fetch(`${BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });
    const json = await res.json();
    if (json.success) {
      dispatch(updateComment(json.data));
    }
    return json;
  },
);

export const deleteCommentThunk = createAsyncThunk(
  "comments/delete",
  async (id: string, { dispatch }) => {
    const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) {
      dispatch(removeComment(id));
    }
    return json;
  },
);
