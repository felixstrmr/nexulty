import { supabaseMiddlewareClient } from '@/lib/clients/supabase-middleware-client'
import { env } from '@/lib/env'
import AppMiddleware from '@/lib/middlewares/app-middleware'
import HomeMiddleware from '@/lib/middlewares/home-middleware'
import OrganizationMiddleware from '@/lib/middlewares/organization-middleware'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host')!

  const isHomeRoute =
    host === `${env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
    host === `www.${env.NEXT_PUBLIC_ROOT_DOMAIN}`

  if (isHomeRoute) {
    return HomeMiddleware(request)
  }

  const { response, user } = await supabaseMiddlewareClient(request)

  const isAppRoute = host === `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`

  if (isAppRoute) {
    return AppMiddleware(request, response, user)
  }

  return OrganizationMiddleware(request, response, user)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
