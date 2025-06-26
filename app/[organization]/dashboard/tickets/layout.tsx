import TicketsSidebar from '@/components/sidebars/tickets-sidebar'
import { getDomainFromOrganization } from '@/utils'

type Props = {
  children: React.ReactNode
  params: Promise<{ organization: string }>
}

export default async function TicketsLayout({ children, params }: Props) {
  const { organization } = await params
  const domain = getDomainFromOrganization(organization)

  return (
    <div className='flex size-full'>
      <TicketsSidebar domain={domain} />
      {children}
    </div>
  )
}
