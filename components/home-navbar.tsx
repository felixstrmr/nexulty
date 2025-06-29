import { NexultyIcon } from '@/components/icons/nexulty-icon'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomeNavbar() {
  return (
    <nav className='mx-auto mt-4 flex w-full max-w-2xl items-center justify-between rounded-xl bg-zinc-900 p-2'>
      <Link href='/' className='flex items-center gap-2'>
        <NexultyIcon />
        <span className='text-2xl font-semibold tracking-tight'>Nexulty</span>
      </Link>
      <div className='flex items-center gap-2'>
        <Button variant='outline'>Sign in</Button>
        <Button>Join waitlist</Button>
      </div>
    </nav>
  )
}
