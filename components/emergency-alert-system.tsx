"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, X, Volume2, VolumeX } from "lucide-react"

type EmergencyAlert = {
  id: string
  type: "critical" | "warning" | "info"
  title: string
  message: string
  timestamp: Date
  isActive: boolean
}

export function EmergencyAlertSystem() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    {
      id: "1",
      type: "warning",
      title: "System Maintenance",
      message: "Scheduled maintenance on Sunday 2:00 AM - 4:00 AM IST. Services may be temporarily unavailable.",
      timestamp: new Date(),
      isActive: true,
    },
  ])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])

  const activeAlerts = alerts.filter((alert) => alert.isActive && !dismissedAlerts.includes(alert.id))

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => [...prev, alertId])
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "destructive"
      case "warning":
        return "default"
      case "info":
        return "secondary"
      default:
        return "default"
    }
  }

  if (activeAlerts.length === 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-2">
        {activeAlerts.map((alert) => (
          <Alert key={alert.id} className="mb-2 last:mb-0">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={getAlertColor(alert.type)}>{alert.type.toUpperCase()}</Badge>
                <span className="font-medium">{alert.title}:</span>
                <span>{alert.message}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setSoundEnabled(!soundEnabled)}>
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => dismissAlert(alert.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  )
}
