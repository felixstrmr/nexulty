'use client'

import { joinWaitlistAction } from '@/actions/join-waitlist-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { joinWaitlistSchema } from '@/lib/schemas'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  className?: string
}

export default function JoinWaitlistForm({ className }: Props) {
  const form = useForm<z.infer<typeof joinWaitlistSchema>>({
    resolver: zodResolver(joinWaitlistSchema),
    defaultValues: {
      email: '',
    },
  })

  const { execute, status } = useAction(joinWaitlistAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: () => {
      toast.success('You have been added to the waitlist')
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(execute)}
        className={cn('w-full md:w-fit', className)}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <div className='flex rounded-xl border bg-background p-1 shadow-lg transition-all focus-within:border-primary focus-within:ring focus-within:ring-primary/25 hover:border-primary'>
                <FormControl>
                  <input
                    disabled={loading}
                    placeholder='Enter your email'
                    className='w-full pl-3 focus-visible:outline-none md:w-80'
                    {...field}
                  />
                </FormControl>
                <Button loading={loading} size={'lg'}>
                  Join Waitlist
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
