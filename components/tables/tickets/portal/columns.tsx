'use client'

import { Ticket } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import Link from 'next/link'

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'number',
    header: '#',
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/tickets/${row.original.id}`}
          className='text-primary cursor-pointer hover:underline'
        >
          {row.original.number}
        </Link>
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
