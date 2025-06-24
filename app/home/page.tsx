import { TrendingUp } from 'lucide-react'

export default function Page() {
  return (
    <div className='flex size-full items-center justify-center bg-zinc-50'>
      <div className='grid grid-cols-2 gap-12'>
        <div className='space-y-4'>
          <h1 className='text-6xl leading-14 font-semibold tracking-tight'>
            Open Source <br />
            <span className='text-primary'>IT Service Management</span> <br />
            built for Scale{' '}
            <TrendingUp className='text-primary inline-block size-14' />
          </h1>
          <p className='text-muted-foreground max-w-sm text-2xl'>
            Nexulty brings ITIL best practices to small businesses, creating a
            solid foundation for growth.
          </p>
        </div>
        <div className='bg-background size-full rounded-lg border p-4 shadow-xs'></div>
      </div>
    </div>
  )
}
