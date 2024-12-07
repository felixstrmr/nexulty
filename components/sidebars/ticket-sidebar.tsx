'use client'

import DynamicIcon from '@/components/dynamic-icon'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TicketStatus } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ChevronDown, MoreVertical, Plus, Search } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import React from 'react'

type Props = {
  ticketStatuses: TicketStatus[]
}

export default function TicketSidebar({ ticketStatuses }: Props) {
  const [currentStatus, setCurrentStatus] = useQueryState(
    'status',
    parseAsString.withDefault('uncompleted'),
  )
  const [openStatusGroup, setOpenStatusGroup] = React.useState<
    'completed' | 'uncompleted'
  >('uncompleted')

  const statusesGroupedByType = ticketStatuses.reduce(
    (acc, status) => {
      acc[status.type] = acc[status.type] || []
      acc[status.type].push(status)
      return acc
    },
    {} as Record<TicketStatus['type'], TicketStatus[]>,
  )

  const handleStatusGroupToggle = (type: 'completed' | 'uncompleted') => {
    setOpenStatusGroup(openStatusGroup === type ? type : type)
    setCurrentStatus(type)
  }

  const renderStatusGroup = (type: 'completed' | 'uncompleted') => (
    <div className='flex flex-col'>
      <button
        onClick={() => handleStatusGroupToggle(type)}
        className={cn(
          'flex h-9 items-center justify-between rounded-md border px-3 text-start text-sm transition-all',
          openStatusGroup === type || currentStatus === type
            ? 'border-border bg-muted text-foreground shadow'
            : 'border-transparent text-muted-foreground hover:text-foreground',
        )}
      >
        {type === 'uncompleted' ? 'Uncompleted' : 'Completed'}
        <ChevronDown
          className={cn(
            'size-4 transition-transform',
            openStatusGroup === type ? 'rotate-180' : 'rotate-0',
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-all',
          openStatusGroup === type
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className='overflow-hidden'>
          {statusesGroupedByType[type]?.map((status) => (
            <div
              key={status.id}
              className='flex items-center gap-2 pl-3 transition-all'
            >
              <div
                className={cn(
                  'h-10 w-px transition-all',
                  currentStatus === status.id ? 'bg-foreground' : 'bg-border',
                )}
              />
              <button
                onClick={() => setCurrentStatus(status.id)}
                className={cn(
                  'mt-1 flex h-9 items-center gap-2 rounded-md px-3 text-start text-sm transition-all',
                  currentStatus === status.id
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <DynamicIcon
                  icon={status.icon}
                  style={{
                    color:
                      currentStatus === status.id ? status.color : 'inherit',
                  }}
                  className='size-4 transition-all'
                />
                {status.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <aside className='w-64 min-w-64 border-r p-4'>
      <div className='flex h-9 items-center justify-between'>
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <Search className='size-4 text-muted-foreground' />
          Search...
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='iconSm'>
            <Plus />
          </Button>
          <Button variant='ghost' size='iconSm'>
            <MoreVertical />
          </Button>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='flex flex-col gap-2'>
        {renderStatusGroup('uncompleted')}
        {renderStatusGroup('completed')}
      </div>
    </aside>
  )
}
