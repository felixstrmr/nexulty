import { Database } from '@/lib/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getTicketStatuses(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('ticket_statuses')
    .select('*, tenant:tenants!inner(domain)')
    .eq('tenant.domain', domain)
    .order('position', { ascending: true })

  if (error) throw error

  return data
}
