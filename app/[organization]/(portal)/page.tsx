import PortalTicketsTable from '@/components/tables/tickets/portal/portal-tickets-table'
import TicketStatusTypesTabs from '@/components/tabs/ticket-status-types-tabs'
import { buttonVariants } from '@/components/ui/button'
import { getOrganizationUser, getTickets } from '@/queries/cached'
import { getDomain } from '@/utils'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ organization: string }>
}

export default async function Page({ params }: Props) {
  const { organization } = await params
  const domain = getDomain(organization)

  const [organizationUser, tickets] = await Promise.all([
    getOrganizationUser(domain),
    getTickets(domain)
  ])

  if (!organizationUser) {
    return redirect('/signin')
  }

  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-8 pt-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Welcome back, {organizationUser.first_name}!
          </h1>
          <p className='text-muted-foreground text-sm'>
            Here&apos;s an overview of your tickets and recent activity.
          </p>
        </div>
        <Link
          href={'/tickets/create'}
          className={buttonVariants({ variant: 'default' })}
        >
          Create Ticket
        </Link>
      </div>
      <div className='flex flex-col gap-4'>
        <div>
          <TicketStatusTypesTabs />
        </div>
        <PortalTicketsTable tickets={tickets} />
      </div>
    </div>
  )
}
