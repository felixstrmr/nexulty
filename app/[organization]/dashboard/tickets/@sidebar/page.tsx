import TicketsSidebar from '@/components/sidebars/tickets-sidebar'
import { getTicketStatuses } from '@/queries/cached'
import { getDomainFromOrganization } from '@/utils'

type Props = {
  params: Promise<{ organization: string }>
}

export default async function Page({ params }: Props) {
  const { organization } = await params
  const domain = getDomainFromOrganization(organization)

  const statuses = await getTicketStatuses(domain)

  return <TicketsSidebar statuses={statuses} />
}
