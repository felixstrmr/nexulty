import { getTickets } from '@/queries/tickets'
import { getDomainFromOrganization } from '@/utils'

type Props = {
  params: Promise<{ organization: string }>
  searchParams: Promise<{ status?: string; type?: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const { organization } = await params
  const domain = getDomainFromOrganization(organization)

  const { type } = await searchParams

  const { tickets, totalCount, totalPages, currentPage } = await getTickets({
    domain,
    filters: {
      type: type ?? 'open',
    },
  })

  return (
    <div>
      <pre>
        {JSON.stringify(
          { tickets, totalCount, totalPages, currentPage },
          null,
          2,
        )}
      </pre>
    </div>
  )
}
