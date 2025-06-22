import { Database, Tables } from '@/lib/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export type Supabase = SupabaseClient<Database>

export type User = Tables<'users'>
