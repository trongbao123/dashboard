import { memo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BackButton } from './back-button'
import { ModeToggle } from './mode-toggle'

interface PageHeaderProps {
  title: string
  description: string
  linkHref: string
  linkText: string
  showThemeToggle?: boolean
  showBackButton?: boolean
  backButtonPath?: string
}

export const PageHeader = memo(function PageHeader({
  title,
  description,
  linkHref,
  linkText,
  showThemeToggle = false,
  showBackButton = true,
  backButtonPath,
}: PageHeaderProps) {
  return (
    <div className="space-y-2">
      {showBackButton && (
        <div>
          <BackButton fallbackPath={backButtonPath} />
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={linkHref}>
            <Button variant="outline">{linkText}</Button>
          </Link>
          {showThemeToggle && <ModeToggle />}
        </div>
      </div>
    </div>
  )
})
