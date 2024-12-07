'use client'

import Nexulty from '@/components/icons/nexulty'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  Home,
  LucideIcon,
  MonitorSmartphone,
  Ticket,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function AgentSidebar() {
  const segment = useSelectedLayoutSegment()

  const pages = [
    {
      name: 'Dashboard',
      href: '/agent',
      active: !segment,
      icon: Home,
    },
    {
      name: 'Tickets',
      href: '/agent/tickets',
      active: segment === 'tickets',
      icon: Ticket,
    },
    {
      name: 'Assets',
      href: '/agent/assets',
      active: segment === 'assets',
      icon: MonitorSmartphone,
    },
    {
      name: 'users',
      href: '/agent/users',
      active: segment === 'users',
      icon: Users,
    },
  ] as SidebarItemProps[]

  return (
    <aside className='flex h-full flex-col items-center border-r p-4'>
      <Link href={'/'}>
        <Nexulty className='rounded-md shadow' />
      </Link>
      <Separator className='my-4' />
      <div className='flex flex-col gap-1'>
        {pages.map((page) => (
          <SidebarItem key={page.name} item={page} />
        ))}
      </div>
    </aside>
  )
}

type SidebarItemProps = {
  name: string
  href: string
  active: boolean
  icon: LucideIcon
}

const SidebarItem = ({ item }: { item: SidebarItemProps }) => {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex size-9 items-center justify-center rounded-md border transition-all',
        item.active
          ? 'border-border bg-muted text-foreground shadow'
          : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <item.icon className='size-4' />
    </Link>
  )
}
