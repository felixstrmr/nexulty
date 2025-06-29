import { NexultyIcon } from '@/components/icons/nexulty-icon'
import PortalNavbarNavigation from '@/components/portal-navbar-navigation'
import PortalUserDropdown from '@/components/portal-user-dropdown'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getUser } from '@/queries/cached'
import Link from 'next/link'

type Props = {
  domain: string
}

export default async function PortalNavbar({}: Props) {
  const user = await getUser()

  if (!user) {
    return null
  }

  return (
    <div className='mx-auto flex w-full max-w-5xl items-center justify-between py-4'>
      <div className='flex items-center gap-4'>
        <Link href='/'>
          <NexultyIcon />
        </Link>
        <Separator orientation='vertical' className='min-h-4' />
        <PortalNavbarNavigation />
      </div>
      <div className='flex items-center gap-4'>
        {user.role !== 'customer' && (
          <Link
            href='/dashboard'
            className={buttonVariants({ variant: 'outline' })}
          >
            Dashboard
          </Link>
        )}
        <PortalUserDropdown user={user} />
      </div>
    </div>
  )
}
