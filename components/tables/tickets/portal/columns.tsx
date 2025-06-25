'use client'

import { Ticket } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

const TicketNumberCell = ({
  ticketId,
  number,
}: {
  ticketId: string
  number: string
}) => {
  const router = useRouter()

  return (
    <p
      className='text-primary cursor-pointer hover:underline'
      onClick={() => router.push(`/tickets/${ticketId}`)}
    >
      {number}
    </p>
  )
}

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'number',
    header: '#',
    cell: ({ row }) => {
      return (
        <TicketNumberCell
          ticketId={row.original.id}
          number={row.original.number}
        />
      )
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'status.name',
    header: 'Status',
  },
  {
    accessorKey: 'assigned_to',
    header: 'Assignee',
    cell: ({ row }) => {
      const assignee = row.original.assigned_to

      return assignee ? assignee : 'Unassigned'
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => {
      const createdAt = row.original.created_at

      return format(createdAt, 'PPp')
    },
  },
]
