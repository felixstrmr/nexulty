import { buttonVariants } from '@/components/ui/button'
import TicketComments from '@/components/views/ticket/ticket-comments'
import { getTicket } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { cn, getDomain } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ domain: string; ticketId: string }>
}

export default async function TicketDetailsPage({ params }: Props) {
  const { domain: domainParam, ticketId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const ticket = await getTicket(supabase, domain, ticketId)

  if (!ticket) return notFound()

  return (
    <div className='flex size-full flex-col space-y-6 bg-muted/50 p-6'>
      <Link
        href={'/agent/tickets'}
        className={cn(buttonVariants({ variant: 'ghost' }), 'w-fit')}
      >
        <ArrowLeft className='size-4' />
        Tickets
      </Link>
      <div className='size-full space-y-4'>
        <div className='mx-auto flex w-full max-w-6xl gap-4'>
          <div className='w-2/3 rounded-2xl border bg-background p-6'>
            <p className='text-sm text-primary'>Ticket #{ticket.number}</p>
            <h3 className='mt-2'>{ticket.subject}</h3>
          </div>
          <div className='w-1/3 rounded-2xl border bg-background p-6'>
            <h4>Information</h4>
          </div>
        </div>
        <div className='mx-auto flex w-full max-w-6xl rounded-2xl border bg-background p-6'>
          <TicketComments ticket={ticket} domain={domain} />
        </div>
      </div>
    </div>
  )
}
