import { Ticket, TicketStatus } from '@/types'

export type TicketWithRelations = Ticket & {
  workspace: {
    domain: string
  }
  status: TicketStatus
}
