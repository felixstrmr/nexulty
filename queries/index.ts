import { Supabase } from '@/types'

export async function getOrganizationUserQuery(
  supabase: Supabase,
  domain: string,
  userId: string,
) {
  const { data } = await supabase
    .from('users')
    .select('*, organization:organizations!inner(*)')
    .eq('organization.domain', domain)
    .eq('id', userId)
    .maybeSingle()
    .throwOnError()

  return data
}

export async function getTicketStatusesQuery(
  supabase: Supabase,
  domain: string,
) {
  const { data } = await supabase
    .from('ticket_statuses')
    .select('*, organization:organizations!inner(*)')
    .eq('organization.domain', domain)
    .throwOnError()

  return data
}
