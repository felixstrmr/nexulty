import RevalidateButton from '@/components/buttons/revalidate-button'
import PortalUserDropdown from '@/components/dropdowns/portal-user-dropdown'
import { NexultyIcon } from '@/components/icons/nexulty-icon'
import PortalNavbarNavigation from '@/components/navbars/portal-navbar-navigation'
import { Separator } from '@/components/ui/separator'
import { getUser } from '@/queries/cached'

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
        <NexultyIcon />
        <Separator orientation='vertical' className='min-h-4' />
        <PortalNavbarNavigation />
      </div>
      <div className='flex items-center gap-2'>
        <RevalidateButton />
        <PortalUserDropdown user={user} />
      </div>
    </div>
  )
}
