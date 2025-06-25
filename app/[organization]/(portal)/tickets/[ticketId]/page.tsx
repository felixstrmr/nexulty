import { supabaseClient } from '@/lib/clients/supabase-client'
import { getDomainFromOrganization } from '@/utils'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ organization: string; ticketId: string }>
}

export default async function Page({ params }: Props) {
  const { organization, ticketId } = await params
  const domain = getDomainFromOrganization(organization)

  const supabase = await supabaseClient()
  const { data: ticket } = await supabase
    .from('tickets')
    .select(
      `
      *,
      organization!inner(domain),
      status:ticket_statuses!inner(id, name, type)
      `,
    )
    .eq('organization.domain', domain)
    .eq('id', ticketId)
    .maybeSingle()
    .throwOnError()

  if (!ticket) {
    notFound()
  }

  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-8 pt-8'>
      <div className='space-y-1'>
        <h1 className='text-3xl font-semibold tracking-tight'>
          {ticket.title}
        </h1>
        <p className='text-muted-foreground text-sm'>{ticket.description}</p>
      </div>
      <div className='grid grid-cols-4 gap-4'></div>
    </div>
  )
}
