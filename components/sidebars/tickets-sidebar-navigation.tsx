'use client'

import { TicketStatus } from '@/types'
import { cn } from '@/utils'
import { useQueryState } from 'nuqs'

type Props = {
  statuses: TicketStatus[]
}

export default function TicketsSidebarNavigation({ statuses }: Props) {
  const [currentStatus, setCurrentStatus] = useQueryState('status', {
    defaultValue: statuses[0]?.id,
    shallow: true,
  })

  return (
    <div className='space-y-1'>
      {statuses.map((status) => (
        <SidebarItem
          key={status.id}
          status={status}
          currentStatus={currentStatus}
          setCurrentStatus={setCurrentStatus}
        />
      ))}
    </div>
  )
}

type SidebarItemProps = {
  status: TicketStatus
  currentStatus: string
  setCurrentStatus: (status: string) => void
}

function SidebarItem({
  status,
  currentStatus,
  setCurrentStatus,
}: SidebarItemProps) {
  return (
    <button
      onClick={() => setCurrentStatus(status.id)}
      className={cn(
        'flex h-8 w-full cursor-pointer items-center rounded-md px-2 transition-colors',
        currentStatus === status.id
          ? 'text-foreground bg-foreground/[7.5%]'
          : 'text-muted-foreground hover:bg-foreground/[7.5%]',
      )}
    >
      <span className='text-sm'>{status.name}</span>
    </button>
  )
}
