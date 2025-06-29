'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/utils'
import { House } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function DashboardHeaderBreadcrumb() {
  const pathname = usePathname()

  const segments = pathname.split('/').filter(Boolean).slice(1)
  const currentSegment = segments[segments.length - 1]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/dashboard'>
            <House className='size-3.5' />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment) => (
          <React.Fragment key={segment}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/dashboard/${segment}`}
                className={cn(
                  'rounded-md px-2 py-1 capitalize',
                  currentSegment === segment && 'text-foreground bg-muted',
                )}
              >
                {segment}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
