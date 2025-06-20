'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardSidebar() {
  const segment = useSelectedLayoutSegment()

  return (
    <div>
      <h1>DashboardSidebar</h1>
    </div>
  )
}
