import {
  getTicketCategories,
  getTicketCategoryGroups,
} from '@/lib/queries/cached'
import { getDomainFromOrganization } from '@/lib/utils'
import Link from 'next/link'

type Props = {
  params: Promise<{ organization: string }>
  searchParams: Promise<{ group?: string; category?: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const { organization } = await params
  const { group, category } = await searchParams
  const domain = getDomainFromOrganization(organization)

  const [categories, groups] = await Promise.all([
    getTicketCategories(domain),
    getTicketCategoryGroups(domain),
  ])

  const buildUrl = (params: { group?: string; category?: string }) => {
    const urlParams = new URLSearchParams()
    if (params.group) urlParams.set('group', params.group)
    if (params.category) urlParams.set('category', params.category)
    const query = urlParams.toString()
    return `/tickets/create${query ? `?${query}` : ''}`
  }

  if (!group) {
    return (
      <div className='flex flex-col'>
        {groups.map((group) => (
          <Link key={group.id} href={buildUrl({ group: group.id })}>
            {group.name}
          </Link>
        ))}
      </div>
    )
  }

  const selectedGroup = groups.find((g) => g.id === group)
  const filteredCategories = categories.filter(
    (c) => c.group === selectedGroup?.id,
  )

  if (!category) {
    return (
      <div className='flex flex-col'>
        {filteredCategories.map((category) => (
          <Link
            key={category.id}
            href={buildUrl({ group, category: category.id })}
          >
            {category.name}
          </Link>
        ))}
      </div>
    )
  }

  return <div></div>
}
