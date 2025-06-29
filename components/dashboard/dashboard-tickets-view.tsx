import { getTickets } from '@/queries/tickets'

type Props = {
  domain: string
  type?: string
  status?: string
}

export default async function DashboardTicketsView({ type, status }: Props) {
  const { tickets, totalCount, totalPages, currentPage } = await getTickets({
    filters: {
      type: type ?? 'open',
      status,
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
