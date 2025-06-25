import { columns } from '@/components/tables/tickets/portal/columns'
import { DataTable } from '@/components/tables/tickets/portal/data-table'
import PortalTicketTabs from '@/components/tabs/portal-ticket-tabs'
import { buttonVariants } from '@/components/ui/button'
import { getTickets } from '@/queries/cached'
import { getDomainFromOrganization } from '@/utils'
import Link from 'next/link'

type Props = {
  params: Promise<{ organization: string }>
  searchParams: Promise<{ tab?: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const { organization } = await params
  const { tab } = await searchParams
  const domain = getDomainFromOrganization(organization)

  const tickets = await getTickets(domain)

  let filteredTickets = tickets.filter(
    (ticket) => ticket.status.type === 'open',
  )

  if (tab) {
    filteredTickets = tickets.filter((ticket) => ticket.status.type === tab)
  }

  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-8 pt-8'>
      <div className='flex items-start justify-between'>
        <h1 className='text-3xl font-semibold tracking-tight'>Tickets</h1>
        <Link
          href='/tickets/create'
          className={buttonVariants({ variant: 'default' })}
        >
          Create ticket
        </Link>
      </div>
      <div className='flex size-full flex-col gap-4'>
        <PortalTicketTabs />
        <DataTable columns={columns} data={filteredTickets} />
      </div>
    </div>
  )
}
