import { supabaseClient } from '@/lib/clients/supabase-client'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

type Props = {
  domain: string
  filters?: {
    status?: string
    type?: string
  }
  page?: number
  limit?: number
}

export const getTickets = cache(async (props: Props) => {
  const supabase = await supabaseClient()

  return unstable_cache(
    async () => {
      const { filters, page = 1, limit = 10 } = props
      const offset = (page - 1) * limit

      let query = supabase
        .from('tickets')
        .select(
          `
          *,
          status:ticket_statuses!inner(id, name, type)
          `,
        )
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (filters?.type) {
        query = query.eq('status.type', filters.type)
      }

      if (filters?.status) {
        query = query.eq('status.id', filters.status)
      }

      const { data, error } = await query
      if (error) throw error

      return {
        tickets: data,
        totalCount: data?.length,
        totalPages: 1,
        currentPage: 1,
      }
    },
    [
      `tickets-${props.domain}`,
      JSON.stringify(props.filters),
      props.page?.toString() ?? '1',
      props.limit?.toString() ?? '10',
    ],
    {
      revalidate: 300,
      tags: [`tickets-${props.domain}`],
    },
  )()
})
