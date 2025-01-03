import { VALID_HOME_ROUTES } from '@/lib/constants'
import { NextRequest, NextResponse } from 'next/server'

export default function HomeMiddleware(request: NextRequest) {
  const url = request.nextUrl
  const searchParams = request.nextUrl.searchParams.toString()
  const path = url.pathname
  const fullPath = `${path}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  if (!VALID_HOME_ROUTES.includes(path)) {
    return NextResponse.rewrite(new URL(`/nexulty/not-found`, request.url))
  }

  return NextResponse.rewrite(new URL(`/home${fullPath}`, request.url))
}
