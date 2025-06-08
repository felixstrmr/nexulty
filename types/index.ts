import { Database, Tables } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export type Supabase = SupabaseClient<Database>

type T = Tables<'tickets'>

export type User = Tables<'users'>
export type Organization = Tables<'organizations'>
export type TicketStatus = Tables<'ticket_statuses'>

export type Ticket = T & {
  status: TicketStatus
}
