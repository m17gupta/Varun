import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, FileText, UserPlus, Edit, BarChart3, BookOpen, ArrowUpRight, ArrowDownRight } from "lucide-react"
import config from "@/config/pages/admin.json"

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="size-5 text-muted-foreground" />,
  "dollar-sign": <DollarSign className="size-5 text-muted-foreground" />,
  "file-text": <FileText className="size-5 text-muted-foreground" />,
  "user-plus": <UserPlus className="size-5 text-muted-foreground" />,
}

const actionIconMap: Record<string, React.ReactNode> = {
  edit: <Edit className="size-4" />,
  users: <Users className="size-4" />,
  "bar-chart": <BarChart3 className="size-4" />,
  "book-open": <BookOpen className="size-4" />,
}

export default async function AdminDashboardPage() {
  const session = await auth()

  if (!session?.user) redirect("/login")
  if ((session.user as { role?: string }).role !== "admin") redirect("/")

  const { dashboard, statsCards, quickActions } = config

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{dashboard.title}</h1>
        <p className="text-sm text-muted-foreground">{dashboard.subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => {
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight
          const trendColor = stat.trend === "up" ? "text-emerald-500" : "text-red-500"
          return (
            <Card key={stat.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                {iconMap[stat.icon]}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.prefix}{stat.value.toLocaleString()}
                </div>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendIcon className={`size-3 ${trendColor}`} />
                  <span className={`font-medium ${trendColor}`}>
                    {stat.change > 0 ? "+" : ""}
                    {stat.change}%
                  </span>
                  <span>{stat.changeLabel}</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.id} href={action.href}>
              <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {actionIconMap[action.icon]}
                    <CardTitle className="text-sm">{action.label}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{action.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
