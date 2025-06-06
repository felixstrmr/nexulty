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
        icon: 'CirclePlus',
        is_default: true,
      },
      {
        name: 'Assigned',
        icon: 'CircleArrowUp',
        is_default: false,
      },
      {
        name: 'In Progress',
        icon: 'CirclePlay',
        is_default: false,
      },
      {
        name: 'Pending',
        icon: 'CirclePause',
        is_default: false,
      },
      {
        name: 'Resolved',
        icon: 'CircleCheck',
        is_default: false,
      },
      {
        name: 'Closed',
        icon: 'CircleStop',
        is_default: false,
      },
      {
        name: 'Cancelled',
        icon: 'CircleX',
        is_default: false,
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

    const defaultTicketCategoryGroups = [
      {
        name: 'Hardware & Equipment',
      },
      {
        name: 'Software & Applications',
      },
      {
        name: 'Network & Infrastructure',
      },
      {
        name: 'Security & Access',
      },
      {
        name: 'User Services',
      },
      {
        name: 'General IT Support',
      },
    ]

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

    const defaultTicketCategoryGroupsPromise = supabase
      .from('ticket_category_groups')
      .insert(
        defaultTicketCategoryGroups.map((group) => ({
          ...group,
          organization: organizationId,
        })),
      )
      .throwOnError()

    await Promise.all([
      defaultTicketStatusesPromise,
      defaultTicketTypesPromise,
      defaultTicketCategoryGroupsPromise,
    ])
  },
})
