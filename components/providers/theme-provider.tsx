'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

type Props = {
  children: React.ReactNode
}

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider attribute='class' forcedTheme='dark'>
      {children}
    </NextThemesProvider>
  )
}
