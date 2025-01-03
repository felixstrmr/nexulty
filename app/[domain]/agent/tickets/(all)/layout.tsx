import TicketSidebar from '@/components/sidebars/ticket-sidebar'
import { getTicketStatusesWithCache } from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'

type Props = {
  params: Promise<{ domain: string }>
  children: React.ReactNode
}

export default async function TicketsLayout({ params, children }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()
  const ticketStatuses = await getTicketStatusesWithCache(supabase, domain)

  return (
    <div className='flex size-full'>
      <TicketSidebar ticketStatuses={ticketStatuses} />
      {children}
    </div>
  )
}
