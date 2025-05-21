'use client'

import { useAuth } from '@/stores/auth'
import { useEffect } from 'react'

export function InitAuth() {
  const initAuth = useAuth(s => s.initAuth)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  return null
}
