'use server'

import { actionClient } from '@/lib/clients/safe-action'
import { loginSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    revalidatePath('/', 'layout')
  })
