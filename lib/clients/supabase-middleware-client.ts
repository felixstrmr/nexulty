import { env } from '@/lib/env'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function supabaseMiddlewareClient(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, {
              domain: `.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
              secure: env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
              maxAge: 60 * 60 * 24 * 30,
              httpOnly: true,
              ...options,
            }),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { response, user, supabase }
}
