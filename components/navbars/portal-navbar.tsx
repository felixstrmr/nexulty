import DynamicAvatar from '@/components/dynamic-avatar'
import PortalNavbarNavigation from '@/components/navbars/portal-navbar-navigation'
import { buttonVariants } from '@/components/ui/button'
import { getOrganizationUser } from '@/queries/cached'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type Props = {
  domain: string
}

export default async function PortalNavbar({ domain }: Props) {
  const organizationUser = await getOrganizationUser(domain)

  if (!organizationUser) {
    return redirect('/signin')
  }

  return (
    <div className='mx-auto flex w-full max-w-5xl items-center justify-between py-4'>
      <div className='flex items-center gap-4'>
        <h1 className='text-2xl font-semibold tracking-tight'>Nexulty</h1>
        <PortalNavbarNavigation />
      </div>
      <div className='flex items-center gap-4'>
        {organizationUser && (
          <Link
            href={'/dashboard'}
            className={buttonVariants({ variant: 'outline' })}
          >
            Dashboard
          </Link>
        )}
        <DynamicAvatar user={organizationUser} />
      </div>
    </div>
  )
}
