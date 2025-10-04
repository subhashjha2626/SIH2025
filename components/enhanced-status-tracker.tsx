"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, User, FileText, Building, Globe } from "lucide-react"

interface StatusTrackerProps {
  applicationId: string
  currentStatus: string
  currentHolder: string
}

export function EnhancedStatusTracker({ applicationId, currentStatus, currentHolder }: StatusTrackerProps) {
  const statusSteps = [
    {
      id: "submitted",
      title: "Application Submitted",
      description: "Your application has been received",
      icon: FileText,
      holder: "System",
      completed: true,
    },
    {
      id: "police-review",
      title: "Police Verification",
      description: "Under review by Police Officer",
      icon: User,
      holder: "Police Officer",
      completed: currentStatus !== "submitted",
    },
    {
      id: "priority-status",
      title: "Priority Assessment",
      description: "Case priority being evaluated",
      icon: AlertCircle,
      holder: "Police Officer",
      completed: ["collector-review", "under-review", "central-review", "approved", "disbursed"].includes(
        currentStatus,
      ),
    },
    {
      id: "collector-review",
      title: "Collector Review",
      description: "Under review by District Collector",
      icon: Building,
      holder: "District Collector",
      completed: ["under-review", "central-review", "approved", "disbursed"].includes(currentStatus),
    },
    {
      id: "under-review",
      title: "Under Review",
      description: "Detailed assessment in progress",
      icon: Clock,
      holder: "District Collector",
      completed: ["central-review", "approved", "disbursed"].includes(currentStatus),
    },
    {
      id: "central-review",
      title: "Central Approval",
      description: "Final review by Central/State Officer",
      icon: Globe,
      holder: "Central/State Officer",
      completed: ["approved", "disbursed"].includes(currentStatus),
    },
    {
      id: "approved",
      title: "Approved",
      description: "Application approved for disbursement",
      icon: CheckCircle,
      holder: "Central/State Officer",
      completed: currentStatus === "disbursed",
    },
    {
      id: "disbursed",
      title: "Amount Disbursed",
      description: "Compensation amount transferred",
      icon: CheckCircle,
      holder: "System",
      completed: currentStatus === "disbursed",
    },
  ]

  const currentStepIndex = statusSteps.findIndex((step) => step.id === currentStatus)
  const progress = ((currentStepIndex + 1) / statusSteps.length) * 100

  const getStatusColor = (stepId: string) => {
    if (stepId === currentStatus) return "bg-primary text-primary-foreground"
    if (statusSteps.find((s) => s.id === stepId)?.completed) return "bg-success text-success-foreground"
    return "bg-muted text-muted-foreground"
  }

  const getHolderBadgeColor = (holder: string) => {
    if (holder === currentHolder) return "bg-primary text-primary-foreground"
    return "bg-muted text-muted-foreground"
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Application Status</span>
          <Badge variant="outline">ID: {applicationId}</Badge>
        </CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Document Holder */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-accent" />
              <span className="font-medium text-accent">Currently with:</span>
            </div>
            <Badge className={getHolderBadgeColor(currentHolder)}>{currentHolder}</Badge>
          </div>

          {/* Status Timeline */}
          <div className="space-y-3">
            {statusSteps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === currentStatus
              const isCompleted = step.completed

              return (
                <div key={step.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(step.id)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`font-medium ${isActive ? "text-primary" : isCompleted ? "text-success" : "text-muted-foreground"}`}
                      >
                        {step.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {step.holder}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                    {isActive && (
                      <div className="flex items-center gap-1 mt-2">
                        <Clock className="w-3 h-3 text-primary" />
                        <span className="text-xs text-primary">In Progress</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
