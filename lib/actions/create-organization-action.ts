'use server'

import { actionClient } from '@/lib/clients/action-client'
import { supabaseClient } from '@/lib/clients/supabase-client'
import { createOrganizationSchema } from '@/lib/schemas/create-organization-schema'

export const createOrganizationAction = actionClient
  .metadata({
    name: 'create-organization-action',
  })
  .inputSchema(createOrganizationSchema)
  .action(async ({ parsedInput }) => {
    const { name, domain } = parsedInput

    const supabase = await supabaseClient()

    const { data } = await supabase
      .from('organizations')
      .insert({
        name,
        domain,
      })
      .select()
      .single()
      .throwOnError()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) throw new Error('User not found')

    await supabase
      .from('users')
      .update({
        organization: data.id,
      })
      .eq('id', user.id)
      .throwOnError()
  })
