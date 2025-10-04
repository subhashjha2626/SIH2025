"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, FileText, CheckCircle, Clock } from "lucide-react"

export function QuickStatsWidget() {
  const stats = [
    {
      title: "Total Applications",
      value: "12,847",
      change: "+12.5%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Approved Today",
      value: "234",
      change: "+8.2%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Pending Review",
      value: "1,456",
      change: "-5.1%",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Active Beneficiaries",
      value: "8,923",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendIcon className={`h-3 w-3 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span>from last month</span>
              </div>
              <Progress value={Math.random() * 100} className="mt-2 h-1" />
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
