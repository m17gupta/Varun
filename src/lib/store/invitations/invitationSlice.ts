import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { InvitationsState, InvitationModel } from "./invitationTypes"
import { fetchInvitationsThunk, createInvitationThunk } from "./invitationThunks"

const initialState: InvitationsState = {
  invitations: [],
  loading: false,
  error: null,
  isFetchedInvitations: false,
}

const invitationsSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvitationsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchInvitationsThunk.fulfilled, (state, action) => {
        state.invitations = action.payload
        state.loading = false
        state.isFetchedInvitations = true
      })
      .addCase(fetchInvitationsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createInvitationThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createInvitationThunk.fulfilled, (state, action: PayloadAction<InvitationModel>) => {
        state.invitations.unshift(action.payload)
        state.loading = false
      })
      .addCase(createInvitationThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError } = invitationsSlice.actions
export default invitationsSlice.reducer
