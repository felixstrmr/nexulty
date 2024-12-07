import { Ticket, TicketStatus, TicketType } from '@/lib/types'

export type TicketWithRelations = Ticket & {
  tenant: {
    domain: string
  }
  status: TicketStatus
  type: TicketType
  reporter: {
    email: string
  }
}
