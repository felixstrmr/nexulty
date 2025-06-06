import DashboardHeader from '@/components/headers/dashboard-header'
import DashboardSidebar from '@/components/sidebars/dashboard-sidebar'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className='flex size-full flex-col bg-zinc-100'>
      <DashboardHeader />
      <div className='flex size-full'>
        <DashboardSidebar />
        <div className='flex-1 pr-2 pb-2'>
          <div className='bg-background size-full rounded-md border shadow-sm'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
