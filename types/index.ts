import { Database, Tables } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export type Supabase = SupabaseClient<Database>

export type User = Tables<'users'>
export type TicketCategory = Tables<'ticket_categories'>
export type TicketCategoryGroup = Tables<'ticket_category_groups'>
export type TicketStatus = Tables<'ticket_statuses'>

export type TicketStatusInsert =
  Database['public']['Tables']['ticket_statuses']['Insert']

export type Ticket = Tables<'tickets'> & {
  status: {
    id: string
    name: string
    type: string
  }
}
