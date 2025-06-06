import { Database, Tables } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export type Supabase = SupabaseClient<Database>

export type User = Tables<'users'>
export type Organization = Tables<'organizations'>
export type Ticket = Tables<'tickets'>
export type TicketStatus = Tables<'ticket_statuses'>
export type TicketType = Tables<'ticket_types'>
export type TicketCategory = Tables<'ticket_categories'>
export type TicketCategoryGroup = Tables<'ticket_category_groups'>

export type TicketStatusIcon =
  | 'CirclePlus'
  | 'CircleArrowUp'
  | 'CirclePlay'
  | 'CirclePause'
  | 'CircleCheck'
  | 'CircleStop'
  | 'CircleX'
