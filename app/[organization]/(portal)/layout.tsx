import PortalNavbar from '@/components/navbars/portal-navbar'
import { getDomainFromOrganization } from '@/utils'

type Props = {
  children: React.ReactNode
  params: Promise<{ organization: string }>
}

export default async function PortalLayout({ children, params }: Props) {
  const { organization } = await params
  const domain = getDomainFromOrganization(organization)

  return (
    <div className='flex size-full flex-col'>
      <PortalNavbar domain={domain} />
      {children}
    </div>
  )
}
