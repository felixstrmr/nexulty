'use client'

import { columns } from '@/components/tables/tickets/agent/columns'
import { DataTable } from '@/components/tables/tickets/agent/data-table'
import { TicketWithRelations } from '@/lib/types/custom'
import { parseAsString, useQueryState } from 'nuqs'

type Props = {
  tickets: TicketWithRelations[]
}

export default function TicketsAgentView({ tickets }: Props) {
  const [status] = useQueryState(
    'status',
    parseAsString.withDefault('uncompleted'),
  )
  const [sort] = useQueryState('sortBy', parseAsString.withDefault('number'))

  const filteredTickets = tickets
    .filter((ticket) =>
      status === 'uncompleted'
        ? ticket.status.type === 'uncompleted'
        : status === 'completed'
          ? ticket.status.type === 'completed'
          : ticket.status.id === status,
    )
    .sort((a, b) => {
      if (sort === 'number') return Number(b.number) - Number(a.number)
      return 0
    })

  return <DataTable columns={columns} data={filteredTickets} />
}
