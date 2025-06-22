'use server'

import { authActionClient } from '@/lib/clients/action-client'
import { supabaseClient } from '@/lib/clients/supabase-client'
import { createOrganizationSchema } from '@/lib/schemas/create-organization-schema'
import { revalidateTag } from 'next/cache'

export const createOrganizationAction = authActionClient
  .metadata({
    name: 'create-organization-action',
  })
  .inputSchema(createOrganizationSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { name, domain } = parsedInput
    const { user } = ctx

    const supabase = await supabaseClient()

    const organizationId = crypto.randomUUID()

    await supabase
      .from('organizations')
      .insert({
        id: organizationId,
        name,
        domain,
        prefix: 'org',
      })
      .throwOnError()

    await supabase
      .from('users')
      .update({
        organization: organizationId,
      })
      .eq('id', user.id)
      .throwOnError()

    revalidateTag(`user-${user.id}`)

    return {
      domain,
    }
  })
