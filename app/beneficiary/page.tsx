"use client"

import type React from "react"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VoiceAssistant } from "@/components/voice-assistant"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { AccessibilityToolbar } from "@/components/accessibility-toolbar"
import { EnhancedStatusTracker } from "@/components/enhanced-status-tracker"
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Volume2,
  HelpCircle,
  CreditCard,
  Phone,
  Upload,
  Send,
  Heart,
} from "lucide-react"
import Link from "next/link"

export default function BeneficiaryPortal() {
  const [applications, setApplications] = useState([
    {
      id: "APP001",
      type: "PCR Act Compensation",
      status: "under-review",
      amount: "₹50,000",
      submittedDate: "2024-01-15",
      lastUpdate: "2024-01-20",
      currentHolder: "District Collector",
    },
    {
      id: "APP002",
      type: "PoA Act Support",
      status: "approved",
      amount: "₹25,000",
      submittedDate: "2024-01-10",
      lastUpdate: "2024-01-18",
      currentHolder: "Central/State Officer",
    },
  ])

  const [trackingId, setTrackingId] = useState("")
  const [selectedApp, setSelectedApp] = useState<any>(null)
  const [formData, setFormData] = useState({
    applicationType: "",
    incidentDate: "",
    description: "",
    policeStation: "",
    firNumber: "",
  })
  const [supportMessage, setSupportMessage] = useState("")

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      speechSynthesis.speak(utterance)
    }
  }

  const handleTrackApplication = () => {
    const app = applications.find((a) => a.id === trackingId)
    if (app) {
      setSelectedApp(app)
      console.log("[v0] Tracking application:", trackingId)
    } else {
      alert("Application not found. Please check your Application ID.")
    }
  }

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Application submitted:", formData)
    const newApp = {
      id: `APP${String(applications.length + 1).padStart(3, "0")}`,
      type: formData.applicationType,
      status: "submitted",
      amount: "₹0 (Pending Assessment)",
      submittedDate: new Date().toISOString().split("T")[0],
      lastUpdate: new Date().toISOString().split("T")[0],
      currentHolder: "System",
    }
    setApplications([...applications, newApp])
    alert(`Application submitted successfully! Your Application ID is: ${newApp.id}`)
    setFormData({
      applicationType: "",
      incidentDate: "",
      description: "",
      policeStation: "",
      firNumber: "",
    })
  }

  const handleSendSupportMessage = () => {
    console.log("[v0] Support message sent:", supportMessage)
    alert("Your message has been sent to our support team. We will respond within 24 hours.")
    setSupportMessage("")
  }

  const handleBankAccountHelp = () => {
    console.log("[v0] Bank account help requested")
    alert("A bank account specialist will contact you within 2 business days to assist with account setup.")
  }

  const handleFileGrievance = () => {
    console.log("[v0] Grievance filing initiated")
    alert("Grievance form opened. You can file complaints about application delays or issues.")
  }

  return (
    <AuthGuard requiredRole="beneficiary" title="Beneficiary Portal">
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Beneficiary Portal</h1>
              <p className="text-muted-foreground">
                Apply for compensation, track your applications, and get support under PCR Act & PoA Act
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/ngo-assistance">
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  NGO Assistance
                </Button>
              </Link>
              <AccessibilityToolbar />
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Tabs defaultValue="dashboard" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="apply">Apply</TabsTrigger>
                  <TabsTrigger value="track">Track</TabsTrigger>
                  <TabsTrigger value="support">Support</TabsTrigger>
                  <TabsTrigger value="help">Help</TabsTrigger>
                </TabsList>

                {/* Dashboard Tab */}
                <TabsContent value="dashboard" className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          Total Applications
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-foreground">{applications.length}</div>
                        <p className="text-sm text-muted-foreground">Submitted this year</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-success" />
                          Approved
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-success">
                          {applications.filter((app) => app.status === "approved").length}
                        </div>
                        <p className="text-sm text-muted-foreground">₹25,000 disbursed</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Clock className="w-5 h-5 text-warning" />
                          Pending
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-warning">
                          {applications.filter((app) => app.status !== "approved").length}
                        </div>
                        <p className="text-sm text-muted-foreground">Under review</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Applications */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Applications</CardTitle>
                      <CardDescription>Your latest compensation applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {applications.map((app) => (
                          <div
                            key={app.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-foreground">{app.type}</h3>
                                <Badge variant={app.status === "approved" ? "default" : "secondary"}>
                                  {app.status === "under-review"
                                    ? "Under Review"
                                    : app.status === "approved"
                                      ? "Approved"
                                      : app.status === "submitted"
                                        ? "Submitted"
                                        : app.status}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Application ID: {app.id} • Amount: {app.amount}
                              </div>
                              <div className="text-sm text-muted-foreground">Last updated: {app.lastUpdate}</div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setTrackingId(app.id)
                                setSelectedApp(app)
                              }}
                            >
                              View Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Apply Tab */}
                <TabsContent value="apply" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        New Application
                      </CardTitle>
                      <CardDescription>Apply for compensation under PCR Act or PoA Act</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <form onSubmit={handleSubmitApplication}>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor="applicationType">Application Type</Label>
                            <Select
                              value={formData.applicationType}
                              onValueChange={(value) => setFormData({ ...formData, applicationType: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select application type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PCR Act Compensation">PCR Act Compensation</SelectItem>
                                <SelectItem value="PoA Act Support">PoA Act Support</SelectItem>
                                <SelectItem value="Medical Assistance">Medical Assistance</SelectItem>
                                <SelectItem value="Legal Aid">Legal Aid</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="incidentDate">Incident Date</Label>
                            <Input
                              type="date"
                              id="incidentDate"
                              value={formData.incidentDate}
                              onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <Label htmlFor="description">Incident Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Provide detailed description of the incident..."
                            className="min-h-[100px]"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor="policeStation">Police Station</Label>
                            <Input
                              id="policeStation"
                              placeholder="Enter police station name"
                              value={formData.policeStation}
                              onChange={(e) => setFormData({ ...formData, policeStation: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="firNumber">FIR Number</Label>
                            <Input
                              id="firNumber"
                              placeholder="Enter FIR number"
                              value={formData.firNumber}
                              onChange={(e) => setFormData({ ...formData, firNumber: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <Label>Supporting Documents</Label>
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground mb-2">
                              Upload FIR copy, medical reports, identity proof
                            </p>
                            <Button variant="outline" size="sm" type="button">
                              Choose Files
                            </Button>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button type="submit" className="flex-1">
                            Submit Application
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => speakText("Application form is ready to submit")}
                          >
                            <Volume2 className="w-4 h-4 mr-2" />
                            Read Form
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Track Tab */}
                <TabsContent value="track" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Track Application
                      </CardTitle>
                      <CardDescription>Enter your application ID to track status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter Application ID (e.g., APP001)"
                          className="flex-1"
                          value={trackingId}
                          onChange={(e) => setTrackingId(e.target.value)}
                        />
                        <Button onClick={handleTrackApplication}>Track</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Status Tracker */}
                  {selectedApp && (
                    <EnhancedStatusTracker
                      applicationId={selectedApp.id}
                      currentStatus={selectedApp.status}
                      currentHolder={selectedApp.currentHolder}
                    />
                  )}
                </TabsContent>

                {/* Support Tab */}
                <TabsContent value="support" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Bank Account Setup
                        </CardTitle>
                        <CardDescription>
                          Get help setting up your bank account for direct benefit transfer
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full" onClick={handleBankAccountHelp}>
                          Get Bank Account Help
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          File Grievance
                        </CardTitle>
                        <CardDescription>Report issues or concerns about your application</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full bg-transparent" onClick={handleFileGrievance}>
                          File Complaint
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Support</CardTitle>
                      <CardDescription>Get help from our support team</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                        <Phone className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold text-foreground">Helpline</p>
                          <p className="text-sm text-muted-foreground">1800-XXX-XXXX (Toll Free)</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="supportMessage">Message</Label>
                        <Textarea
                          id="supportMessage"
                          placeholder="Describe your issue or question..."
                          className="min-h-[100px]"
                          value={supportMessage}
                          onChange={(e) => setSupportMessage(e.target.value)}
                        />
                      </div>

                      <Button className="w-full" onClick={handleSendSupportMessage}>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Help Tab */}
                <TabsContent value="help" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <HelpCircle className="w-5 h-5" />
                        Frequently Asked Questions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <details className="border border-border rounded-lg p-4">
                          <summary className="font-semibold text-foreground cursor-pointer">
                            What documents are required for PCR Act compensation?
                          </summary>
                          <p className="mt-2 text-sm text-muted-foreground">
                            You need FIR copy, medical reports, identity proof, and bank account details.
                          </p>
                        </details>

                        <details className="border border-border rounded-lg p-4">
                          <summary className="font-semibold text-foreground cursor-pointer">
                            How long does the application process take?
                          </summary>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Typically 30-45 days from submission to disbursement, depending on case complexity.
                          </p>
                        </details>

                        <details className="border border-border rounded-lg p-4">
                          <summary className="font-semibold text-foreground cursor-pointer">
                            Can I track my application status online?
                          </summary>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Yes, use the Track tab with your application ID to see real-time status updates.
                          </p>
                        </details>

                        <details className="border border-border rounded-lg p-4">
                          <summary className="font-semibold text-foreground cursor-pointer">
                            What is the Priority Status stage?
                          </summary>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Priority Status is when your case is being evaluated for urgency level, which may expedite
                            processing for critical cases.
                          </p>
                        </details>

                        <details className="border border-border rounded-lg p-4">
                          <summary className="font-semibold text-foreground cursor-pointer">
                            How can I get NGO assistance?
                          </summary>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Click the "NGO Assistance" button in the top right to connect with registered NGOs for legal
                            aid, counseling, and support services.
                          </p>
                        </details>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <VoiceAssistant userRole="beneficiary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
