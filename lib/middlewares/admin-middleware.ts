import { PUBLIC_APP_ROUTES } from '@/lib/constants'
import { User } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export default function AdminMiddleware(
  request: NextRequest,
  response: NextResponse,
  user: User | null,
) {
  const url = request.nextUrl
  const path = url.pathname
  const searchParams = url.searchParams.toString()
  const fullPath = `${path}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  if (!user && !PUBLIC_APP_ROUTES.includes(path)) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  response = NextResponse.rewrite(new URL(`/admin${fullPath}`, request.url))

  return response
}
