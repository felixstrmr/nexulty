import TicketsAgentView from '@/components/views/tickets/agent/tickets-agent-view'
import { getTickets } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()
  const tickets = await getTickets(supabase, domain)

  return (
    <div className='flex size-full flex-col space-y-6 bg-muted/50 p-6'>
      <TicketsAgentView tickets={tickets} />
    </div>
  )
}
