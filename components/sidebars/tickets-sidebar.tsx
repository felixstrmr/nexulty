'use client'

import TicketStatusIcon from '@/components/icons/dynamic/ticket-status-icon'
import { TicketStatus } from '@/types'
import { cn } from '@/utils'
import { parseAsString, useQueryState } from 'nuqs'

type Props = {
  statuses: TicketStatus[]
}

export default function TicketsSidebar({ statuses }: Props) {
  const defaultStatus = statuses.find((status) => status.is_default)

  const [activeStatus, setActiveStatus] = useQueryState(
    'status',
    parseAsString.withDefault(defaultStatus?.id ?? ''),
  )

  return (
    <aside className='flex w-64 max-w-64 min-w-64 flex-col gap-4 border-r p-4'>
      <div className='flex h-8 items-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Tickets</h1>
      </div>
      <div className='space-y-1'>
        {statuses.map((status) => (
          <SidebarItem
            key={status.id}
            status={status}
            isActive={activeStatus === status.id}
            onClick={() => setActiveStatus(status.id)}
          />
        ))}
      </div>
    </aside>
  )
}

type SidebarItemProps = {
  status: TicketStatus
  isActive: boolean
  onClick: () => void
}

function SidebarItem(item: SidebarItemProps) {
  return (
    <div
      onClick={item.onClick}
      className={cn(
        'flex h-8 cursor-pointer items-center gap-2 rounded-md px-2 transition-all',
        item.isActive
          ? 'bg-muted text-foreground'
          : 'text-muted-foreground hover:bg-muted bg-transparent',
      )}
    >
      <TicketStatusIcon icon={item.status.icon} />
      <span className='text-sm'>{item.status.name}</span>
    </div>
  )
}
