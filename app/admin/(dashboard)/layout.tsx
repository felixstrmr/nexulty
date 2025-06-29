import { getUser } from '@/queries/cached'
import { redirect } from 'next/navigation'

type Props = {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  const user = await getUser()

  if (user && !user.organization) {
    return redirect('/setup')
  }

  return <div className='flex size-full'>{children}</div>
}
