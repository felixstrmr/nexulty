import Nexulty from '@/components/icons/nexulty'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Workspace } from '@/types'
import Link from 'next/link'

type Props = {
  workspace: Workspace
  user: User
}

export default function CustomerNavbar({ workspace, user }: Props) {
  return (
    <div className='flex w-full border-b bg-gray-50 py-4'>
      <div className='mx-auto flex w-full max-w-6xl justify-between'>
        <Link href={'/'} className='flex items-center gap-2'>
          <Nexulty />
          <h4>{workspace.name}</h4>
        </Link>
        <Avatar>
          <AvatarImage src={user.avatar_url!} />
          <AvatarFallback>{user.email.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
