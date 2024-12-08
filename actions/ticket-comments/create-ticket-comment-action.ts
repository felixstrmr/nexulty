'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createTicketCommentSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'

export const createTicketCommentAction = actionClient
  .schema(createTicketCommentSchema)
  .action(async ({ parsedInput: { comment, ticketId, tenantId } }) => {
    const supabase = await createClient()

    console.log(comment, ticketId, tenantId)

    const { error } = await supabase.from('ticket_comments').insert({
      comment,
      tenant: tenantId,
      ticket: ticketId,
    })

    if (error) {
      console.error('create-ticket-comment-action', error)
      throw error
    }
  })
