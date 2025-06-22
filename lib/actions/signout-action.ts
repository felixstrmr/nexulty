'use server'

import { actionClient } from '@/lib/clients/action-client'
import { supabaseClient } from '@/lib/clients/supabase-client'

export const signoutAction = actionClient
  .metadata({
    name: 'signout-action',
  })
  .action(async () => {
    const supabase = await supabaseClient()

    await supabase.auth.signOut()
  })
