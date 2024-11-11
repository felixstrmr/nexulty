'use client'

import DynamicIcon from '@/components/dynamic-icon'
import { Checkbox } from '@/components/ui/checkbox'
import { TicketWithRelations } from '@/types/custom'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<TicketWithRelations>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <div
          style={{ color: status.icon_color }}
          className='flex w-fit items-center gap-2'
        >
          <DynamicIcon icon={status.icon} />
          {status.name}
        </div>
      )
    },
  },
  {
    accessorKey: 'subject',
    header: 'Subject',
    cell: ({ row }) => {
      return <p className='font-medium'>{row.original.subject}</p>
    },
  },
]
