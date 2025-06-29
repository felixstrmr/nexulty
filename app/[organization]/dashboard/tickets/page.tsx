import { getTickets } from '@/queries/cached'
import { getDomainFromOrganization } from '@/utils'

type Props = {
  params: Promise<{ organization: string }>
  searchParams: Promise<{ status?: string; type?: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const { organization } = await params
  const domain = getDomainFromOrganization(organization)

  const { type } = await searchParams

  const tickets = await getTickets(domain, type ?? 'open')

  return (
    <div>
      <pre>{JSON.stringify(tickets, null, 2)}</pre>
    </div>
  )
}
