import { getTicketCategories, getTicketCategoryGroups } from '@/queries/cached'
import { getDomainFromOrganization } from '@/utils'
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
      <div className='mx-auto flex w-full max-w-5xl flex-col gap-8 pt-8'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-semibold tracking-tight'>
            Create new ticket
          </h1>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          {groups.map((group) => (
            <Link
              key={group.id}
              href={buildUrl({ group: group.id })}
              className='hover:border-primary rounded-lg border p-4 transition-all'
            >
              {group.name}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const selectedGroup = groups.find((g) => g.id === group)
  const filteredCategories = categories.filter(
    (c) => c.group === selectedGroup?.id,
  )

  if (!category) {
    return (
      <div className='mx-auto flex w-full max-w-5xl flex-col gap-8 pt-8'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-semibold tracking-tight'>
            Create new ticket
          </h1>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={buildUrl({ group, category: category.id })}
              className='hover:border-primary rounded-lg border p-4 transition-all'
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return <div></div>
}
