import DashboardSidebar from '@/components/sidebars/dashboard-sidebar'
import { getDomain } from '@/utils'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Nexulty • Dashboard'
}

type Props = {
  children: React.ReactNode
  params: Promise<{ organization: string }>
}

export default async function DashboardLayout({ children, params }: Props) {
  const { organization } = await params
  const domain = getDomain(organization)

  return (
    <div className='flex size-full bg-zinc-50'>
      <DashboardSidebar domain={domain} />
      <div className='flex-1 py-1 pr-1'>
        <div className='bg-background flex size-full rounded-lg border shadow-md'>
          {children}
        </div>
      </div>
    </div>
  )
}
