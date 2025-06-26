import TicketsSidebarNavigation from '@/components/sidebars/tickets-sidebar-navigation'
import { getTicketStatuses } from '@/queries/cached'

type Props = {
  domain: string
}

export default async function TicketsSidebar({ domain }: Props) {
  const statuses = await getTicketStatuses(domain)

  return (
    <aside className='flex w-64 max-w-64 min-w-64 flex-col gap-4 border-r p-4'>
      <h1 className='text-2xl font-semibold tracking-tight'>Tickets</h1>
      <TicketsSidebarNavigation statuses={statuses} />
    </aside>
  )
}
