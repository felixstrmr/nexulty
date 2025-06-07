import PortalNavbarNavigation from '@/components/navbars/portal-navbar-navigation'
import { buttonVariants } from '@/components/ui/button'
import { getOrganizationUser } from '@/queries/cached'
import { User } from 'lucide-react'
import Link from 'next/link'

type Props = {
  domain: string
}

export default async function PortalNavbar({ domain }: Props) {
  const organizationUser = await getOrganizationUser(domain)

  return (
    <div className='flex flex-col border-b'>
      <nav className='mx-auto flex w-full max-w-5xl items-center justify-between py-4'>
        <Link href='/' className='flex items-center gap-2'>
          <div
            className={buttonVariants({ variant: 'default', size: 'icon' })}
          />
          <span className='text-2xl font-semibold tracking-tight'>Nexulty</span>
        </Link>
        <div className='flex items-center gap-4'>
          {organizationUser?.role !== 'customer' && (
            <Link
              href={'/dashboard'}
              className={buttonVariants({ variant: 'outline' })}
            >
              Dashboard
            </Link>
          )}
          <div className='bg-muted flex size-8 items-center justify-center rounded-full'>
            <User className='size-4' />
          </div>
        </div>
      </nav>
      <div className='mx-auto w-full max-w-5xl'>
        <PortalNavbarNavigation />
      </div>
    </div>
  )
}
