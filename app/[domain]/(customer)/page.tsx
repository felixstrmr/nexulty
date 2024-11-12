import TicketCustomerViewTabs from '@/components/tabs/ticket-customer-view-tabs'
import { buttonVariants } from '@/components/ui/button'
import TicketCustomerView from '@/components/views/tickets/customer/ticket-customer-view'
import { env } from '@/lib/env'
import { getTickets } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { Plus } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  const { domain: rawDomain } = await params
  const domain = rawDomain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')

  const supabase = await createClient()

  const { data: tickets, error } = await getTickets(supabase, domain)
  if (error) throw error

  return (
    <div className='mx-auto flex size-full max-w-6xl flex-col space-y-6 py-6'>
      <div className='flex items-center justify-between'>
        <h4>Open Tickets ({tickets.length})</h4>
        <div className='flex items-center gap-2'>
          <TicketCustomerViewTabs />
          <Link
            href={'/create'}
            className={buttonVariants({ variant: 'default' })}
          >
            <Plus />
            Create Ticket
          </Link>
        </div>
      </div>
      <TicketCustomerView tickets={tickets} />
    </div>
  )
}
