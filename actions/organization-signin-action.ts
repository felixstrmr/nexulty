'use server'

import { actionClient } from '@/lib/clients/action-client'
import { supabaseServerClient } from '@/lib/clients/supabase/server'
import { organizationSigninSchema } from '@/schemas/organization-signin-schema'
import { revalidatePath, revalidateTag } from 'next/cache'

export const organizationSigninAction = actionClient
  .metadata({
    name: 'organization-signin-action'
  })
  .inputSchema(organizationSigninSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput

    const supabase = await supabaseServerClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    revalidateTag(`organization-user-${data.user.id}`)

    // temporary fix for the layout revalidation
    revalidatePath('/', 'layout')
  })
