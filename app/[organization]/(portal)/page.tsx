import { getUser } from '@/lib/queries/cached'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getUser()

  if (!user) {
    redirect('/signin')
  }

  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-8 pt-8'>
      <div className='space-y-1'>
        <h1 className='text-3xl font-semibold tracking-tight'>
          Welcome back, {user.first_name}!
        </h1>
      </div>
      <div className='grid grid-cols-4 gap-4'></div>
    </div>
  )
}
