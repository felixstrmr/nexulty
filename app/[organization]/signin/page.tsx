import OrganizationSigninForm from '@/components/forms/organization-signin-form'
import { getOrganizationUser } from '@/queries/cached'
import { getDomain } from '@/utils'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ organization: string }>
}

export default async function Page({ params }: Props) {
  const { organization } = await params
  const domain = getDomain(organization)

  const organizationUser = await getOrganizationUser(domain)

  if (organizationUser) {
    return redirect('/dashboard')
  }

  return (
    <div className='flex size-full items-center justify-center'>
      <OrganizationSigninForm />
    </div>
  )
}
