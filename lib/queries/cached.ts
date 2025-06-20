import { supabaseClient } from '@/lib/clients/supabase-client'
import { getUserQuery } from '@/lib/queries'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

export const getUser = cache(async () => {
  const supabase = await supabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  return unstable_cache(
    async () => {
      return getUserQuery(supabase, user.id)
    },
    ['user', user.id],
    {
      tags: [`user-${user.id}`],
      revalidate: 60 * 60 * 24, // 24 hours
    },
  )()
})
