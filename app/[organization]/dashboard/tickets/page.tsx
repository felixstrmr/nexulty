import TicketsView from '@/components/dashboard/tickets-view'
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
  )
}
