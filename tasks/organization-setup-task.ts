import { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'
import { schemaTask } from '@trigger.dev/sdk/v3'
import { z } from 'zod'

const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_SECRET as string,
)

export const organizationSetupTask = schemaTask({
  id: 'organization-setup-task',
  schema: z.object({
    organizationId: z.string(),
  }),
  run: async (payload) => {
    const { organizationId } = payload

    const defaultTicketStatuses = [
      {
        name: 'New',
      },
      {
        name: 'Assigned',
      },
      {
        name: 'In Progress',
      },
      {
        name: 'Pending',
      },
      {
        name: 'Resolved',
      },
      {
        name: 'Closed',
      },
      {
        name: 'Cancelled',
      },
    ]

    const defaultTicketTypes = [
      {
        name: 'Service Request',
      },
      {
        name: 'Change Request',
      },
      {
        name: 'Incident',
      },
      {
        name: 'Problem',
      },
    ]

    const defaultTicketCategoryGroups = [{}]

    const defaultTicketStatusesPromise = supabase
      .from('ticket_statuses')
      .insert(
        defaultTicketStatuses.map((status) => ({
          ...status,
          organization: organizationId,
        })),
      )
      .throwOnError()

    const defaultTicketTypesPromise = supabase
      .from('ticket_types')
      .insert(
        defaultTicketTypes.map((type) => ({
          ...type,
          organization: organizationId,
        })),
      )
      .throwOnError()

    await Promise.all([defaultTicketStatusesPromise, defaultTicketTypesPromise])
  },
})
