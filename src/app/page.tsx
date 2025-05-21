'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FullPageLoader } from '@/components/common/full-page-loader'

const REDIRECT_TIMEOUT_MS = 800
const DASHBOARD_ROUTE = '/dashboard'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.prefetch(DASHBOARD_ROUTE)

    const timer = setTimeout(() => {
      router.replace(DASHBOARD_ROUTE)
    }, REDIRECT_TIMEOUT_MS)

    return () => clearTimeout(timer)
  }, [router])

  return <FullPageLoader message="Redirecting to dashboard..." />
}
