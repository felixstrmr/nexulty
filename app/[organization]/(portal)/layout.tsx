import PortalNavbar from '@/components/navbars/portal-navbar'
import PortalNavbarSkeleton from '@/components/skeletons/portal-navbar-skeleton'
import { getDomain } from '@/utils'
import { Suspense } from 'react'

type Props = {
  children: React.ReactNode
  params: Promise<{ organization: string }>
}

export default async function PortalLayout({ children, params }: Props) {
  const { organization } = await params
  const domain = getDomain(organization)

  return (
    <div className='flex size-full flex-col bg-zinc-50'>
      <Suspense fallback={<PortalNavbarSkeleton />}>
        <PortalNavbar domain={domain} />
      </Suspense>
      <div className='flex-1 px-1 pb-1'>
        <div className='bg-background flex size-full rounded-lg border shadow-md'>
          {children}
        </div>
      </div>
    </div>
  )
}
