'use server'

import { actionClient } from '@/lib/clients/action-client'
import { supabaseClient } from '@/lib/clients/supabase-client'
import { adminSigninSchema } from '@/lib/schemas/admin-signin-schema'

export const adminSigninAction = actionClient
  .metadata({
    name: 'admin-signin-action',
  })
  .inputSchema(adminSigninSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput

    const supabase = await supabaseClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
  })
