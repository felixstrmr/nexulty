'use client'

import { tenantLoginAction } from '@/actions/tenant-login-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { tenantLoginSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function TenantLoginForm() {
  const form = useForm<z.infer<typeof tenantLoginSchema>>({
    resolver: zodResolver(tenantLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { execute, status } = useAction(tenantLoginAction, {
    onError: ({ error }) => {
      toast.dismiss()
      toast.error(error.serverError)
    },
    onExecute: () => {
      toast.loading('Logging in...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('You have been logged in')
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='w-80 space-y-6'>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    autoFocus
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type='password'
                    placeholder='•••••••••••••'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button loading={loading} className='w-full'>
          Log In
        </Button>
      </form>
    </Form>
  )
}
