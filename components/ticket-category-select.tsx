import { TicketCategoryGroup } from '@/lib/types'

type Props = {
  groups: TicketCategoryGroup[]
}

export default function TicketCategorySelect({ groups }: Props) {
  return (
    <div>
      {groups.map((group) => (
        <div key={group.id}>{group.name}</div>
      ))}
    </div>
  )
}
