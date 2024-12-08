import {
  Ticket,
  TicketComment,
  TicketPriority,
  TicketStatus,
  TicketType,
} from '@/lib/types'

export type TicketWithRelations = Ticket & {
  tenant: {
    id: string
    domain: string
  }
  status: TicketStatus
  type: TicketType
  priority: TicketPriority
  reporter: {
    display_name: string | null
    id: string
  }
  assignee: {
    display_name: string | null
    id: string
  }
}

export type TicketCommentWithRelations = TicketComment & {
  tenant: {
    id: string
    domain: string
  }
  user: {
    display_name: string | null
    avatar: string | null
    email: string
  }
}
