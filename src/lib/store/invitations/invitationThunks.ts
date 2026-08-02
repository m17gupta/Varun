import { createAsyncThunk } from "@reduxjs/toolkit"
import type { InvitationModel, InvitationFormData } from "./invitationTypes"

const BASE = "/api/invitations"

export const fetchInvitationsThunk = createAsyncThunk(
  "invitations/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(BASE)
      const json = await res.json()
      if (!res.ok) return rejectWithValue(json.error || "Failed to fetch invitations")
      return json.data as InvitationModel[]
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  },
)

export const createInvitationThunk = createAsyncThunk(
  "invitations/create",
  async (data: InvitationFormData, { rejectWithValue }) => {
    try {
      const res = await fetch(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) return rejectWithValue(json.error || "Failed to save invitation")
      return json.data as InvitationModel
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  },
)
