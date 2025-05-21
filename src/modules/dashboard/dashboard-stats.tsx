'use client'

import React, { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Stat } from '@/types/stat'
import { useStats } from '@/hooks/use-stats'

export const DashboardStats = memo(function DashboardStats() {
  const { stats, isLoading, error } = useStats()

  if (error) {
    return <div className="col-span-4 text-center text-red-500">Failed to load statistics</div>
  }

  if (isLoading) return <StatsSkeleton />

  return (
    <>
      {stats.map((stat: Stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
})

function StatsSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={`skeleton-${i}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20 mb-1" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      ))}
    </>
  )
}
