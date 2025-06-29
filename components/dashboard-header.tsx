import Avatar from '@/components/avatar'
import DashboardHeaderBreadcrumb from '@/components/dashboard-header-breadcrumb'
import { getUser } from '@/queries/cached'

type Props = {
  domain: string
}

export default async function DashboardHeader({}: Props) {
  const user = await getUser()

  if (!user) {
    return null
  }

  return (
    <div className='flex items-center justify-between border-b p-4'>
      <DashboardHeaderBreadcrumb />
      <Avatar value={`${user.first_name} ${user.last_name}`} />
    </div>
  )
}
