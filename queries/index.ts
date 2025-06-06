import { Supabase } from '@/types'

export async function getOrganizationUserQuery(
  supabase: Supabase,
  domain: string,
  user: string,
) {
  const { data } = await supabase
    .from('users')
    .select(
      `
            *,
            organization:organizations!inner(*)
        `,
    )
    .eq('organization.domain', domain)
    .eq('id', user)
    .maybeSingle()
    .throwOnError()

  return data
}
