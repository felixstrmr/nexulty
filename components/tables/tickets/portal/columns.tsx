'use client'

import { Ticket } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'number',
    header: '#',
    cell: ({ row }) => {
      const number = row.original.number

      return <p className='text-primary'>{number}</p>
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'status',
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
]
