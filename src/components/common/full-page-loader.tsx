'use client'

export function FullPageLoader({ message }: { message?: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background animate-fadeIn">
      <div className="relative flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />

        <span className="text-muted-foreground text-sm">
          {message ?? 'Preparing your dashboard...'}
        </span>
      </div>
    </div>
  )
}
