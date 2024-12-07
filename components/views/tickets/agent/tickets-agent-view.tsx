'use client'

import { columns } from '@/components/tables/tickets/agent/columns'
import { DataTable } from '@/components/tables/tickets/agent/data-table'
import { TicketWithRelations } from '@/lib/types/custom'
import { parseAsString, useQueryState } from 'nuqs'

type Props = {
  tickets: TicketWithRelations[]
}

export default function TicketsAgentView({ tickets }: Props) {
  const [currentStatus] = useQueryState(
    'status',
    parseAsString.withDefault('uncompleted'),
  )

  const filteredTickets = tickets.filter((ticket) =>
    currentStatus === 'uncompleted'
      ? ticket.status.type === 'uncompleted'
      : currentStatus === 'completed'
        ? ticket.status.type === 'completed'
        : ticket.status.id === currentStatus,
  )

  return (
    <>
      <div className='flex items-center gap-4'>
        <h3>Tickets</h3>
        <div className='rounded-sm border border-primary/15 bg-primary/10 px-2 text-sm text-primary'>
          {filteredTickets.length}
        </div>
      </div>
      <DataTable columns={columns} data={filteredTickets} />
    </>
  )
}
