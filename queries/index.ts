import { Supabase } from '@/types'

export async function getOrganizationUserQuery(
  supabase: Supabase,
  domain: string,
  userId: string
) {
  const { data } = await supabase
    .from('users')
    .select('*, organization:organizations!users_organization_fkey!inner(*)')
    .eq('organization.domain', domain)
    .eq('id', userId)
    .maybeSingle()
    .throwOnError()

  return data
}

export async function getOrganizationQuery(supabase: Supabase, domain: string) {
  const { data } = await supabase
    .from('organizations')
    .select('*')
    .eq('domain', domain)
    .maybeSingle()
    .throwOnError()

  return data
}
