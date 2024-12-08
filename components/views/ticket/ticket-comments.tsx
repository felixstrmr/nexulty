'use client'

import CreateTicketCommentForm from '@/components/forms/create-ticket-comment-form'
import ProfilePicture from '@/components/profile-picture'
import { getTicketComments } from '@/lib/queries'
import { createClient } from '@/lib/supabase/client'
import {
  TicketCommentWithRelations,
  TicketWithRelations,
} from '@/lib/types/custom'
import { formatRelativeTime } from '@/lib/utils'
import { RealtimeChannel } from '@supabase/supabase-js'
import React from 'react'

type Props = {
  ticket: TicketWithRelations
  domain: string
}

export default function TicketComments({ ticket, domain }: Props) {
  const [comments, setComments] = React.useState<TicketCommentWithRelations[]>(
    [],
  )
  const [loading, setLoading] = React.useState(false)
  const supabase = React.useMemo(() => createClient(), [])

  const fetchComments = React.useCallback(async () => {
    try {
      const comments = await getTicketComments(supabase, domain, ticket.id)

      setComments(comments ?? [])
    } catch (error) {
      console.error(error)
      setComments([])
    }
  }, [supabase, domain, ticket])

  React.useEffect(() => {
    let channel: RealtimeChannel | undefined

    const setupRealtimeSubscription = async () => {
      setLoading(true)
      await fetchComments()
      setLoading(false)

      channel = supabase
        .channel('ticket-comments')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'ticket_comments',
            filter: `ticket=eq.${ticket.id}`,
          },
          async () => {
            await fetchComments()
          },
        )
        .subscribe()
    }

    setupRealtimeSubscription()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [supabase, fetchComments, ticket.id])

  return (
    <div className='size-full space-y-6'>
      <div className='flex items-center gap-2'>
        <h4>Comments</h4>
        <div className='rounded-sm border border-primary/15 bg-primary/10 px-2 text-sm text-primary'>
          {comments.length}
        </div>
      </div>

      {loading ? (
        <div className='h-20 w-full animate-pulse rounded-md bg-primary/10' />
      ) : (
        <div className='space-y-4'>
          {comments.map((comment) => (
            <div key={comment.id} className='flex items-center gap-2'>
              <ProfilePicture user={comment.user} size={32} />
              <div className='text-sm'>
                <div className='flex items-center gap-2'>
                  <p className='font-medium'>{comment.user.display_name}</p>
                  <p className='text-xs text-muted-foreground'>
                    {formatRelativeTime(new Date(comment.created_at))}
                  </p>
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateTicketCommentForm
        ticketId={ticket.id}
        tenantId={ticket.tenant.id}
      />
    </div>
  )
}
