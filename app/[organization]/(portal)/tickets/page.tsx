import PortalTicketTabs from '@/components/portal/portal-ticket-tabs'
import TicketsView from '@/components/portal/tickets-view'
import PortalTicketsSkeleton from '@/components/skeletons/portal-tickets-skeleton'
import { buttonVariants } from '@/components/ui/button'
import { getDomainFromOrganization } from '@/utils'
import Link from 'next/link'
import { Suspense } from 'react'

type Props = {
  params: Promise<{ organization: string }>
  searchParams: Promise<{ type?: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const { organization } = await params
  const { type } = await searchParams
  const domain = getDomainFromOrganization(organization)

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
        <Suspense fallback={<PortalTicketsSkeleton />}>
          <TicketsView domain={domain} type={type} />
        </Suspense>
      </div>
    </div>
  )
}
