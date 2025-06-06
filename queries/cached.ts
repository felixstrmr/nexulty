import { supabaseServerClient } from '@/lib/clients/supabase/server'
import { getOrganizationUserQuery } from '@/queries'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

export const getOrganizationUser = cache(async (domain: string) => {
  const supabase = await supabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  return unstable_cache(
    async () => {
      return getOrganizationUserQuery(supabase, domain, user.id)
    },
    ['organization-user', domain, user.id],
    {
      tags: [`organization-${domain}`, `organization-user-${user.id}`],
      revalidate: 60 * 60 * 24, // 24 hours
    },
  )()
})
