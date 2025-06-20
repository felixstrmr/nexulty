import AdminSigninForm from '@/components/forms/admin-signin-form'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex size-full items-center justify-center'>
      <div className='bg-muted rounded-xl p-1'>
        <div className='bg-background rounded-lg border p-8'>
          <div className='mb-8 flex items-center gap-2'>
            <div className='bg-primary size-8 rounded-md' />
            <h2 className='text-2xl font-semibold tracking-tight'>Admin</h2>
          </div>
          <AdminSigninForm />
        </div>
        <div className='px-8 py-4'>
          <p className='text-muted-foreground text-sm'>
            Don't have an account?{' '}
            <Link href={'/signup'} className='text-foreground hover:underline'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
