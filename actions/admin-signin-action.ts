'use server'

import { actionClient } from '@/lib/clients/action-client'
import { supabaseClient } from '@/lib/clients/supabase-client'
import { adminSigninSchema } from '@/schemas/admin-signin-schema'
import { revalidatePath, revalidateTag } from 'next/cache'

export const adminSigninAction = actionClient
  .metadata({
    name: 'admin-signin-action',
  })
  .inputSchema(adminSigninSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput

    const supabase = await supabaseClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    revalidateTag(`user-${data.user.id}`)

    // temp
    revalidatePath('/', 'layout')
  })
