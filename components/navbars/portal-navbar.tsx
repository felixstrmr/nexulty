import DynamicAvatar from '@/components/dynamic-avatar'
import NexultyIcon from '@/components/icons/nexulty-icon'
import PortalNavbarNavigation from '@/components/navbars/portal-navbar-navigation'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
        <Link href={'/'}>
          <NexultyIcon className='text-primary size-6' />
        </Link>
        <Separator
          orientation='vertical'
          className='data-[orientation=vertical]:h-4'
        />
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
