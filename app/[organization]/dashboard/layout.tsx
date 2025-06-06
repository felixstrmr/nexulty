import DashboardSidebar from '@/components/sidebars/dashboard-sidebar'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className='flex size-full bg-zinc-50'>
      <DashboardSidebar />
      <div className='flex-1 py-1 pr-1'>
        <div className='bg-background size-full rounded-lg border shadow-xs'>
          {children}
        </div>
      </div>
    </div>
  )
}
