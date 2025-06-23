import { Database, Tables } from '@/lib/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export type Supabase = SupabaseClient<Database>

export type User = Tables<'users'>
export type TicketCategory = Tables<'ticket_categories'>
export type TicketCategoryGroup = Tables<'ticket_category_groups'>
