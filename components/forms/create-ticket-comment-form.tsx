'use client'

import { createTicketCommentAction } from '@/actions/ticket-comments/create-ticket-comment-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { createTicketCommentSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
  ticketId: string
  tenantId: string
}

export default function CreateTicketCommentForm({ ticketId, tenantId }: Props) {
  const form = useForm<z.infer<typeof createTicketCommentSchema>>({
    resolver: zodResolver(createTicketCommentSchema),
    defaultValues: {
      comment: '',
      ticketId,
      tenantId,
    },
  })

  const { execute, status } = useAction(createTicketCommentAction, {
    onError: ({ error }) => {
      console.error('create-ticket-comment-form', error)
    },
    onSuccess: () => {
      form.reset()
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)}>
        <FormField
          control={form.control}
          name='comment'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormControl>
                <Textarea placeholder='Add a comment...' rows={3} {...field} />
              </FormControl>
              <Button
                loading={loading}
                className='absolute bottom-2 right-2'
                size={'sm'}
              >
                {!loading && <Send className='size-4' />}
                Send
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
