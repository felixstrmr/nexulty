import { buttonVariants } from '@/components/ui/button'
import {
  getTicketCategories,
  getTicketCategoryGroups,
} from '@/lib/queries/cached'
import { getDomainFromOrganization } from '@/lib/utils'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

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

  // Build URL helper with better type safety
  const buildUrl = (params: { group?: string; category?: string }) => {
    const urlParams = new URLSearchParams()
    if (params.group) urlParams.set('group', params.group)
    if (params.category) urlParams.set('category', params.category)
    const query = urlParams.toString()
    return `/tickets/create${query ? `?${query}` : ''}`
  }

  // Error handling for invalid selections
  if (group && !groups.find((g) => g.id === group)) {
    redirect('/tickets/create')
  }

  if (category && !categories.find((c) => c.id === category)) {
    redirect(buildUrl({ group }))
  }

  // Step 1: Select Group
  if (!group) {
    return (
      <div className='mx-auto flex w-full max-w-5xl flex-col gap-8 pt-8'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-semibold tracking-tight'>
            Create Ticket
          </h1>
          <p className='text-muted-foreground'>
            Select a category group to continue creating your ticket.
          </p>
        </div>

        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {groups.length === 0 ? (
            <div className='col-span-full rounded-lg border border-dashed p-8 text-center'>
              <p className='text-muted-foreground'>
                No category groups available
              </p>
            </div>
          ) : (
            groups.map((group) => (
              <Link
                key={group.id}
                href={buildUrl({ group: group.id })}
                className='group hover:border-primary hover:bg-accent/50 relative rounded-lg border p-4 transition-colors'
              >
                <div className='flex items-center justify-between'>
                  <h3 className='group-hover:text-primary font-medium'>
                    {group.name}
                  </h3>
                  <ChevronRight className='text-muted-foreground group-hover:text-primary h-4 w-4' />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    )
  }

  // Get selected group for breadcrumb and validation
  const selectedGroup = groups.find((g) => g.id === group)
  if (!selectedGroup) {
    redirect('/tickets/create')
  }

  const filteredCategories = categories.filter(
    (c) => c.group === selectedGroup.id,
  )

  // Step 2: Select Category
  if (!category) {
    return (
      <div className='mx-auto flex w-full max-w-5xl flex-col gap-8 pt-8'>
        <div className='space-y-2'>
          <div className='text-muted-foreground flex items-center gap-2 text-sm'>
            <Link href='/tickets/create' className='hover:text-foreground'>
              Create Ticket
            </Link>
            <ChevronRight className='h-3 w-3' />
            <span className='text-foreground'>{selectedGroup.name}</span>
          </div>
          <h1 className='text-3xl font-semibold tracking-tight'>
            Select Category
          </h1>
          <p className='text-muted-foreground'>
            Choose a specific category for your{' '}
            {selectedGroup.name.toLowerCase()} ticket.
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          <Link
            href='/tickets/create'
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Groups
          </Link>

          <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {filteredCategories.length === 0 ? (
              <div className='col-span-full rounded-lg border border-dashed p-8 text-center'>
                <p className='text-muted-foreground'>
                  No categories available for {selectedGroup.name}
                </p>
              </div>
            ) : (
              filteredCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={buildUrl({ group: group, category: cat.id })}
                  className='group hover:border-primary hover:bg-accent/50 relative rounded-lg border p-4 transition-colors'
                >
                  <div className='flex items-center justify-between'>
                    <h3 className='group-hover:text-primary font-medium'>
                      {cat.name}
                    </h3>
                    <ChevronRight className='text-muted-foreground group-hover:text-primary h-4 w-4' />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }

  // Get selected category for validation
  const selectedCategory = categories.find((c) => c.id === category)
  if (!selectedCategory) {
    redirect(buildUrl({ group }))
  }

  // Step 3: Create Ticket Form (placeholder)
  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-8 pt-8'>
      <div className='space-y-2'>
        <div className='text-muted-foreground flex items-center gap-2 text-sm'>
          <Link href='/tickets/create' className='hover:text-foreground'>
            Create Ticket
          </Link>
          <ChevronRight className='h-3 w-3' />
          <Link href={buildUrl({ group })} className='hover:text-foreground'>
            {selectedGroup.name}
          </Link>
          <ChevronRight className='h-3 w-3' />
          <span className='text-foreground'>{selectedCategory.name}</span>
        </div>
        <h1 className='text-3xl font-semibold tracking-tight'>
          Create {selectedCategory.name} Ticket
        </h1>
        <p className='text-muted-foreground'>
          Fill out the form below to create your ticket.
        </p>
      </div>

      <div className='flex flex-col gap-4'>
        <Link
          href={buildUrl({ group })}
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Categories
        </Link>

        {/* TODO: Add ticket creation form here */}
        <div className='rounded-lg border border-dashed p-8 text-center'>
          <p className='text-muted-foreground'>
            Ticket creation form will be implemented here for{' '}
            {selectedCategory.name}
          </p>
        </div>
      </div>
    </div>
  )
}
