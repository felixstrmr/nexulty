import TicketsView from '@/components/dashboard/dashboard-tickets-view'
import { getDomainFromOrganization } from '@/utils'
import { Loader } from 'lucide-react'
import { Suspense } from 'react'

type Props = {
  params: Promise<{ organization: string }>
  searchParams: Promise<{ status?: string; type?: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const { organization } = await params
  const domain = getDomainFromOrganization(organization)

  const { type, status } = await searchParams

  return (
    <div className='flex size-full flex-col gap-4 p-4'>
      <h1 className='text-3xl font-semibold tracking-tight'>Tickets</h1>
      <Suspense
        key={JSON.stringify({ type, status })}
        fallback={
          <div className='flex size-full items-center justify-center'>
            <Loader className='size-4 animate-spin' />
          </div>
        }
      >
        <TicketsView domain={domain} type={type} status={status} />
      </Suspense>
    </div>
  )
}
