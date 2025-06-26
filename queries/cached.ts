import { supabaseClient } from '@/lib/clients/supabase-client'
import {
  getTicketCategoriesQuery,
  getTicketCategoryGroupsQuery,
  getTicketQuery,
  getTicketsQuery,
  getTicketStatusesQuery,
  getUserQuery,
} from '@/queries'
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
      revalidate: 60 * 5, // 5 minutes
    },
  )()
})

export const getTicketStatuses = cache(async (domain: string) => {
  const supabase = await supabaseClient()

  return unstable_cache(
    async () => {
      return getTicketStatusesQuery(supabase, domain)
    },
    ['ticket-statuses', domain],
    {
      tags: [`ticket-statuses-${domain}`],
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

export const getTicket = cache(async (domain: string, ticketId: string) => {
  const supabase = await supabaseClient()

  return unstable_cache(
    async () => {
      return getTicketQuery(supabase, domain, ticketId)
    },
    ['ticket', ticketId],
    {
      tags: [`ticket-${ticketId}`],
      revalidate: 60 * 60 * 24, // 24 hours
    },
  )()
})

export const getTickets = cache(async (domain: string, type: string) => {
  const supabase = await supabaseClient()

  return unstable_cache(
    async () => {
      return getTicketsQuery(supabase, domain, type)
    },
    ['tickets', domain, type],
    {
      tags: [`tickets-${domain}`],
      revalidate: 60 * 60 * 24, // 24 hours
    },
  )()
})
