"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, Download, Share2, TrendingUp, Clock } from "lucide-react"

interface ContentPerformance {
  _id: string
  title: string
  type: string
  views: number
  downloads?: number
  shares?: number
}

export default function AdminAnalyticsPage() {
  const [performance, setPerformance] = useState<ContentPerformance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/admin/analytics")
        const data = await res.json()
        setPerformance(data.data ?? [])
      } catch {
        setPerformance([])
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  const totalViews = performance.reduce((sum, item) => sum + (item.views ?? 0), 0)
  const totalDownloads = performance.reduce((sum, item) => sum + (item.downloads ?? 0), 0)
  const totalShares = performance.reduce((sum, item) => sum + (item.shares ?? 0), 0)
  const totalItems = performance.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Platform performance, engagement, and content insights
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            <Eye className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Downloads</CardTitle>
            <Download className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDownloads.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Shares</CardTitle>
            <Share2 className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalShares.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Content Items</CardTitle>
            <TrendingUp className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Performance</CardTitle>
          <CardDescription>
            Views, downloads, and shares per content item
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <Eye className="size-3" /> Views
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <Download className="size-3" /> Downloads
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <Share2 className="size-3" /> Shares
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                    </TableRow>
                  ))
                : performance.length === 0
                  ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No analytics data available yet
                      </TableCell>
                    </TableRow>
                  )
                  : performance.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>
                          <span className="text-sm capitalize text-muted-foreground">{item.type}</span>
                        </TableCell>
                        <TableCell>{item.views ?? 0}</TableCell>
                        <TableCell>{item.downloads ?? 0}</TableCell>
                        <TableCell>{item.shares ?? 0}</TableCell>
                      </TableRow>
                    ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>PostHog Analytics</CardTitle>
          <CardDescription>
            Real-time user behavior and product analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {process.env.NEXT_PUBLIC_POSTHOG_KEY ? (
            <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed bg-muted/30">
              <div className="text-center">
                <TrendingUp className="mx-auto size-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  PostHog dashboard embed will appear here
                </p>
                <p className="text-xs text-muted-foreground">
                  Add your PostHog shared dashboard URL to display live metrics
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed bg-muted/30">
              <div className="text-center">
                <Clock className="mx-auto size-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  PostHog not configured
                </p>
                <p className="text-xs text-muted-foreground">
                  Set <code className="rounded bg-muted px-1">NEXT_PUBLIC_POSTHOG_KEY</code> to enable analytics
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
