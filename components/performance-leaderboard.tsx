"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Trophy, Medal, Award, TrendingUp, Users, Clock } from "lucide-react"

interface LeaderboardEntry {
  id: string
  name: string
  role: string
  district: string
  score: number
  applicationsProcessed: number
  avgProcessingTime: number
  satisfactionRating: number
  rank: number
  trend: "up" | "down" | "stable"
}

interface PerformanceLeaderboardProps {
  userRole: "police" | "collector" | "central"
}

export function PerformanceLeaderboard({ userRole }: PerformanceLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState<"week" | "month" | "quarter">("month")

  useEffect(() => {
    // Simulate leaderboard data
    setTimeout(() => {
      const mockData: LeaderboardEntry[] = [
        {
          id: "1",
          name: "Rajesh Kumar",
          role: "Police Officer",
          district: "Mumbai Central",
          score: 98,
          applicationsProcessed: 245,
          avgProcessingTime: 2.3,
          satisfactionRating: 4.8,
          rank: 1,
          trend: "up",
        },
        {
          id: "2",
          name: "Priya Sharma",
          role: "Collector Officer",
          district: "Delhi North",
          score: 95,
          applicationsProcessed: 189,
          avgProcessingTime: 1.8,
          satisfactionRating: 4.7,
          rank: 2,
          trend: "stable",
        },
        {
          id: "3",
          name: "Amit Patel",
          role: "Police Officer",
          district: "Bangalore East",
          score: 92,
          applicationsProcessed: 198,
          avgProcessingTime: 2.1,
          satisfactionRating: 4.6,
          rank: 3,
          trend: "up",
        },
        {
          id: "4",
          name: "Sunita Reddy",
          role: "Collector Officer",
          district: "Hyderabad West",
          score: 89,
          applicationsProcessed: 167,
          avgProcessingTime: 2.5,
          satisfactionRating: 4.5,
          rank: 4,
          trend: "down",
        },
        {
          id: "5",
          name: "Vikram Singh",
          role: "Police Officer",
          district: "Pune South",
          score: 87,
          applicationsProcessed: 156,
          avgProcessingTime: 2.7,
          satisfactionRating: 4.4,
          rank: 5,
          trend: "stable",
        },
      ]
      setLeaderboard(mockData)
      setLoading(false)
    }, 1000)
  }, [timeframe])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Leaderboard</CardTitle>
          <CardDescription>Loading performance data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse flex items-center space-x-4">
                <div className="rounded-full bg-muted h-10 w-10"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Performance Leaderboard
            </CardTitle>
            <CardDescription>Top performing officers based on efficiency and satisfaction</CardDescription>
          </div>
          <div className="flex gap-2">
            {(["week", "month", "quarter"] as const).map((period) => (
              <Badge
                key={period}
                variant={timeframe === period ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setTimeframe(period)}
              >
                {period}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.map((entry) => (
            <Card
              key={entry.id}
              className={`border-l-4 ${
                entry.rank === 1
                  ? "border-l-yellow-500"
                  : entry.rank === 2
                    ? "border-l-gray-400"
                    : entry.rank === 3
                      ? "border-l-amber-600"
                      : "border-l-muted"
              }`}
            >
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getRankIcon(entry.rank)}
                      {getTrendIcon(entry.trend)}
                    </div>
                    <Avatar>
                      <AvatarImage src={`/abstract-geometric-shapes.png?height=40&width=40&query=${entry.name}`} />
                      <AvatarFallback>
                        {entry.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{entry.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {entry.role} • {entry.district}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{entry.score}</div>
                    <div className="text-xs text-muted-foreground">Performance Score</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{entry.applicationsProcessed}</div>
                      <div className="text-xs text-muted-foreground">Applications</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{entry.avgProcessingTime}d</div>
                      <div className="text-xs text-muted-foreground">Avg Time</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{entry.satisfactionRating}/5</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>Overall Performance</span>
                    <span>{entry.score}%</span>
                  </div>
                  <Progress value={entry.score} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
