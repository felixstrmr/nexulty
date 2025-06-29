import Providers from '@/components/providers/providers'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Metadata } from 'next/types'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Nexulty • Modern IT-Service-Management',
  description: 'Nexulty is a modern IT-Service-Management platform.',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <Providers>
          <main className='h-screen w-screen'>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
