'use client'

import { organizationSigninSchema } from '@/schemas/organization-signin-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'

import { organizationSigninAction } from '@/actions/organization-signin-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { z } from 'zod'

export default function OrganizationSigninForm() {
  const form = useForm<z.infer<typeof organizationSigninSchema>>({
    resolver: zodResolver(organizationSigninSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { execute, isExecuting } = useAction(organizationSigninAction, {
    onSuccess: () => {
      toast.success('Signed in successfully', {
        id: 'organization-signin-form'
      })
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'organization-signin-form'
      })
    },
    onExecute: () => {
      toast.loading('Signing in...', {
        id: 'organization-signin-form'
      })
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='w-64 space-y-8'>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isExecuting}
                    autoFocus
                    placeholder='email@example.com'
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
                    disabled={isExecuting}
                    type='password'
                    placeholder='••••••••••••'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full' isLoading={isExecuting}>
          Sign in
        </Button>
      </form>
    </Form>
  )
}
