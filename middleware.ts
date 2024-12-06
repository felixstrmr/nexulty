import { env } from '@/lib/env'
import HomeMiddleware from '@/lib/middlewares/home-middleware'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let hostname = request.headers.get('host')!

  if (hostname === `www.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return HomeMiddleware(request)
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
