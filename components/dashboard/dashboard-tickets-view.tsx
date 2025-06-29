import { columns } from '@/components/tables/tickets/dashboard/columns'
import { DataTable } from '@/components/tables/tickets/dashboard/data-table'
import { getTickets } from '@/queries/tickets'

type Props = {
  domain: string
  type?: string
  status?: string
}

export default async function DashboardTicketsView({ type, status }: Props) {
  const { tickets } = await getTickets({
    filters: {
      type: type ?? 'open',
      status,
    },
  })

  return <DataTable columns={columns} data={tickets} />
}
