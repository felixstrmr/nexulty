import AdminSigninForm from '@/components/forms/admin-signin-form'
import { NexultyIcon } from '@/components/icons/nexulty-icon'
import { getUser } from '@/queries/cached'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className='flex size-full items-center justify-center'>
      <div className='bg-muted rounded-2xl p-1'>
        <div className='bg-background rounded-xl border p-8 shadow-xs'>
          <div className='mb-8 flex items-center gap-2'>
            <NexultyIcon className='size-8' />
            <h2 className='text-2xl font-semibold tracking-tight'>Admin</h2>
          </div>
          <AdminSigninForm />
        </div>
        <div className='px-8 py-4'>
          <p className='text-muted-foreground text-sm'>
            Don&apos;t have an account?{' '}
            <Link href={'/signup'} className='text-foreground hover:underline'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
