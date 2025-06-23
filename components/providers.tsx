import RootProvider from '@/components/providers/root-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <NuqsAdapter>
      <ThemeProvider>
        <RootProvider>{children}</RootProvider>
      </ThemeProvider>
    </NuqsAdapter>
  )
}
