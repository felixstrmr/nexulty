'use client'

import DynamicIcon from '@/components/dynamic-icon'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TicketWithRelations } from '@/lib/types/custom'
import { formatRelativeTime } from '@/lib/utils'
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
    accessorKey: 'type',
    header: '',
    cell: ({ row }) => {
      const ticket = row.original

      return (
        <Tooltip>
          <TooltipTrigger className='flex items-center'>
            <DynamicIcon
              icon={ticket.type.icon}
              style={{ color: ticket.type.color }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{ticket.type.name}</p>
          </TooltipContent>
        </Tooltip>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const ticket = row.original

      return (
        <div className='flex items-center gap-2'>
          <DynamicIcon
            icon={ticket.status.icon}
            style={{ color: ticket.status.color }}
          />
          {ticket.status.name}
        </div>
      )
    },
  },

  {
    accessorKey: 'subject',
    header: 'Subject',
    cell: ({ row }) => {
      const ticket = row.original

      return <p className='font-medium'>{ticket.subject}</p>
    },
  },
  {
    accessorKey: 'reporter',
    header: 'Reporter',
    cell: ({ row }) => row.original.reporter.email,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => formatRelativeTime(new Date(row.original.created_at)),
  },
]