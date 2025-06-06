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
  run: async (payload) => {},
})
