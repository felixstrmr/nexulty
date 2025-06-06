import { cn } from '@/utils'
import {
  CircleArrowUp,
  CircleCheck,
  CircleDashed,
  CirclePause,
  CirclePlay,
  CirclePlus,
  CircleStop,
  CircleX,
} from 'lucide-react'

type Props = {
  icon: string
  className?: string
}

export default function TicketStatusIcon({ icon, className }: Props) {
  const Icon =
    {
      CircleStop: CircleStop,
      CirclePause: CirclePause,
      CirclePlay: CirclePlay,
      CircleCheck: CircleCheck,
      CircleX: CircleX,
      CircleArrowUp: CircleArrowUp,
      CirclePlus: CirclePlus,
    }[icon] ?? CircleDashed

  return <Icon className={cn('size-4', className)} />
}
