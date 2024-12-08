import { Database } from '@/lib/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getTickets(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('tickets')
    .select(
      '*, tenant:tenants!inner(id, domain), status:ticket_statuses(*), reporter:users!inner(id, display_name), type:ticket_types(*), assignee:users!inner(id, display_name), priority:ticket_priorities(*)',
    )
    .eq('tenant.domain', domain)

  if (error) throw error

  return data
}

export async function getTicket(
  supabase: SupabaseClient<Database>,
  domain: string,
  ticketId: string,
) {
  const { data, error } = await supabase
    .from('tickets')
    .select(
      '*, tenant:tenants!inner(id, domain), status:ticket_statuses(*), reporter:users!inner(id, display_name), type:ticket_types(*), assignee:users!inner(id, display_name), priority:ticket_priorities(*)',
    )
    .eq('tenant.domain', domain)
    .eq('id', ticketId)
    .single()

  if (error) throw error

  return data
}

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

export async function getTicketComments(
  supabase: SupabaseClient<Database>,
  domain: string,
  ticketId: string,
) {
  const { data, error } = await supabase
    .from('ticket_comments')
    .select(
      '*, tenant:tenants!inner(domain, id), user:users!inner(email, avatar, display_name)',
    )
    .eq('tenant.domain', domain)
    .eq('ticket', ticketId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data
}
