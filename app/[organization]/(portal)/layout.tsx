import PortalNavbar from '@/components/portal/portal-navbar'
import { getDomainFromOrganization } from '@/utils'

type Props = {
  children: React.ReactNode
  params: Promise<{ organization: string }>
}

export default async function PortalLayout({ children, params }: Props) {
  const { organization } = await params
  const domain = getDomainFromOrganization(organization)

  return (
    <div className='flex size-full flex-col bg-zinc-50 dark:bg-zinc-900'>
      <PortalNavbar domain={domain} />
      <div className='flex-1 px-1 pb-1'>
        <div className='bg-background flex size-full rounded-sm border'>
          {children}
        </div>
      </div>
    </div>
  )
}
