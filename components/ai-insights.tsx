"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, AlertTriangle, Target, Zap, BarChart3 } from "lucide-react"

interface AIInsight {
  id: string
  type: "prediction" | "anomaly" | "recommendation" | "trend"
  title: string
  description: string
  confidence: number
  impact: "high" | "medium" | "low"
  category: string
}

interface AIInsightsProps {
  userRole: "police" | "collector" | "central" | "beneficiary"
}

export function AIInsights({ userRole }: AIInsightsProps) {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      const mockInsights: AIInsight[] = [
        {
          id: "1",
          type: "prediction",
          title: "Application Volume Surge Expected",
          description:
            "Based on historical patterns and current trends, expect 35% increase in applications next week.",
          confidence: 87,
          impact: "high",
          category: "Workload Planning",
        },
        {
          id: "2",
          type: "anomaly",
          title: "Unusual Verification Delay Pattern",
          description: "District XYZ showing 3x longer verification times than average. Potential resource shortage.",
          confidence: 92,
          impact: "high",
          category: "Process Optimization",
        },
        {
          id: "3",
          type: "recommendation",
          title: "Optimize Fund Disbursement Schedule",
          description: "Recommend processing Group A applications on Tuesdays for 15% faster completion.",
          confidence: 78,
          impact: "medium",
          category: "Efficiency",
        },
        {
          id: "4",
          type: "trend",
          title: "Grievance Categories Shifting",
          description: "Documentation issues increasing by 23% while payment delays decreasing by 18%.",
          confidence: 85,
          impact: "medium",
          category: "Quality Improvement",
        },
      ]
      setInsights(mockInsights)
      setLoading(false)
    }, 1500)
  }, [])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "prediction":
        return <TrendingUp className="h-4 w-4" />
      case "anomaly":
        return <AlertTriangle className="h-4 w-4" />
      case "recommendation":
        return <Target className="h-4 w-4" />
      case "trend":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Insights
          </CardTitle>
          <CardDescription>Analyzing data patterns...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
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
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Insights & Analytics
        </CardTitle>
        <CardDescription>Intelligent analysis and recommendations based on system data</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="recommendations">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-4">
            {insights.map((insight) => (
              <Card key={insight.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getInsightIcon(insight.type)}
                      <CardTitle className="text-base">{insight.title}</CardTitle>
                    </div>
                    <Badge variant={getImpactColor(insight.impact) as any}>{insight.impact} impact</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Confidence:</span>
                      <Progress value={insight.confidence} className="w-20 h-2" />
                      <span className="text-xs font-medium">{insight.confidence}%</span>
                    </div>
                    <Badge variant="outline">{insight.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="predictions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Workload Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Next 7 days</span>
                    <Badge variant="secondary">+35% applications</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Next 30 days</span>
                    <Badge variant="secondary">+12% verifications</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Peak processing time</span>
                    <Badge variant="outline">Tuesday 2-4 PM</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="space-y-3">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Increase verification staff in District XYZ</p>
                      <p className="text-xs text-muted-foreground">Reduce processing delays by 40%</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Zap className="h-3 w-3 mr-1" />
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Optimize batch processing schedule</p>
                      <p className="text-xs text-muted-foreground">Improve efficiency by 25%</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Zap className="h-3 w-3 mr-1" />
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
