"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, BarChart3, Globe, ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })

  console.log("[v0] Admin page loaded")

  const handleLogin = (role: string) => {
    console.log(`[v0] Admin login attempted for role: ${role}`)
    // Mock authentication - in real app would validate credentials
    if (credentials.username && credentials.password) {
      // Redirect based on role
      switch (role) {
        case "police":
          window.location.href = "/police"
          break
        case "collector":
          window.location.href = "/collector"
          break
        case "central":
          window.location.href = "/central"
          break
        default:
          console.log("[v0] Unknown admin role")
      }
    } else {
      alert("Please enter both username and password")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-primary/20 bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-2 border-primary/20">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Access Portal</h1>
                <p className="text-sm text-muted-foreground">Secure login for administrative personnel</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              🔒 Secure Access Required
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-4">Administrative Login</h1>
            <p className="text-muted-foreground text-lg">
              Enter your credentials to access your administrative dashboard
            </p>
          </div>

          {/* Login Form */}
          <Card className="max-w-md mx-auto mb-12">
            <CardHeader>
              <CardTitle>Login Credentials</CardTitle>
              <CardDescription>Use your official government credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username">Username / Employee ID</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role Selection */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Police Officer</CardTitle>
                <CardDescription>Case management and victim verification</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={() => handleLogin("police")}
                  disabled={!credentials.username || !credentials.password}
                >
                  Access Police Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
              <CardHeader className="text-center">
                <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>District Officer</CardTitle>
                <CardDescription>Application review and fund disbursement</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={() => handleLogin("collector")}
                  disabled={!credentials.username || !credentials.password}
                >
                  Access District Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
              <CardHeader className="text-center">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Central/State Officer</CardTitle>
                <CardDescription>Policy oversight and system administration</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={() => handleLogin("central")}
                  disabled={!credentials.username || !credentials.password}
                >
                  Access Central Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Demo Credentials */}
          <Card className="mt-8 bg-muted/30">
            <CardHeader>
              <CardTitle className="text-sm">Demo Credentials (For Testing)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <strong>Username:</strong> admin
                </p>
                <p>
                  <strong>Password:</strong> demo123
                </p>
                <p className="text-xs mt-2">Note: In production, use your official government credentials</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
