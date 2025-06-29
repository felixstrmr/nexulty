import TicketsView from '@/components/dashboard/tickets-view'
import { getDomainFromOrganization } from '@/utils'
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
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TicketsView domain={domain} type={type} status={status} />
      </Suspense>
    </div>
  )
}
