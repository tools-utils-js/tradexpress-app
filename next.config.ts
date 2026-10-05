import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  turbopack: {
    ignoreIssue: [
      {
        path: '**/vendor/**',
      },
    ],
  },
}
 
export default nextConfig
