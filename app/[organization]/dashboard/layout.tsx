import DashboardHeader from '@/components/dashboard-header'
import DashboardSidebar from '@/components/dashboard-sidebar'
import { getDomainFromOrganization } from '@/utils'

type Props = {
  children: React.ReactNode
  params: Promise<{ organization: string }>
}

export default async function DashboardLayout({ children, params }: Props) {
  const { organization } = await params
  const domain = getDomainFromOrganization(organization)

  return (
    <div className='flex size-full bg-zinc-50 dark:bg-zinc-900'>
      <DashboardSidebar />
      <div className='flex-1 py-1 pr-1'>
        <div className='bg-background flex size-full flex-col rounded-sm border'>
          <DashboardHeader domain={domain} />
          {children}
        </div>
      </div>
    </div>
  )
}
