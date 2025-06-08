'use client'

import { Ticket } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  }
]
