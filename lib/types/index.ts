import { Tables } from '@/lib/types/supabase'

export type User = Tables<'users'>
export type Ticket = Tables<'tickets'>
export type TicketStatus = Tables<'ticket_statuses'>
export type TicketType = Tables<'ticket_types'>
export type TicketPriority = Tables<'ticket_priorities'>
export type TicketComment = Tables<'ticket_comments'>
