import DashboardSidebarDropdown from '@/components/sidebars/dashboard-sidebar-dropdown'
import DashboardSidebarNavigation from '@/components/sidebars/dashboard-sidebar-navigation'
import { getOrganization } from '@/queries/cached'
import { notFound } from 'next/navigation'

type Props = {
  domain: string
}

export default async function DashboardSidebar({ domain }: Props) {
  const organization = await getOrganization(domain)

  if (!organization) {
    return notFound()
  }

  return (
    <aside className='flex w-64 max-w-64 min-w-64 flex-col gap-4 p-4'>
      <DashboardSidebarDropdown organization={organization} />
      <DashboardSidebarNavigation />
    </aside>
  )
}
