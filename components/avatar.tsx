import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarPrimitive,
} from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

type Props = {
  value: string
  avatar?: string | null
  size?: 'sm' | 'md' | 'lg'
}

export default function Avatar({ value, avatar, size = 'md' }: Props) {
  const sizeClass = {
    sm: 'size-7 text-xs',
    md: 'size-8 text-sm',
    lg: 'size-9 text-sm',
  }[size]

  const initials = (() => {
    const nameParts = value.trim().split(' ').filter(Boolean)

    if (nameParts.length === 0) return ''
    if (nameParts.length === 1) return nameParts[0][0].toUpperCase()

    const firstName = nameParts[0]
    const lastName = nameParts[nameParts.length - 1]

    return (firstName[0] + lastName[0]).toUpperCase()
  })()

  return (
    <AvatarPrimitive className={sizeClass}>
      <AvatarImage src={avatar ?? undefined} className={sizeClass} />
      <AvatarFallback
        className={cn('bg-blue-100 text-blue-500 uppercase', sizeClass)}
      >
        {initials}
      </AvatarFallback>
    </AvatarPrimitive>
  )
}
