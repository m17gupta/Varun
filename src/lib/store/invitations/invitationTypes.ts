export interface InvitationModel {
  _id?: string
  name: string
  email: string
  phone?: string
  youtubeUrl?: string
  instagramUrl?: string
  theme: string
  status?: "new" | "contacted" | "closed"
  createdAt?: string
  updatedAt?: string
}

export interface InvitationFormData {
  name: string
  email: string
  phone?: string
  youtubeUrl?: string
  instagramUrl?: string
  theme: string
}

export interface InvitationsState {
  invitations: InvitationModel[]
  loading: boolean
  error: string | null
  isFetchedInvitations: boolean
}
