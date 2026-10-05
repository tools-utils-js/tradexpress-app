import { CSPostHogProvider } from '@/components/Providers'
import PostHogPageView from '@/components/PostHogPageView'
import { Suspense } from 'react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CSPostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          {children}
        </CSPostHogProvider>
      </body>
    </html>
  )
}
