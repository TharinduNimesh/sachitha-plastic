export interface Member {
  id: string
  name: string
  email: string
  role: string
  status?: string
  created_at: string
}

export interface PendingInvite {
  id: string
  email: string
  role: string
  created_at: string
}

export type MemberRole = 'Admin' | 'Moderator'
