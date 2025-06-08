'use client'

import BoxIcon from '@/components/icons/box-icon'
import HouseIcon from '@/components/icons/house-icon'
import SettingsIcon from '@/components/icons/settings-icon'
import TicketSlashIcon from '@/components/icons/ticket-slash-icon'
import { cn } from '@/utils'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardSidebarNavigation() {
  const segment = useSelectedLayoutSegment()

  const itemsTop = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HouseIcon,
      isActive: segment === null
    },
    {
      name: 'Tickets',
      href: '/dashboard/tickets',
      icon: TicketSlashIcon,
      isActive: segment === 'tickets'
    },
    {
      name: 'Assets',
      href: '/dashboard/assets',
      icon: BoxIcon,
      isActive: segment === 'assets'
    }
  ]

  const itemsBottom = [
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: SettingsIcon,
      isActive: segment === 'settings'
    }
  ]

  return (
    <nav className='flex h-full flex-col justify-between'>
      <div className='space-y-1'>
        {itemsTop.map((item) => (
          <NavigationItem key={item.name} {...item} />
        ))}
      </div>
      <div className='space-y-1'>
        {itemsBottom.map((item) => (
          <NavigationItem key={item.name} {...item} />
        ))}
      </div>
    </nav>
  )
}

type NavigationItemProps = {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  isActive: boolean
}

function NavigationItem(item: NavigationItemProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex h-8 items-center gap-2 rounded-md px-2 transition-colors',
        item.isActive ? 'bg-zinc-200/60' : 'hover:bg-zinc-200/60'
      )}
    >
      <item.icon
        className={cn(
          'size-4 transition-colors',
          item.isActive ? 'text-primary' : 'text-muted-foreground'
        )}
      />
      <span
        className={cn(
          'text-sm transition-colors',
          item.isActive ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        {item.name}
      </span>
    </Link>
  )
}
