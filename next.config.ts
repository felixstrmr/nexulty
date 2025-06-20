import type { NextConfig } from 'next'

import '@/lib/env'

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ['localhost.com', '*.localhost.com'],
}

export default nextConfig
