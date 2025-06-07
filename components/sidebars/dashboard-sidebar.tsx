'use client'

import RevalidateButton from '@/components/buttons/revalidate-button'
import HouseIcon from '@/components/icons/house-icon'
import SettingsIcon from '@/components/icons/settings-icon'
import TicketCheckIcon from '@/components/icons/ticket-check-icon'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/utils'
import { House, LucideIcon, Settings, TicketCheck } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardSidebar() {
  const segment = useSelectedLayoutSegment()

  const itemsTop = [
    {
      name: 'Home',
      href: '/dashboard',
      icon: House,
      activeIcon: HouseIcon,
      isActive: segment === null,
    },
    {
      name: 'Tickets',
      href: '/dashboard/tickets',
      icon: TicketCheck,
      activeIcon: TicketCheckIcon,
      isActive: segment === 'tickets',
    },
  ]

  const itemsBottom = [
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      activeIcon: SettingsIcon,
      isActive: segment === 'settings',
    },
  ]

  return (
    <aside className='flex flex-col gap-4 border border-transparent px-4 py-5'>
      <Button size={'icon'}></Button>
      <RevalidateButton />
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
  activeIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  isActive: boolean
}

function SidebarItem(item: SidebarItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            'flex size-8 items-center justify-center rounded-md transition-all',
            item.isActive
              ? 'text-foreground bg-zinc-200'
              : 'text-muted-foreground bg-transparent hover:bg-zinc-200',
          )}
        >
          {item.isActive ? (
            <item.activeIcon className='size-4 shrink-0' />
          ) : (
            <item.icon className='size-4 shrink-0' />
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent align='center' side='right'>
        <p>{item.name}</p>
      </TooltipContent>
    </Tooltip>
  )
}
