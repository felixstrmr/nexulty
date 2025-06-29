'use client'

import { cn } from '@/utils'
import { useQueryState } from 'nuqs'

export default function PortalTicketTabs() {
  const [currentType, setCurrentType] = useQueryState('type', {
    defaultValue: 'open',
    shallow: false,
  })

  const tabs = [
    {
      name: 'Open',
      value: 'open',
    },
    {
      name: 'Closed',
      value: 'closed',
    },
  ]

  return (
    <div className='border-border flex gap-1 border-b' role='tablist'>
      {tabs.map((tab) => (
        <div key={tab.name} role='tab' className='flex flex-col space-y-1'>
          <button
            onClick={() => setCurrentType(tab.value)}
            className={cn(
              'hover:bg-muted flex h-8 cursor-pointer items-center justify-center rounded-md px-2 transition-all',
              currentType === tab.value
                ? 'text-foreground'
                : 'text-muted-foreground',
            )}
          >
            <span className='text-sm'>{tab.name}</span>
          </button>
          <div
            className={cn(
              'h-px w-full',
              currentType === tab.value ? 'bg-foreground' : 'bg-transparent',
            )}
          />
        </div>
      ))}
    </div>
  )
}
