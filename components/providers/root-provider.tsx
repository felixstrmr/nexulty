import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

type Props = {
  children: React.ReactNode
}

export default function RootProvider({ children }: Props) {
  return (
    <NuqsAdapter>
      {children}
      <Toaster position='bottom-center' />
      <SpeedInsights />
      <Analytics />
    </NuqsAdapter>
  )
}
