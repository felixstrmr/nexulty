import DashboardSidebar from '@/components/sidebars/dashboard-sidebar'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className='flex size-full bg-zinc-100'>
      <DashboardSidebar />
      <div className='bg-background size-full border-l shadow-xs'>
        {children}
      </div>
    </div>
  )
}
