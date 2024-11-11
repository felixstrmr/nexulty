import { columns } from '@/components/tables/tickets/customer/columns'
import { DataTable } from '@/components/tables/tickets/customer/data-table'
import { buttonVariants } from '@/components/ui/button'
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
        <Link
          href={'/create'}
          className={buttonVariants({ variant: 'default' })}
        >
          <Plus />
          Create Ticket
        </Link>
      </div>
      <DataTable columns={columns} data={tickets} />
    </div>
  )
}
