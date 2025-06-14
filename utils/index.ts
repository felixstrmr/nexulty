import { env } from '@/lib/env/client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDomain(host: string) {
  return host.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
}
