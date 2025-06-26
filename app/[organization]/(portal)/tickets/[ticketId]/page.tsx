import { getTicket } from '@/queries/cached'
import { getDomainFromOrganization } from '@/utils'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ organization: string; ticketId: string }>
}

export default async function Page({ params }: Props) {
  const { organization, ticketId } = await params
  const domain = getDomainFromOrganization(organization)

  const ticket = await getTicket(domain, ticketId)

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
