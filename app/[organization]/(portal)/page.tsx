import { Button } from '@/components/ui/button'
import { getOrganizationUser } from '@/queries/cached'
import { getDomainFromOrganization } from '@/utils'
import { Plus } from 'lucide-react'

type Props = {
  params: Promise<{ organization: string }>
}

export default async function Page({ params }: Props) {
  const { organization } = await params
  const domain = getDomainFromOrganization(organization)

  const organizationUser = await getOrganizationUser(domain)

  return (
    <div className='mx-auto w-full max-w-5xl pt-8'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Welcome back, {organizationUser?.first_name}!
          </h1>
          <p className='text-muted-foreground text-sm'>
            Here&apos;s an overview of your support tickets and recent activity.
          </p>
        </div>
        <Button>
          <Plus />
          New Ticket
        </Button>
      </div>
    </div>
  )
}
