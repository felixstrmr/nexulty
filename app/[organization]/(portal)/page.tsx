import { columns } from '@/components/tables/tickets/portal/columns'
import { DataTable } from '@/components/tables/tickets/portal/data-table'
import { buttonVariants } from '@/components/ui/button'
import { getOrganizationUser, getTickets } from '@/queries/cached'
import { getDomain } from '@/utils'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ organization: string }>
}

export default async function Page({ params }: Props) {
  const { organization } = await params
  const domain = getDomain(organization)

  const [organizationUser, tickets] = await Promise.all([
    getOrganizationUser(domain),
    getTickets(domain)
  ])

  if (!organizationUser) {
    return redirect('/signin')
  }

  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-4 pt-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Welcome back, {organizationUser.first_name}!
          </h1>
          <p className='text-muted-foreground text-sm'>
            Here&apos;s an overview of your tickets and recent activity.
          </p>
        </div>
        <Link
          href={'/create'}
          className={buttonVariants({ variant: 'default' })}
        >
          Create Ticket
        </Link>
      </div>
      <DataTable columns={columns} data={tickets} />
    </div>
  )
}
