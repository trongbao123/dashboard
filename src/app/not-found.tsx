'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-7xl">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Oops! The page you are looking for does not exist..
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Maybe the link is wrong, or the content has been deleted.
      </p>
      <Link href="/" className="mt-6">
        <Button variant="default" size="lg">
          Back to home page
        </Button>
      </Link>
    </div>
  )
}
