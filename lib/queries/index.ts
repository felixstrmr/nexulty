import { Supabase } from '@/lib/types'

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
