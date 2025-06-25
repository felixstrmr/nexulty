import TicketsSidebar from '@/components/sidebars/tickets-sidebar'
import { getDomainFromOrganization } from '@/utils'
import { Suspense } from 'react'

type Props = {
  children: React.ReactNode
  params: Promise<{ organization: string }>
}

export default async function TicketsLayout({ children, params }: Props) {
  const { organization } = await params
  const domain = getDomainFromOrganization(organization)

  return (
    <div className='flex size-full'>
      <Suspense fallback={<div>Loading...</div>}>
        <TicketsSidebar domain={domain} />
      </Suspense>
      {children}
    </div>
  )
}
