import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

// User

export async function getUser(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  return supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
    .throwOnError()
}

// Workspace

export async function getWorkspace(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return supabase
    .from('workspaces')
    .select('*')
    .eq('domain', domain)
    .single()
    .throwOnError()
}

// Ticket

export async function getTickets(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return supabase
    .from('tickets')
    .select('*, workspace:workspaces(domain), status:ticket_statuses(*)')
    .eq('workspace.domain', domain)
    .throwOnError()
}
