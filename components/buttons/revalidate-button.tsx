'use client'

import { revalidateAction } from '@/actions/revalidate-action'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils'
import { RefreshCcw } from 'lucide-react'
import React from 'react'

export default function RevalidateButton() {
  const [isPending, startTransition] = React.useTransition()

  const revalidate = () => {
    startTransition(async () => {
      await revalidateAction()
    })
  }

  return (
    <Button
      variant='outline'
      size={'icon'}
      onClick={revalidate}
      disabled={isPending}
    >
      <RefreshCcw className={cn(isPending && 'animate-spin')} />
    </Button>
  )
}
