'use client'

import { Ticket } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'status.name',
    header: 'Status',
    cell: ({ row }) => {
      const ticket = row.original

      return (
        <div className='bg-background flex w-fit items-center gap-1.5 rounded-full border px-2 py-0.5 shadow-xs'>
          <div
            className='size-2 rounded-full'
            style={{ backgroundColor: ticket.status.color }}
          />
          <span className='text-xs'>{ticket.status.name}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'assigned_to',
    header: 'Assignee',
    cell: ({ row }) => {
      const ticket = row.original

      return <div>{ticket.assigned_to || 'Unassigned'}</div>
    }
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => {
      const ticket = row.original

      return <div>{format(ticket.created_at, 'PPp')}</div>
    }
  }
]
