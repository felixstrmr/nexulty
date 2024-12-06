import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/sonner'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Nexulty › Elevate your IT-Support',
  description: '',
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
      <body className='text-neutral-900 antialiased'>
        <main className='h-screen w-screen'>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
