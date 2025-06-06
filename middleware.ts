import { supabaseMiddlewareClient } from '@/lib/clients/supabase/middleware'
import OrganizationMiddleware from '@/lib/middlewares/organization-middleware'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { response, user } = await supabaseMiddlewareClient(request)

  return OrganizationMiddleware(request, response, user)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
