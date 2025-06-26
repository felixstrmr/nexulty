'use client'

import { TicketStatus } from '@/types'
import { cn } from '@/utils'
import { ChevronRight, CircleCheck, CircleDashed } from 'lucide-react'
import { useQueryState } from 'nuqs'
import React from 'react'

type Props = {
  statuses: TicketStatus[]
}

export default function TicketsSidebarNavigation({ statuses }: Props) {
  const [currentType, setCurrentType] = useQueryState('type', {
    defaultValue: 'open',
    shallow: true,
  })

  const [currentStatus, setCurrentStatus] = useQueryState('status', {
    shallow: true,
  })

  const groupedStatuses = statuses.reduce(
    (acc, status) => {
      acc[status.type] = acc[status.type] || []
      acc[status.type].push(status)
      return acc
    },
    {} as Record<string, TicketStatus[]>,
  )

  return (
    <div className='space-y-4'>
      {Object.entries(groupedStatuses).map(([type, statuses]) => (
        <StatusItem
          key={type}
          type={type}
          statuses={statuses}
          currentStatus={currentStatus}
          setCurrentStatus={setCurrentStatus}
          currentType={currentType}
          setCurrentType={setCurrentType}
        />
      ))}
    </div>
  )
}

type StatusItemProps = {
  type: string
  statuses: TicketStatus[]
  currentStatus: string | null
  setCurrentStatus: (status: string | null) => void
  currentType: string | null
  setCurrentType: (type: string | null) => void
}

function StatusItem(item: StatusItemProps) {
  const [isOpen, setOpen] = React.useState(true)

  const handleGroupClick = () => {
    item.setCurrentType(item.type)
    item.setCurrentStatus(null)
    setOpen(true)
  }

  return (
    <div className='space-y-1'>
      <button
        className={cn(
          'hover:bg-muted flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-2 transition-colors',
          item.currentType === item.type &&
            (!item.currentStatus || item.currentStatus === '')
            ? 'text-foreground bg-muted'
            : 'text-muted-foreground',
        )}
        onClick={handleGroupClick}
      >
        {item.type === 'open' ? (
          <CircleDashed className='text-primary size-4' />
        ) : (
          <CircleCheck className='text-primary size-4' />
        )}
        <span className='text-sm capitalize'>{item.type}</span>
        <ChevronRight
          className={cn(
            'ml-auto h-4 w-4 transition-transform duration-200',
            isOpen ? 'rotate-90' : 'rotate-0',
          )}
          onClick={(e) => {
            e.stopPropagation()
            setOpen(!isOpen)
          }}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden',
          isOpen ? 'max-h-full space-y-1' : 'max-h-0 space-y-0 opacity-0',
        )}
      >
        {item.statuses.map((status) => (
          <SidebarItem
            key={status.id}
            status={status}
            currentStatus={item.currentStatus}
            setCurrentStatus={item.setCurrentStatus}
            setCurrentType={item.setCurrentType}
          />
        ))}
      </div>
    </div>
  )
}

type SidebarItemProps = {
  status: TicketStatus
  currentStatus: string | null
  setCurrentStatus: (status: string | null) => void
  setCurrentType: (type: string | null) => void
}

function SidebarItem({
  status,
  currentStatus,
  setCurrentStatus,
  setCurrentType,
}: SidebarItemProps) {
  const handleStatusClick = () => {
    setCurrentStatus(status.id)
    setCurrentType(null)
  }

  return (
    <div className='relative pl-4'>
      <div className='bg-border absolute left-2 h-9 w-px' />
      <button
        onClick={handleStatusClick}
        className={cn(
          'flex h-8 w-full cursor-pointer items-center rounded-md px-2 transition-colors',
          currentStatus === status.id
            ? 'text-foreground bg-muted'
            : 'text-muted-foreground hover:bg-muted',
        )}
      >
        <span className='text-sm'>{status.name}</span>
      </button>
    </div>
  )
}
