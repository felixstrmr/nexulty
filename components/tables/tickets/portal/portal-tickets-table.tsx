'use client'

import { columns } from '@/components/tables/tickets/portal/columns'
import { DataTable } from '@/components/tables/tickets/portal/data-table'
import { TICKET_STATUS_TYPES } from '@/lib/constants'
import { Ticket } from '@/types'
import { parseAsStringEnum, useQueryState } from 'nuqs'

type Props = {
  tickets: Ticket[]
}

export default function PortalTicketsTable({ tickets }: Props) {
  const [type] = useQueryState(
    'type',
    parseAsStringEnum(TICKET_STATUS_TYPES).withDefault('unresolved')
  )

  const filteredTickets = tickets.filter(
    (ticket) => ticket.status.type === type
  )

  return <DataTable columns={columns} data={filteredTickets} />
}
