import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-8 pt-8'>
      <Link
        href='/tickets'
        className='text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors'
      >
        <ArrowLeft className='size-4' />
        <span className='text-sm'>Tickets</span>
      </Link>
      <div className='space-y-1'>
        <h1 className='text-3xl font-semibold tracking-tight'>Create ticket</h1>
        <p className='text-muted-foreground'>
          Submit a request for IT support or services
        </p>
      </div>
    </div>
  )
}
