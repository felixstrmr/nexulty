'use server'

import { actionClient } from '@/lib/clients/action-client'
import { loops } from '@/lib/clients/loops-client'
import { joinWaitlistSchema } from '@/lib/schemas'

export const joinWaitlistAction = actionClient
  .schema(joinWaitlistSchema)
  .action(async ({ parsedInput: { email } }) => {
    const existingContact = await loops.findContact({ email })

    if (existingContact.length > 0) {
      throw new Error('You are already on the waitlist')
    }

    const contactProperties = {}

    const mailingLists = {
      clyxx0n6j00q40mjreo2v8koj: true,
    }

    const response = await loops.createContact(
      email,
      contactProperties,
      mailingLists,
    )

    if (!response.success) {
      console.error(response.message)
      throw response.message
    }

    return response
  })
