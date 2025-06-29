import { NexultyIcon } from '@/components/icons/nexulty-icon'
import Link from 'next/link'

export default function HomeNavbar() {
  return (
    <nav className='mx-auto w-full max-w-5xl py-4'>
      <div className='flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <NexultyIcon />
          <span className='text-2xl font-semibold tracking-tight'>Nexulty</span>
        </Link>
      </div>
    </nav>
  )
}
