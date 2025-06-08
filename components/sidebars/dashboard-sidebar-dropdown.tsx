'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Organization } from '@/types'
import { cn } from '@/utils'
import { ChevronsUpDown, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  organization: Organization
}

export default function DashboardSidebarDropdown({ organization }: Props) {
  const [isOpen, setIsOpen] = React.useState(false)

  const initials = organization.name[0] + organization.name[1]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className={cn(
          'flex h-8 cursor-pointer items-center gap-2 rounded-md py-1 pr-2 pl-1 transition-colors',
          isOpen ? 'bg-zinc-200/60' : 'bg-transparent hover:bg-zinc-200/60'
        )}
      >
        <div className='flex aspect-square size-6 items-center justify-center rounded-sm border border-blue-200 bg-blue-100 text-xs text-blue-500 uppercase'>
          {initials}
        </div>
        <span className='truncate text-sm'>{organization.name}</span>
        <ChevronsUpDown className='ml-auto size-4' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuItem asChild>
          <Link href={'/'} target='_blank'>
            View Portal
            <ExternalLink className='size-3.5' />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
