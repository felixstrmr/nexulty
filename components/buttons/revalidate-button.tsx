import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export default function RevalidateButton() {
  const revalidate = async () => {
    'use server'

    revalidatePath('/', 'layout')
  }

  return (
    <Button onClick={revalidate} size='icon' variant='outline'>
      <RefreshCcw />
    </Button>
  )
}
