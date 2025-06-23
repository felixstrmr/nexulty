import { supabaseClient } from '@/lib/clients/supabase-client'
import {
  getTicketCategoriesQuery,
  getTicketCategoryGroupsQuery,
  getUserQuery,
} from '@/lib/queries'
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

export const getTicketCategories = cache(async (domain: string) => {
  const supabase = await supabaseClient()

  return unstable_cache(
    async () => {
      return getTicketCategoriesQuery(supabase, domain)
    },
    ['ticket-categories', domain],
    {
      tags: [`ticket-categories-${domain}`],
      revalidate: 60 * 60 * 24, // 24 hours
    },
  )()
})

export const getTicketCategoryGroups = cache(async (domain: string) => {
  const supabase = await supabaseClient()

  return unstable_cache(
    async () => {
      return getTicketCategoryGroupsQuery(supabase, domain)
    },
    ['ticket-category-groups', domain],
    {
      tags: [`ticket-category-groups-${domain}`],
      revalidate: 60 * 60 * 24, // 24 hours
    },
  )()
})
