import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className='flex size-full bg-zinc-50 dark:bg-zinc-900'>
      <DashboardSidebar />
      <div className='flex-1 py-1 pr-1'>
        <div className='bg-background flex size-full rounded-sm border'>
          {children}
        </div>
      </div>
    </div>
  )
}
