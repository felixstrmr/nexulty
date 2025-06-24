'use client'

import { cn } from '@/utils'
import { useQueryState } from 'nuqs'

export default function PortalTicketTabs() {
  const [currentTab, setCurrentTab] = useQueryState('tab', {
    defaultValue: 'open',
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
            onClick={() => setCurrentTab(tab.value)}
            className={cn(
              'hover:bg-muted flex h-8 cursor-pointer items-center justify-center rounded-md px-2 transition-all',
              currentTab === tab.value
                ? 'text-foreground'
                : 'text-muted-foreground',
            )}
          >
            <span className='text-sm'>{tab.name}</span>
          </button>
          <div
            className={cn(
              'h-px w-full',
              currentTab === tab.value ? 'bg-foreground' : 'bg-transparent',
            )}
          />
        </div>
      ))}
    </div>
  )
}
