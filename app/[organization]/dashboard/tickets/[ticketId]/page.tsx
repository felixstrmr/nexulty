import { getTicket } from '@/queries/cached'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ ticketId: string }>
}

export default async function Page({ params }: Props) {
  const { ticketId } = await params

  const ticket = await getTicket(ticketId)

  if (!ticket) {
    notFound()
  }

  return (
    <div>
      <pre>{JSON.stringify(ticket, null, 2)}</pre>
    </div>
  )
}
