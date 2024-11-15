import type { NextConfig } from 'next'

import createJiti from 'jiti'
import { fileURLToPath } from 'node:url'
const jiti = createJiti(fileURLToPath(import.meta.url))

jiti('./lib/env')

const nextConfig: NextConfig = {
  /* config options here */
}

export default nextConfig
