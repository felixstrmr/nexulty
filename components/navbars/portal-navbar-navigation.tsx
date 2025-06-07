'use client'

import { cn } from '@/utils'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function PortalNavbarNavigation() {
  const segment = useSelectedLayoutSegment()

  const items = [
    {
      name: 'Overview',
      href: '/',
      isActive: segment === null,
    },
    {
      name: 'Live Chat',
      href: '/live-chat',
      isActive: segment === 'live-chat',
    },
    {
      name: 'Settings',
      href: '/settings',
      isActive: segment === 'settings',
    },
  ]

  return (
    <div className='flex gap-1'>
      {items.map((item) => (
        <NavbarItem key={item.name} {...item} />
      ))}
    </div>
  )
}

type NavbarItemProps = {
  name: string
  href: string
  isActive: boolean
}

function NavbarItem(item: NavbarItemProps) {
  return (
    <div className='flex flex-col gap-1'>
      <Link
        href={item.href}
        className={cn(
          'hover:bg-muted flex h-8 items-center justify-center rounded-md px-2 text-sm transition-all',
          item.isActive ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {item.name}
      </Link>
      <div
        className={cn(
          'h-px',
          item.isActive ? 'bg-foreground' : 'bg-transparent',
        )}
      />
    </div>
  )
}
