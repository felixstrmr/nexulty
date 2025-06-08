import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/types'
import { cn } from '@/utils'

type Props = {
  user: User
  size?: 'sm' | 'md' | 'lg'
}

export default function DynamicAvatar({ user, size = 'md' }: Props) {
  const initials = user.email[0] + user.email[1]

  const sizeClass = {
    sm: 'size-7 text-xs',
    md: 'size-8 text-sm',
    lg: 'size-9 text-sm'
  }[size]

  return (
    <Avatar className={cn(sizeClass)}>
      <AvatarImage src={undefined} />
      <AvatarFallback
        className={cn(
          'border border-blue-200 bg-blue-100 text-blue-500 uppercase',
          sizeClass
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
