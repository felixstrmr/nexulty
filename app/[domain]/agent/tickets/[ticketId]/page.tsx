import DynamicIcon from '@/components/dynamic-icon'
import { getTicket } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ domain: string; ticketId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, ticketId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const ticket = await getTicket(supabase, domain, ticketId)

  if (!ticket) return notFound()

  return (
    <div className='flex size-full flex-col space-y-12 p-6'>
      <div>
        <Link
          href={'/agent/tickets'}
          className='flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeftIcon className='size-4' />
          Tickets
        </Link>
      </div>
      <div className='mx-auto w-full max-w-2xl duration-300 animate-in slide-in-from-bottom-3'>
        <p className='mb-2 text-primary'>#{ticket.number}</p>
        <h3>{ticket.subject}</h3>
        <div className='mt-9 flex gap-16'>
          <div className='flex flex-col gap-3 text-sm'>
            <div className='flex items-center gap-9'>
              <p className='w-24'>Status</p>
              <div className='flex w-fit items-center gap-2 rounded-md p-1 px-2 transition-colors hover:bg-muted'>
                <DynamicIcon
                  icon={ticket.status.icon}
                  style={{ color: ticket.status.color }}
                />
                <p>{ticket.status.name}</p>
              </div>
            </div>
            <div className='flex items-center gap-9'>
              <p className='w-24'>Reporter</p>
              <Link
                href={`/agent/users/${ticket.reporter.id}`}
                className='flex w-fit items-center gap-2 rounded-md p-1 px-2 transition-colors hover:bg-muted'
              >
                <p>{ticket.reporter.display_name}</p>
              </Link>
            </div>
            <div className='flex items-center gap-9'>
              <p className='w-24'>Assignee</p>
              <Link
                href={`/agent/users/${ticket.assignee.id}`}
                className='flex w-fit items-center gap-2 rounded-md p-1 px-2 transition-colors hover:bg-muted'
              >
                <p>{ticket.assignee.display_name}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className='mt-9'>
          <p className='text-sm font-medium'>Description</p>
          <p className='mt-2 text-sm'>
            {ticket.description || 'No description'}
          </p>
        </div>
      </div>
    </div>
  )
}
