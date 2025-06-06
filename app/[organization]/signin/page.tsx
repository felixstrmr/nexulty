import OrganizationSigninForm from '@/components/forms/organization-signin-form'
import { Button } from '@/components/ui/button'
import { getOrganizationUser } from '@/queries/cached'
import { getDomainFromOrganization } from '@/utils'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ organization: string }>
}

export default async function Page({ params }: Props) {
  const { organization } = await params
  const domain = getDomainFromOrganization(organization)

  const organizationUser = await getOrganizationUser(domain)

  if (organizationUser) {
    return redirect('/dashboard')
  }

  return (
    <div className='flex size-full items-center justify-center bg-zinc-50'>
      <div className='bg-background rounded-lg border p-8 shadow-md'>
        <Button size={'icon'}></Button>
        <div className='mt-4 mb-8'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Welcome back!
          </h1>
          <p className='text-muted-foreground text-sm'>
            Enter your details to sign in.
          </p>
        </div>
        <OrganizationSigninForm />
      </div>
    </div>
  )
}
