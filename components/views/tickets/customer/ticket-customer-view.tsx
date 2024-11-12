'use client'

import { columns } from '@/components/tables/tickets/customer/columns'
import { DataTable } from '@/components/tables/tickets/customer/data-table'
import TicketsGridView from '@/components/views/tickets/customer/ticket-customer-grid-view'
import { TicketWithRelations } from '@/types/custom'
import { parseAsString, useQueryState } from 'nuqs'

type Props = {
  tickets: TicketWithRelations[]
}

export default function TicketCustomerView({ tickets }: Props) {
  const [view] = useQueryState('view', parseAsString.withDefault('grid'))

  return view === 'grid' ? (
    <TicketsGridView tickets={tickets} />
  ) : (
    <DataTable columns={columns} data={tickets} />
  )
}
