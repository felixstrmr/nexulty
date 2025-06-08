import { Skeleton } from '@/components/ui/skeleton'

export default function PortalNavbarSkeleton() {
  return (
    <div className='mx-auto flex w-full max-w-5xl items-center justify-between py-4'>
      <div className='flex items-center gap-4'>
        <h1 className='text-2xl font-semibold tracking-tight'>Nexulty</h1>
        <div className='flex items-center gap-1'>
          <Skeleton className='h-8 w-[83px] bg-zinc-200/60' />
          <Skeleton className='h-8 w-[73px] bg-zinc-200/60' />
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Skeleton className='h-8 w-[93px] bg-zinc-200/60' />
        <Skeleton className='size-8 rounded-full bg-zinc-200/60' />
      </div>
    </div>
  )
}
