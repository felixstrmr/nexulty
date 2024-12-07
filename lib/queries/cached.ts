import { getTicketStatuses } from '@/lib/queries'
import { SupabaseClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

export async function getTicketStatusesWithCache(
  supabase: SupabaseClient,
  domain: string,
) {
  return unstable_cache(
    async () => getTicketStatuses(supabase, domain),
    [`ticket-statuses-${domain}`],
    {
      revalidate: 3600,
      tags: [`ticket-statuses-${domain}`],
    },
  )()
}
