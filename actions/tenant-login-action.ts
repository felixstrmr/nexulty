'use server'

import { actionClient } from '@/lib/clients/action-client'
import { tenantLoginSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const tenantLoginAction = actionClient
  .schema(tenantLoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('tenantLoginAction', error)
      throw error
    }

    revalidatePath('/', 'layout')

    return redirect('/')
  })
