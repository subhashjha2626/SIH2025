"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole: "beneficiary" | "police" | "collector" | "central"
  title: string
}

export function AuthGuard({ children, requiredRole, title }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [isLoading, setIsLoading] = useState(false)

  // Check if user is already authenticated
  useEffect(() => {
    const authData = localStorage.getItem(`auth_${requiredRole}`)
    if (authData) {
      const { timestamp } = JSON.parse(authData)
      // Check if session is still valid (24 hours)
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem(`auth_${requiredRole}`)
      }
    }
  }, [requiredRole])

  const handleSendOTP = async () => {
    if (phone.length !== 10) return

    setIsLoading(true)
    // Simulate OTP sending
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStep("otp")
    setIsLoading(false)
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return

    setIsLoading(true)
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store authentication
    localStorage.setItem(
      `auth_${requiredRole}`,
      JSON.stringify({
        phone,
        role: requiredRole,
        timestamp: Date.now(),
      }),
    )

    setIsAuthenticated(true)
    setIsLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem(`auth_${requiredRole}`)
    setIsAuthenticated(false)
    setStep("phone")
    setPhone("")
    setOtp("")
  }

  if (isAuthenticated) {
    return (
      <div>
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">{title}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle>Secure Access</CardTitle>
          <CardDescription>{title} - OTP Authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === "phone" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 border-input rounded-l-md bg-muted">
                    <Phone className="w-4 h-4 text-muted-foreground mr-1" />
                    <span className="text-sm">+91</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="rounded-l-none"
                  />
                </div>
              </div>
              <Button onClick={handleSendOTP} disabled={phone.length !== 10 || isLoading} className="w-full">
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="text-center text-lg tracking-widest"
                />
                <p className="text-sm text-muted-foreground text-center">OTP sent to +91 {phone}</p>
              </div>
              <Button onClick={handleVerifyOTP} disabled={otp.length !== 6 || isLoading} className="w-full">
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button variant="ghost" onClick={() => setStep("phone")} className="w-full">
                Change Number
              </Button>
            </>
          )}

          <div className="text-center pt-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
