'use client'

import { AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Avvvatars from 'avvvatars-react'

type Props = {
  user: {
    avatar: string | null
    display_name: string | null
    email: string
  }
  className?: string
  size?: number
}

export default function ProfilePicture({ user, className, size = 36 }: Props) {
  const value =
    user.display_name
      ?.split(' ')
      .map((name) => name[0])
      .join('') || user.email?.split('@')[0]

  return (
    <div className={cn(`size-[${size}px]`, className)}>
      {user.avatar ? (
        <AvatarImage src={user.avatar!} className={`size-[${size}px]`} />
      ) : (
        <Avvvatars value={value} size={size} />
      )}
    </div>
  )
}
