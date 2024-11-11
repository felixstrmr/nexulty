import CustomerNavbar from '@/components/navbars/customer-navbar'
import { env } from '@/lib/env'
import { getUserWithCache, getWorkspaceWithCache } from '@/lib/queries-cached'
import { createClient } from '@/lib/supabase/server'

type Props = {
  children: React.ReactNode
  params: Promise<{ domain: string }>
}

export default async function CustomerLayout({ children, params }: Props) {
  const { domain: rawDomain } = await params
  const domain = rawDomain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')

  const supabase = await createClient()

  const workspace = await getWorkspaceWithCache(supabase, domain)
  const user = await getUserWithCache(supabase)

  if (user?.error || workspace?.error || !user?.data)
    throw new Error('User or workspace not found')

  return (
    <div className='flex size-full flex-col'>
      <CustomerNavbar workspace={workspace.data} user={user.data} />
      {children}
    </div>
  )
}
