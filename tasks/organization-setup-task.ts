import { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'
import { schemaTask } from '@trigger.dev/sdk/v3'
import z from 'zod'

const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SERVICE_ROLE_SECRET as string
)

export const organizationSetupTask = schemaTask({
  id: 'organization-setup-task',
  schema: z.object({
    organizationId: z.string().min(1)
  }),
  run: async (payload) => {
    const defaultTicketStatuses = [
      {
        name: 'New',
        color: '#52525b',
        is_default: true,
        type: 'unresolved',
        order: 0
      },
      {
        name: 'Assigned',
        color: '#2563eb',
        is_default: false,
        type: 'unresolved',
        order: 1
      },
      {
        name: 'In Progress',
        color: '#9333ea',
        is_default: false,
        type: 'unresolved',
        order: 2
      },
      {
        name: 'Pending',
        color: '#ca8a04',
        is_default: false,
        type: 'unresolved',
        order: 3
      },
      {
        name: 'Resolved',
        color: '#16a34a',
        is_default: false,
        type: 'resolved',
        order: 4
      },
      {
        name: 'Closed',
        color: '#d97706',
        is_default: false,
        type: 'resolved',
        order: 5
      },
      {
        name: 'Cancelled',
        color: '#dc2626',
        is_default: false,
        type: 'cancelled',
        order: 6
      }
    ]

    const defaultTicketTypes = [
      {
        name: 'Service Request',
        icon: 'ShieldPlus',
        color: '#16a34a'
      },
      {
        name: 'Change Request',
        icon: 'ShieldCheck',
        color: '#9333ea'
      },
      {
        name: 'Incident',
        icon: 'ShieldAlert',
        color: '#ea580c'
      },
      {
        name: 'Problem',
        icon: 'ShieldX',
        color: '#dc2626'
      }
    ]

    const defaultTicketPriorities = [
      {
        name: 'Planning',
        icon: 'ChevronsDown',
        color: '#2563eb',
        is_default: false,
        order: 0
      },
      {
        name: 'Low',
        icon: 'ChevronDown',
        color: '#16a34a',
        is_default: false,
        order: 1
      },
      {
        name: 'Medium',
        icon: 'Equal',
        color: '#ca8a04',
        is_default: true,
        order: 2
      },
      {
        name: 'High',
        icon: 'ChevronsUp',
        color: '#ea580c',
        is_default: false,
        order: 3
      },
      {
        name: 'Critical',
        icon: 'TriangleAlert',
        color: '#dc2626',
        is_default: false,
        order: 4
      }
    ]

    const defaultTicketCategories = [
      {
        name: 'Desktop/Laptop Issues'
      },
      {
        name: 'Server Problems'
      },
      {
        name: 'Network Equipment'
      },
      {
        name: 'Printers & Peripherals'
      },
      {
        name: 'Mobile Devices'
      }
    ]

    const ticketStatusesPromise = supabase.from('ticket_statuses').insert(
      defaultTicketStatuses.map((status) => ({
        ...status,
        organization: payload.organizationId,
        type: status.type as 'unresolved' | 'resolved' | 'cancelled'
      }))
    )

    const ticketTypesPromise = supabase.from('ticket_types').insert(
      defaultTicketTypes.map((type) => ({
        ...type,
        organization: payload.organizationId
      }))
    )

    const ticketPrioritiesPromise = supabase.from('ticket_priorities').insert(
      defaultTicketPriorities.map((priority) => ({
        ...priority,
        organization: payload.organizationId
      }))
    )

    const ticketCategoriesPromise = supabase.from('ticket_categories').insert(
      defaultTicketCategories.map((category) => ({
        ...category,
        organization: payload.organizationId
      }))
    )

    await Promise.all([
      ticketStatusesPromise,
      ticketTypesPromise,
      ticketPrioritiesPromise,
      ticketCategoriesPromise
    ])
  }
})
