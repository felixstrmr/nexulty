import { buttonVariants } from '@/components/ui/button'
import { env } from '@/lib/env'
import { getTicket } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ domain: string; ticketId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: rawDomain, ticketId } = await params
  const domain = rawDomain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')

  const supabase = await createClient()

  const { data: ticket } = await getTicket(supabase, domain, ticketId)

  if (!ticket) return notFound()

  return (
    <div className='mx-auto flex size-full max-w-6xl flex-col py-6'>
      <div className='flex items-center gap-4'>
        <Link
          href={'/'}
          className={buttonVariants({ variant: 'outline', size: 'icon' })}
        >
          <ArrowLeft />
        </Link>
        <h3>{ticket.subject}</h3>
      </div>
    </div>
  )
}
