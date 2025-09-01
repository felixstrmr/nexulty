import { type NextRequest, NextResponse } from 'next/server';
import { VALID_ADMIN_ROUTES } from '@/lib/constants';
import type { Session } from '@/types';

export default function AdminMiddleware(
  request: NextRequest,
  session: Session | null
) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const searchParams = url.searchParams;
  const path = `${pathname === '/' ? '' : pathname}${searchParams ? `?${searchParams}` : ''}`;

  if (!VALID_ADMIN_ROUTES.includes(pathname)) {
    return NextResponse.rewrite(new URL('/nexulty/not-found', request.url));
  }

  if (!session && pathname !== '/signin') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.rewrite(new URL(`/admin${path}`, request.url));
}
