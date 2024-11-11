import { Tables } from '@/types/supabase'

export type User = Tables<'users'>
export type Workspace = Tables<'workspaces'>
export type WorkspaceUser = Tables<'workspace_users'>
export type WorkspaceCounter = Tables<'workspace_counters'>
export type Ticket = Tables<'tickets'>
export type TicketStatus = Tables<'ticket_statuses'>
export type TicketPriority = Tables<'ticket_priorities'>
export type TicketType = Tables<'ticket_types'>
export type TicketCategory = Tables<'ticket_categories'>
export type TicketCategoryGroup = Tables<'ticket_category_groups'>
