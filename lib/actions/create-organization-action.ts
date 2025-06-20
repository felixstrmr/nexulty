'use server'

import { actionClient } from '@/lib/clients/action-client'
import { supabaseClient } from '@/lib/clients/supabase-client'
import { createOrganizationSchema } from '@/lib/schemas/create-organization-schema'
import { revalidateTag } from 'next/cache'

export const createOrganizationAction = actionClient
  .metadata({
    name: 'create-organization-action',
  })
  .inputSchema(createOrganizationSchema)
  .action(async ({ parsedInput }) => {
    const { name, domain } = parsedInput

    const supabase = await supabaseClient()

    const organizationId = crypto.randomUUID()

    await supabase
      .from('organizations')
      .insert({
        id: organizationId,
        name,
        domain,
      })
      .throwOnError()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) throw new Error('User not found')

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
