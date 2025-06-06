type Props = {
  sidebar: React.ReactNode
  children: React.ReactNode
}

export default function TicketsLayout({ sidebar, children }: Props) {
  return (
    <div className='flex size-full'>
      {sidebar}
      <div className='flex-1'>{children}</div>
    </div>
  )
}
