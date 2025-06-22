'use client'

import Avatar from '@/components/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signoutAction } from '@/lib/actions/signout-action'
import { User } from '@/lib/types'
import { LogOut } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Props = {
  user: User
}

export default function PortalUserDropdown({ user }: Props) {
  const router = useRouter()

  const { execute, isExecuting } = useAction(signoutAction, {
    onExecute: () => {
      toast.loading('Signing out...', {
        id: 'portal-user-dropdown',
      })
    },
    onSuccess: () => {
      toast.success('Signed out successfully', {
        id: 'portal-user-dropdown',
      })
      router.push('/signin')
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'portal-user-dropdown',
      })
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer'>
        <Avatar value={`${user.first_name} ${user.last_name}`} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant='destructive'
          onClick={() => execute()}
          disabled={isExecuting}
        >
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
