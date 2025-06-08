import { Database, Tables } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export type Supabase = SupabaseClient<Database>

export type User = Tables<'users'>
export type Organization = Tables<'organizations'>
export type Ticket = Tables<'tickets'>
