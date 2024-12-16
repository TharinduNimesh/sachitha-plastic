
import type { Database } from './database.types'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type UserStatus = Database['public']['Tables']['user_status']['Row']
export type Role = Database['public']['Enums']['Role']
export type Status = Database['public']['Enums']['UserStatus']

export interface UserState {
  id: string | null
  name: string | null
  email: string | null
  role: Role | null
  status: Status | null
  loading: boolean
  error: string | null
}