"use client"

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
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  DollarSign,
  Settings,
  FileText,
  Shield,
  Database,
  Activity,
  PieChart,
  Target,
  Award,
  Bell,
  Eye,
  Edit,
  Plus,
} from "lucide-react"

export default function CentralStateOfficerDashboard() {
  const [selectedState, setSelectedState] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")

  const stateData = [
    {
      state: "Karnataka",
      districts: 30,
      applications: 2456,
      approved: 2198,
      disbursed: 2089,
      budget: 50000000,
      utilized: 34500000,
      performance: 89,
    },
    {
      state: "Tamil Nadu",
      districts: 32,
      applications: 2789,
      approved: 2456,
      disbursed: 2234,
      budget: 55000000,
      utilized: 38900000,
      performance: 92,
    },
    {
      state: "Andhra Pradesh",
      districts: 26,
      applications: 1987,
      approved: 1756,
      disbursed: 1623,
      budget: 40000000,
      utilized: 28100000,
      performance: 86,
    },
  ]

  const policyUpdates = [
    {
      id: "POL001",
      title: "Updated Compensation Guidelines for PCR Act",
      date: "2024-01-20",
      status: "Active",
      impact: "High",
      description: "Revised compensation amounts and eligibility criteria",
    },
    {
      id: "POL002",
      title: "New Digital Verification Process",
      date: "2024-01-18",
      status: "Draft",
      impact: "Medium",
      description: "Implementation of AI-powered document verification",
    },
  ]

  const alerts = [
    {
      id: "ALT001",
      type: "Budget",
      message: "Karnataka approaching 90% budget utilization",
      severity: "High",
      timestamp: "2024-01-21 10:30",
    },
    {
      id: "ALT002",
      type: "Performance",
      message: "Processing delays in Andhra Pradesh - 3 districts",
      severity: "Medium",
      timestamp: "2024-01-21 09:15",
    },
  ]

  const totalApplications = stateData.reduce((sum, state) => sum + state.applications, 0)
  const totalApproved = stateData.reduce((sum, state) => sum + state.approved, 0)
  const totalBudget = stateData.reduce((sum, state) => sum + state.budget, 0)
  const totalUtilized = stateData.reduce((sum, state) => sum + state.utilized, 0)
  const avgPerformance = Math.round(stateData.reduce((sum, state) => sum + state.performance, 0) / stateData.length)

  return (
    <AuthGuard requiredRole="central" title="Central/State Officer Dashboard">
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Central/State Officer Dashboard</h1>
            <p className="text-muted-foreground">
              Policy oversight, system administration, and comprehensive analytics across all states
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="states">States</TabsTrigger>
              <TabsTrigger value="policy">Policy</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid md:grid-cols-5 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Total Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{totalApplications.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Across all states</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-success" />
                      Approval Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-success">
                      {Math.round((totalApproved / totalApplications) * 100)}%
                    </div>
                    <p className="text-sm text-muted-foreground">{totalApproved.toLocaleString()} approved</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Budget Utilization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">
                      {Math.round((totalUtilized / totalBudget) * 100)}%
                    </div>
                    <p className="text-sm text-muted-foreground">₹{(totalUtilized / 10000000).toFixed(1)}Cr utilized</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="w-5 h-5 text-success" />
                      Avg Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-success">{avgPerformance}%</div>
                    <p className="text-sm text-muted-foreground">System efficiency</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Active States
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{stateData.length}</div>
                    <p className="text-sm text-muted-foreground">
                      {stateData.reduce((sum, state) => sum + state.districts, 0)} districts
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Alerts and Notifications */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      System Alerts
                    </CardTitle>
                    <CardDescription>Critical notifications requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`p-3 rounded-lg border ${
                            alert.severity === "High"
                              ? "border-destructive bg-destructive/5"
                              : "border-warning bg-warning/5"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant={alert.severity === "High" ? "destructive" : "secondary"}>
                              {alert.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                          </div>
                          <p className="text-sm text-foreground">{alert.message}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      System Health
                    </CardTitle>
                    <CardDescription>Real-time system performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Application Processing</span>
                        <span className="font-semibold text-success">98.5%</span>
                      </div>
                      <Progress value={98.5} className="w-full" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Database Performance</span>
                        <span className="font-semibold text-success">96.2%</span>
                      </div>
                      <Progress value={96.2} className="w-full" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">API Response Time</span>
                        <span className="font-semibold text-success">94.8%</span>
                      </div>
                      <Progress value={94.8} className="w-full" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* State Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>State Performance Overview</CardTitle>
                  <CardDescription>Comparative performance across participating states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stateData.map((state) => (
                      <div key={state.state} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-foreground">{state.state}</h3>
                            <Badge
                              variant={
                                state.performance >= 90
                                  ? "default"
                                  : state.performance >= 80
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {state.performance}% Performance
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Districts</p>
                            <p className="font-semibold">{state.districts}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Applications</p>
                            <p className="font-semibold">{state.applications.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Budget Utilization</p>
                            <p className="font-semibold">{Math.round((state.utilized / state.budget) * 100)}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Disbursement Rate</p>
                            <p className="font-semibold">{Math.round((state.disbursed / state.approved) * 100)}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="flex gap-4 mb-6">
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                    <SelectItem value="andhrapradesh">Andhra Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Application Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">PCR Act Compensation</span>
                        <span className="font-semibold">52%</span>
                      </div>
                      <Progress value={52} className="w-full" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">PoA Act Support</span>
                        <span className="font-semibold">31%</span>
                      </div>
                      <Progress value={31} className="w-full" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Medical Assistance</span>
                        <span className="font-semibold">17%</span>
                      </div>
                      <Progress value={17} className="w-full" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Processing Efficiency
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Average Processing Time</span>
                        <span className="font-semibold text-success">6.2 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Auto-approval Rate</span>
                        <span className="font-semibold text-success">34%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Appeal Success Rate</span>
                        <span className="font-semibold">18%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">System Uptime</span>
                        <span className="font-semibold text-success">99.8%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Trend Analysis</CardTitle>
                  <CardDescription>Monthly trends and performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center p-4 border border-border rounded-lg">
                      <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                      <h4 className="font-semibold text-foreground">Applications</h4>
                      <p className="text-2xl font-bold text-success">↑ 15%</p>
                      <p className="text-sm text-muted-foreground">vs last month</p>
                    </div>
                    <div className="text-center p-4 border border-border rounded-lg">
                      <Target className="w-8 h-8 text-success mx-auto mb-2" />
                      <h4 className="font-semibold text-foreground">Approval Rate</h4>
                      <p className="text-2xl font-bold text-success">↑ 3%</p>
                      <p className="text-sm text-muted-foreground">vs last month</p>
                    </div>
                    <div className="text-center p-4 border border-border rounded-lg">
                      <DollarSign className="w-8 h-8 text-warning mx-auto mb-2" />
                      <h4 className="font-semibold text-foreground">Budget Usage</h4>
                      <p className="text-2xl font-bold text-warning">↑ 8%</p>
                      <p className="text-sm text-muted-foreground">vs last month</p>
                    </div>
                    <div className="text-center p-4 border border-border rounded-lg">
                      <Users className="w-8 h-8 text-success mx-auto mb-2" />
                      <h4 className="font-semibold text-foreground">Beneficiaries</h4>
                      <p className="text-2xl font-bold text-success">↑ 12%</p>
                      <p className="text-sm text-muted-foreground">vs last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* States Tab */}
            <TabsContent value="states" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>State Management</CardTitle>
                  <CardDescription>Detailed view and management of state-wise operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {stateData.map((state) => (
                      <Card key={state.state} className="border-border">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl font-semibold text-foreground">{state.state}</h3>
                              <Badge
                                variant={
                                  state.performance >= 90
                                    ? "default"
                                    : state.performance >= 80
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                Performance: {state.performance}%
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Configure
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-foreground">Infrastructure</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Districts:</span>
                                  <span className="font-semibold">{state.districts}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Police Stations:</span>
                                  <span className="font-semibold">{state.districts * 8}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-semibold text-foreground">Applications</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Total:</span>
                                  <span className="font-semibold">{state.applications.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Approved:</span>
                                  <span className="font-semibold text-success">{state.approved.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Disbursed:</span>
                                  <span className="font-semibold text-success">{state.disbursed.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-semibold text-foreground">Budget</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Allocated:</span>
                                  <span className="font-semibold">₹{(state.budget / 10000000).toFixed(0)}Cr</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Utilized:</span>
                                  <span className="font-semibold">₹{(state.utilized / 10000000).toFixed(1)}Cr</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Utilization:</span>
                                  <span className="font-semibold">
                                    {Math.round((state.utilized / state.budget) * 100)}%
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-semibold text-foreground">Performance</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Approval Rate:</span>
                                  <span className="font-semibold">
                                    {Math.round((state.approved / state.applications) * 100)}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Disbursement:</span>
                                  <span className="font-semibold">
                                    {Math.round((state.disbursed / state.approved) * 100)}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Overall Score:</span>
                                  <span className="font-semibold">{state.performance}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Policy Tab */}
            <TabsContent value="policy" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Policy Management</CardTitle>
                      <CardDescription>Create, update, and manage policy guidelines</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          New Policy
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Create New Policy</DialogTitle>
                          <DialogDescription>Define new policy guidelines and implementation details</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="policyTitle">Policy Title</Label>
                              <Input id="policyTitle" placeholder="Enter policy title" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="policyType">Policy Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="compensation">Compensation Guidelines</SelectItem>
                                  <SelectItem value="eligibility">Eligibility Criteria</SelectItem>
                                  <SelectItem value="process">Process Updates</SelectItem>
                                  <SelectItem value="system">System Configuration</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="policyDescription">Policy Description</Label>
                            <Textarea
                              id="policyDescription"
                              placeholder="Detailed description of the policy..."
                              className="min-h-[100px]"
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="effectiveDate">Effective Date</Label>
                              <Input type="date" id="effectiveDate" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="impact">Impact Level</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select impact" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <Button className="flex-1">Create Policy</Button>
                            <Button variant="outline" className="flex-1 bg-transparent">
                              Save as Draft
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {policyUpdates.map((policy) => (
                      <div key={policy.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground">{policy.title}</h3>
                              <Badge variant={policy.status === "Active" ? "default" : "secondary"}>
                                {policy.status}
                              </Badge>
                              <Badge variant={policy.impact === "High" ? "destructive" : "secondary"}>
                                {policy.impact} Impact
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{policy.description}</p>
                            <p className="text-xs text-muted-foreground">
                              Policy ID: {policy.id} • Created: {policy.date}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      System Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Database Status</span>
                        <Badge variant="default">Online</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">API Gateway</span>
                        <Badge variant="default">Healthy</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Authentication Service</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Notification Service</span>
                        <Badge variant="default">Running</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Security & Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Data Encryption</span>
                        <Badge variant="default">AES-256</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">SSL Certificate</span>
                        <Badge variant="default">Valid</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Audit Logging</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Compliance Score</span>
                        <Badge variant="default">98%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>System Administration</CardTitle>
                  <CardDescription>Manage system-wide settings and configurations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Users className="w-6 h-6" />
                      User Management
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Database className="w-6 h-6" />
                      Database Admin
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Shield className="w-6 h-6" />
                      Security Settings
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Settings className="w-6 h-6" />
                      System Config
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Executive Reports</CardTitle>
                  <CardDescription>Generate comprehensive reports for executive review and compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                      <FileText className="w-8 h-8" />
                      <span>National Summary</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                      <BarChart3 className="w-8 h-8" />
                      <span>Performance Analytics</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                      <DollarSign className="w-8 h-8" />
                      <span>Financial Report</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                      <MapPin className="w-8 h-8" />
                      <span>State Comparison</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                      <Users className="w-8 h-8" />
                      <span>Beneficiary Analysis</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                      <Shield className="w-8 h-8" />
                      <span>Compliance Report</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Global Settings</CardTitle>
                  <CardDescription>Configure system-wide parameters and thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="maxCompensation">Maximum Compensation Amount (₹)</Label>
                        <Input id="maxCompensation" type="number" defaultValue="500000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="autoApprovalLimit">Auto-approval Limit (₹)</Label>
                        <Input id="autoApprovalLimit" type="number" defaultValue="25000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="processingTarget">Target Processing Days</Label>
                        <Input id="processingTarget" type="number" defaultValue="7" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="escalationThreshold">Escalation Threshold (Days)</Label>
                        <Input id="escalationThreshold" type="number" defaultValue="15" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budgetAlert">Budget Alert Threshold (%)</Label>
                        <Input id="budgetAlert" type="number" defaultValue="85" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="performanceTarget">Performance Target (%)</Label>
                        <Input id="performanceTarget" type="number" defaultValue="90" />
                      </div>
                    </div>
                  </div>

                  <Button>Save Global Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
