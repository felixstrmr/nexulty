'use client'

import { Ticket } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
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
    accessorKey: 'status.name',
    header: 'Status',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
]
