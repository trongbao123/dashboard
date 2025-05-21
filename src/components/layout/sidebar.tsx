'use client'

import { memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart, Home, Settings, FileText, Users, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useProjects } from '@/hooks/use-projects'

const mainNav = [
  { label: 'Dashboard', icon: Home, href: '/dashboard' },
  { label: 'Settings', icon: Settings, href: '/dashboard/setting' },
]

export const Sidebar = memo(function Sidebar() {
  const pathname = usePathname()
  const { projects } = useProjects()

  const renderNavItems = (items: typeof mainNav) =>
    items.map(({ label, icon: Icon, href }) => (
      <Button
        key={href}
        asChild
        variant={pathname === href ? 'secondary' : 'ghost'}
        size="sm"
        className="w-full justify-start"
      >
        <Link href={href}>
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </Link>
      </Button>
    ))

  return (
    <div className="hidden md:block md:w-64 border-r bg-muted/40">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <BarChart className="h-6 w-6" />
          <span>Dashboard</span>
        </Link>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <nav className="flex flex-col gap-2 p-4">
          <Section title="Main">{renderNavItems(mainNav)}</Section>

          <Section title="Projects" actionHref="/dashboard/projects/new" actionIcon={PlusCircle}>
            {projects?.map(({ id, name }: { id: string; name: string }) => (
              <Button
                key={id}
                asChild
                variant={pathname === `/dashboard/projects/${id}` ? 'secondary' : 'ghost'}
                size="sm"
                className="w-full justify-start"
              >
                <Link href={`/dashboard/projects/${id}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  {name}
                </Link>
              </Button>
            ))}
          </Section>
        </nav>
      </ScrollArea>
    </div>
  )
})

type SectionProps = {
  title: string
  children: React.ReactNode
  actionHref?: string
  actionIcon?: React.ElementType
}

function Section({ title, children, actionHref, actionIcon: Icon }: SectionProps) {
  return (
    <div className="py-2">
      <div className="flex items-center justify-between px-2 mb-2">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {actionHref && Icon && (
          <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
            <Link href={actionHref}>
              <Icon className="h-4 w-4" />
              <span className="sr-only">{title} Action</span>
            </Link>
          </Button>
        )}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  )
}
