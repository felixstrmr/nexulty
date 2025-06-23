import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-8 pt-8'>
      <div className='flex items-start justify-between'>
        <h1 className='text-3xl font-semibold tracking-tight'>Tickets</h1>
        <Link
          href='/tickets/create'
          className={buttonVariants({ variant: 'default' })}
        >
          Create ticket
        </Link>
      </div>
    </div>
  )
}
