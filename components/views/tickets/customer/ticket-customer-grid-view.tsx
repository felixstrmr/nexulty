import DynamicIcon from '@/components/dynamic-icon'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TicketWithRelations } from '@/types/custom'
import Link from 'next/link'

type Props = {
  tickets: TicketWithRelations[]
}

export default function TicketsGridView({ tickets }: Props) {
  return (
    <div className='flex w-full gap-4'>
      {tickets.map((ticket) => (
        <Link
          href={`/${ticket.id}`}
          key={ticket.id}
          className='flex w-64 min-w-64 gap-3 rounded-lg border p-4 shadow-sm hover:bg-muted/50'
        >
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <div className='flex size-9 items-center justify-center rounded-md border bg-muted'>
                  <DynamicIcon
                    icon={ticket.status.icon}
                    style={{ color: ticket.status.icon_color }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{ticket.status.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className='flex flex-col'>
            <h6>{ticket.subject}</h6>
            <p className='text-sm text-muted-foreground'>
              {ticket.status.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
