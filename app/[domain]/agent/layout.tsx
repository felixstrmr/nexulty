import AgentSidebar from '@/components/sidebars/agent-sidebar'

type Props = {
  children: React.ReactNode
}

export default function AgentLayout({ children }: Props) {
  return (
    <div className='flex size-full'>
      <AgentSidebar />
      {children}
    </div>
  )
}
