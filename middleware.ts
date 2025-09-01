import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { env } from '@/lib/env';
import AdminMiddleware from '@/lib/middlwares/admin-middleware';
import HomeMiddleware from '@/lib/middlwares/home-middleware';
import OrganizationMiddleware from '@/lib/middlwares/organization-middleware';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');

  if (hostname === `www.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return HomeMiddleware(request);
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (hostname === `admin.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return AdminMiddleware(request, session);
  }

  return OrganizationMiddleware(request, session);
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
