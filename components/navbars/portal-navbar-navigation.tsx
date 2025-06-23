'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function PortalNavbarNavigation() {
  const segment = useSelectedLayoutSegment()

  const items = [
    {
      name: 'Dashboard',
      href: '/',
      isActive: segment === null,
    },
    {
      name: 'Tickets',
      href: '/tickets',
      isActive: segment === 'tickets',
    },
    {
      name: 'Knowledge Base',
      href: '/knowledge-base',
      isActive: segment === 'knowledge-base',
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
    <Link
      href={item.href}
      className={cn(
        'flex h-8 items-center rounded-md px-2 transition-colors',
        item.isActive
          ? 'bg-foreground/[7.5%] text-foreground'
          : 'hover:bg-foreground/[7.5%] text-muted-foreground bg-transparent',
      )}
    >
      <span className='text-sm'>{item.name}</span>
    </Link>
  )
}
