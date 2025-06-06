'use client'

import { cn } from '@/utils'
import { LucideIcon, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SettingsSidebar() {
  const pathname = usePathname()
  const segment = pathname.split('/').pop()

  const itemsPersonal = [
    {
      name: 'Profile',
      icon: User,
      href: '/dashboard/settings',
      isActive: segment === 'settings',
    },
  ]

  const itemsOrganization = [
    {
      name: 'General',
      icon: Settings,
      href: '/dashboard/settings/general',
      isActive: segment === 'general',
    },
  ]

  return (
    <aside className='flex w-64 max-w-64 min-w-64 flex-col gap-4 border-r p-4'>
      <div className='flex h-8 items-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Settings</h1>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <p className='text-muted-foreground mb-1 text-xs font-medium'>
            Personal
          </p>
          {itemsPersonal.map((item) => (
            <SidebarItem key={item.name} {...item} />
          ))}
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-muted-foreground mb-1 text-xs font-medium'>
            Organization
          </p>
          {itemsOrganization.map((item) => (
            <SidebarItem key={item.name} {...item} />
          ))}
        </div>
      </div>
    </aside>
  )
}

type SidebarItemProps = {
  name: string
  icon: LucideIcon
  href: string
  isActive: boolean
}

function SidebarItem(item: SidebarItemProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex h-8 items-center gap-2 rounded-md px-2 transition-all',
        item.isActive
          ? 'bg-muted text-foreground'
          : 'text-muted-foreground hover:bg-muted bg-transparent',
      )}
    >
      <item.icon className='size-4' />
      <span className='text-sm'>{item.name}</span>
    </Link>
  )
}
