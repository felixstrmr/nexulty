import OrganizationSigninForm from '@/components/forms/organization-signin-form'
import { getUser } from '@/queries/cached'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className='flex size-full items-center justify-center'>
      <OrganizationSigninForm />
    </div>
  )
}
