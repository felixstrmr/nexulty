import JoinWaitlistForm from '@/components/forms/join-waitlist-form'
import Nexulty from '@/components/icons/nexulty'
import Link from 'next/link'

type Props = {}

export default function Page({}: Props) {
  return (
    <div className='size-full p-6'>
      <div className='size-full rounded-2xl bg-muted'>
        <div className='relative flex h-full max-w-4xl flex-col justify-center px-6 pb-32 md:px-32'>
          <div className='flex flex-col'>
            <div className='mb-9 flex items-center gap-2.5'>
              <Nexulty className='size-9' />
              <h3>Nexulty</h3>
            </div>
            <h1 className='max-w-xl text-4xl md:text-6xl'>
              IT-Support that just works.{' '}
              <span className='text-primary'>No more messy ticketing.</span>
            </h1>
            <p className='mt-6 max-w-xl text-lg text-muted-foreground md:text-2xl'>
              The helpdesk solution that grows with your team, simple enough for
              startups, powerful enough for scale.
            </p>
            <JoinWaitlistForm className='mt-9' />
          </div>
          <div className='absolute bottom-0 left-0 flex w-full items-center gap-4 px-6 pb-6 md:px-32'>
            <p className='whitespace-nowrap text-sm text-muted-foreground'>
              Nexulty &copy; {new Date().getFullYear()}
            </p>
            <Link
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
              href='https://github.com/felixstrmr/nexulty'
              passHref
            >
              Github
            </Link>
            <Link
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
              href='https://x.com/felixstrmr'
              passHref
            >
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
