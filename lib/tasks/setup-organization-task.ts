import { Database } from '@/lib/types/supabase'
import { createClient } from '@supabase/supabase-js'
import { schemaTask } from '@trigger.dev/sdk/v3'
import { randomUUID } from 'crypto'
import { z } from 'zod'

const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_SECRET as string,
)

export const setupOrganizationTask = schemaTask({
  id: 'setup-organization-task',
  schema: z.object({
    organizationId: z.string(),
  }),
  run: async (payload) => {
    const { organizationId } = payload

    const serviceRequestId = randomUUID()
    const changeRequestId = randomUUID()
    const incidentRequestId = randomUUID()
    const problemRequestId = randomUUID()

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

    const defaultTicketCategories = [
      {
        name: 'Hardware',
        type: serviceRequestId,
      },
      {
        name: 'Software',
      },
      {
        name: 'Network',
      },
    ]

    const defaultTicketPromise = supabase
      .from('ticket_types')
      .insert(
        defaultTicketTypes.map((ticketType) => ({
          ...ticketType,
          organization: organizationId,
        })),
      )
      .throwOnError()

    await Promise.all([defaultTicketPromise])
  },
})
