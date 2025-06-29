import { columns } from '@/components/tables/tickets/portal/columns'
import { DataTable } from '@/components/tables/tickets/portal/data-table'
import { getTickets } from '@/queries/tickets'

type Props = {
  domain: string
  type?: string
}

export default async function TicketsView({ type }: Props) {
  const { tickets } = await getTickets({
    filters: {
      type: type ?? 'open',
    },
  })

  return <DataTable columns={columns} data={tickets} />
}
