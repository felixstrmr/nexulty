'use client'

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
import { createOrganizationAction } from '@/lib/actions/create-organization-action'
import { env } from '@/lib/env'
import { createOrganizationSchema } from '@/lib/schemas/create-organization-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function CreateOrganizationForm() {
  const form = useForm<z.infer<typeof createOrganizationSchema>>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
      domain: '',
    },
  })

  const { execute, isExecuting } = useAction(createOrganizationAction, {
    onExecute: () => {
      toast.loading('Creating organization...', {
        id: 'create-organization-form',
      })
    },
    onSuccess: () => {
      toast.success('Organization created successfully', {
        id: 'create-organization-form',
      })
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'create-organization-form',
      })
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='w-80 space-y-8'>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isExecuting}
                    autoFocus
                    placeholder='e.g. Acme Corporation'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='domain'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      disabled={isExecuting}
                      placeholder='e.g. acme-corp'
                      {...field}
                    />
                  </FormControl>
                  <span className='text-muted-foreground pointer-events-none absolute inset-y-0 end-3 mt-0.5 flex items-center justify-center text-sm'>
                    .{env.NEXT_PUBLIC_ROOT_DOMAIN}
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-end'>
          <Button isLoading={isExecuting} className='w-full'>
            Create organization
          </Button>
        </div>
      </form>
    </Form>
  )
}
