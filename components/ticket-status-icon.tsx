import { TicketStatus } from '@/types'
import { cn } from '@/utils'
import {
  CircleCheck,
  CircleChevronDown,
  CircleDashed,
  CirclePause,
  CirclePlay,
  CircleX,
} from 'lucide-react'

type Props = {
  status: TicketStatus
  className?: string
  style?: React.CSSProperties
}

export default function TicketStatusIcon({ status, className, style }: Props) {
  const icons = {
    CircleDashed,
    CirclePlay,
    CirclePause,
    CircleChevronDown,
    CircleCheck,
    CircleX,
  }
  const Icon = icons[status.icon as keyof typeof icons] ?? CircleDashed

  return <Icon className={cn('size-4', className)} style={style} />
}
