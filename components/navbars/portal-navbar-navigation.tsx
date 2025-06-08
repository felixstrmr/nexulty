'use client'

import { cn } from '@/utils'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function PortalNavbarNavigation() {
  const segment = useSelectedLayoutSegment()

  const items = [
    {
      name: 'Tickets',
      href: '/',
      isActive: segment === null || segment === 'tickets'
    },
    {
      name: 'Live Chat',
      href: '/live-chat',
      isActive: segment === 'live-chat'
    }
  ]

  return (
    <div className='flex items-center gap-1'>
      {items.map((item) => (
        <NavigationItem key={item.name} {...item} />
      ))}
    </div>
  )
}

type NavigationItemProps = {
  name: string
  href: string
  isActive: boolean
}

function NavigationItem(item: NavigationItemProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex h-8 items-center rounded-md px-2 text-sm transition-colors',
        item.isActive
          ? 'text-foreground bg-zinc-200/60'
          : 'text-muted-foreground hover:bg-zinc-200/60'
      )}
    >
      {item.name}
    </Link>
  )
}
