import TicketsSidebarNavigation from '@/components/sidebars/tickets-sidebar-navigation'
import { supabaseClient } from '@/lib/clients/supabase-client'

type Props = {
  domain: string
}

export default async function TicketsSidebar({ domain }: Props) {
  const supabase = await supabaseClient()

  const { data: statuses } = await supabase
    .from('ticket_statuses')
    .select('*, organization!inner(domain)')
    .eq('organization.domain', domain)
    .throwOnError()

  return (
    <aside className='w-64 max-w-64 min-w-64 border-r p-4'>
      <TicketsSidebarNavigation statuses={statuses} />
    </aside>
  )
}
