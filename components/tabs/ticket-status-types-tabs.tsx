'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TICKET_STATUS_TYPES } from '@/lib/constants'
import { parseAsStringEnum, useQueryState } from 'nuqs'

export default function TicketStatusTypesTabs() {
  const [type, setType] = useQueryState(
    'type',
    parseAsStringEnum(TICKET_STATUS_TYPES).withDefault('unresolved')
  )

  return (
    <Tabs value={type} onValueChange={setType}>
      <TabsList>
        {TICKET_STATUS_TYPES.map((type) => (
          <TabsTrigger key={type} value={type} className='capitalize'>
            {type}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
