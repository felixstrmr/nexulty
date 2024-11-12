'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LayoutGrid, Rows3 } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'

export default function TicketCustomerViewTabs() {
  const [view, setView] = useQueryState(
    'view',
    parseAsString.withDefault('grid'),
  )

  return (
    <Tabs value={view} onValueChange={setView}>
      <TabsList>
        <TabsTrigger value='grid'>
          <LayoutGrid className='size-4' />
        </TabsTrigger>
        <TabsTrigger value='list'>
          <Rows3 className='size-4' />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
