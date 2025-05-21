import { memo } from 'react'

interface PageTitleProps {
  title: string
  description?: string
}

export const PageTitle = memo(function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && <p className="text-muted-foreground mt-1">{description}</p>}
    </div>
  )
})
