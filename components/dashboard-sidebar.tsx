'use client'

import { NexultyIcon } from '@/components/icons/nexulty-icon'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/utils'
import { Cog, House, LucideIcon, Ticket } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardSidebar() {
  const segment = useSelectedLayoutSegment()

  const itemsTop = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: House,
      isActive: segment === null,
    },
    {
      name: 'Tickets',
      href: '/dashboard/tickets',
      icon: Ticket,
      isActive: segment === 'tickets',
    },
  ]

  const itemsBottom = [
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Cog,
      isActive: segment === 'settings',
    },
  ]

  return (
    <aside className='flex flex-col items-center border border-transparent pb-4'>
      <div className='border border-transparent p-4 pb-4.5'>
        <Link href='/dashboard'>
          <NexultyIcon />
        </Link>
      </div>
      <Separator className='mx-auto mb-4 max-w-4' />
      <div className='flex h-full flex-col justify-between'>
        <div className='space-y-1'>
          {itemsTop.map((item) => (
            <SidebarItem key={item.name} {...item} />
          ))}
        </div>
        <div className='space-y-1'>
          {itemsBottom.map((item) => (
            <SidebarItem key={item.name} {...item} />
          ))}
        </div>
      </div>
    </aside>
  )
}

type SidebarItemProps = {
  name: string
  href: string
  icon: LucideIcon
  isActive: boolean
}

function SidebarItem(item: SidebarItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            'flex size-8 items-center justify-center rounded-md',
            item.isActive
              ? 'bg-foreground/[7.5%] text-foreground'
              : 'hover:bg-foreground/[7.5%] text-muted-foreground bg-transparent',
          )}
        >
          <item.icon className='size-4' />
        </Link>
      </TooltipTrigger>
      <TooltipContent side='right'>
        <p>{item.name}</p>
      </TooltipContent>
    </Tooltip>
  )
}
