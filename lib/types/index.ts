import { Database } from '@/lib/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export type Supabase = SupabaseClient<Database>
