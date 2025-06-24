import { Supabase } from '@/types'

export async function getUserQuery(supabase: Supabase, userId: string) {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
    .throwOnError()

  return data
}

export async function getTicketCategoriesQuery(
  supabase: Supabase,
  domain: string,
) {
  const { data } = await supabase
    .from('ticket_categories')
    .select(
      `
      *,
      organization!inner(domain)
    `,
    )
    .eq('organization.domain', domain)
    .throwOnError()

  return data
}

export async function getTicketCategoryGroupsQuery(
  supabase: Supabase,
  domain: string,
) {
  const { data } = await supabase
    .from('ticket_category_groups')
    .select(
      `
      *,
      organization!inner(domain)
    `,
    )
    .eq('organization.domain', domain)
    .throwOnError()

  return data
}

export async function getTicketQuery(
  supabase: Supabase,
  domain: string,
  ticketId: string,
) {
  const { data } = await supabase
    .from('tickets')
    .select(
      `
      *,
      organization!inner(domain)
    `,
    )
    .eq('organization.domain', domain)
    .eq('id', ticketId)
    .maybeSingle()
    .throwOnError()

  return data
}

export async function getTicketsQuery(supabase: Supabase, domain: string) {
  const { data } = await supabase
    .from('tickets')
    .select(
      `
      *,
      organization!inner(domain)
    `,
    )
    .eq('organization.domain', domain)
    .throwOnError()

  return data
}
