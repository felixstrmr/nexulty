import { getTicketCategories } from '@/lib/queries/cached'
import { getDomainFromOrganization } from '@/lib/utils'

type Props = {
  params: Promise<{ organization: string }>
}

export default async function Page({ params }: Props) {
  const { organization } = await params
  const domain = getDomainFromOrganization(organization)

  const ticketCategories = await getTicketCategories(domain)

  return (
    <div>
      {ticketCategories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  )
}
