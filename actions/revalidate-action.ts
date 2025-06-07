'use server'

import { actionClient } from '@/lib/clients/action-client'
import { revalidatePath } from 'next/cache'

export const revalidateAction = actionClient
  .metadata({
    name: 'revalidate-action',
  })
  .action(async () => {
    revalidatePath('/', 'layout')
  })
