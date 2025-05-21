'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

type BackButtonProps = {
  fallbackPath?: string
  label?: string
}

export function BackButton({ fallbackPath = '/', label = 'Back' }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (window.history.length > 1) return window.history.back()
    router.push(fallbackPath)
  }

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="sm"
      className="inline-flex items-center gap-1"
    >
      <ChevronLeft className="w-4 h-4" />
      {label}
    </Button>
  )
}
