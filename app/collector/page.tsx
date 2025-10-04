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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Clock,
  CheckCircle,
  DollarSign,
  Users,
  BarChart3,
  MapPin,
  Calendar,
  CreditCard,
  Download,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Building,
  TrendingUp,
  PieChart,
} from "lucide-react"

export default function CollectorOfficerDashboard() {
  const [applications, setApplications] = useState([
    {
      id: "APP001",
      applicantName: "Rajesh Kumar",
      type: "PCR Act Compensation",
      amount: 50000,
      status: "Pending Review",
      priority: "High",
      submittedDate: "2024-01-15",
      policeVerification: "Verified",
      documents: "Complete",
      district: "Bangalore Urban",
      policeStation: "MG Road",
    },
    {
      id: "APP002",
      applicantName: "Sunita Devi",
      type: "PoA Act Support",
      amount: 25000,
      status: "Approved",
      priority: "Medium",
      submittedDate: "2024-01-12",
      policeVerification: "Verified",
      documents: "Complete",
      district: "Bangalore Urban",
      policeStation: "Jayanagar",
    },
    {
      id: "APP003",
      applicantName: "Meera Patel",
      type: "Medical Assistance",
      amount: 15000,
      status: "Under Review",
      priority: "Medium",
      submittedDate: "2024-01-18",
      policeVerification: "Pending",
      documents: "Incomplete",
      district: "Bangalore Urban",
      policeStation: "Whitefield",
    },
  ])

  const [selectedApplication, setSelectedApplication] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || app.status.toLowerCase().includes(filterStatus.toLowerCase())
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "default"
      case "Pending Review":
        return "secondary"
      case "Under Review":
        return "secondary"
      case "Rejected":
        return "destructive"
      case "Disbursed":
        return "default"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "secondary"
    }
  }

  const totalApplications = applications.length
  const approvedApplications = applications.filter((app) => app.status === "Approved").length
  const pendingApplications = applications.filter(
    (app) => app.status.includes("Pending") || app.status.includes("Under"),
  ).length
  const totalAmount = applications.reduce((sum, app) => sum + app.amount, 0)
  const approvedAmount = applications
    .filter((app) => app.status === "Approved")
    .reduce((sum, app) => sum + app.amount, 0)

  return (
    <AuthGuard requiredRole="collector" title="District Officer Dashboard">
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">District Officer Dashboard</h1>
            <p className="text-muted-foreground">
              Review applications, manage fund disbursement, and oversee district operations
            </p>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="disbursement">Disbursement</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Total Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{totalApplications}</div>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5 text-warning" />
                      Pending Review
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-warning">{pendingApplications}</div>
                    <p className="text-sm text-muted-foreground">Awaiting decision</p>
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
                    <div className="text-3xl font-bold text-success">{approvedApplications}</div>
                    <p className="text-sm text-muted-foreground">Ready for disbursement</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Total Amount
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">₹{(totalAmount / 1000).toFixed(0)}K</div>
                    <p className="text-sm text-muted-foreground">₹{(approvedAmount / 1000).toFixed(0)}K approved</p>
                  </CardContent>
                </Card>
              </div>

              {/* District Overview */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      District Overview
                    </CardTitle>
                    <CardDescription>Bangalore Urban District</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Police Stations</span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Cases</span>
                      <span className="font-semibold">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Monthly Budget</span>
                      <span className="font-semibold">₹50L</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Utilization</span>
                      <span className="font-semibold text-success">68%</span>
                    </div>
                    <Progress value={68} className="w-full" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Approval Rate</span>
                      <span className="font-semibold text-success">89%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Avg Processing Time</span>
                      <span className="font-semibold">7.2 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Disbursement Rate</span>
                      <span className="font-semibold text-success">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Beneficiary Satisfaction</span>
                      <span className="font-semibold text-success">4.6/5</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Applications Requiring Attention</CardTitle>
                  <CardDescription>High priority applications pending your review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications
                      .filter((app) => app.priority === "High" && app.status.includes("Pending"))
                      .map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg bg-destructive/5"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground">{app.id}</h3>
                              <Badge variant={getStatusColor(app.status)}>{app.status}</Badge>
                              <Badge variant={getPriorityColor(app.priority)}>{app.priority}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Applicant: {app.applicantName} • Amount: ₹{app.amount.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Type: {app.type} • Station: {app.policeStation}
                            </div>
                          </div>
                          <Button size="sm">Review Now</Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Application Management</CardTitle>
                      <CardDescription>Review and process compensation applications</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Search by application ID or applicant name..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Applications</SelectItem>
                          <SelectItem value="pending">Pending Review</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="under">Under Review</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      {filteredApplications.map((app) => (
                        <div key={app.id} className="border border-border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-foreground">{app.id}</h3>
                                <Badge variant={getStatusColor(app.status)}>{app.status}</Badge>
                                <Badge variant={getPriorityColor(app.priority)}>{app.priority}</Badge>
                              </div>
                              <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                                <div>
                                  <p>
                                    <strong>Applicant:</strong> {app.applicantName}
                                  </p>
                                  <p>
                                    <strong>Type:</strong> {app.type}
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    <strong>Amount:</strong> ₹{app.amount.toLocaleString()}
                                  </p>
                                  <p>
                                    <strong>Police Station:</strong> {app.policeStation}
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    <strong>Verification:</strong> {app.policeVerification}
                                  </p>
                                  <p>
                                    <strong>Documents:</strong> {app.documents}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4 mr-1" />
                                    Review
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>Application Review - {app.id}</DialogTitle>
                                    <DialogDescription>
                                      Review application details and make approval decision
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg">Applicant Details</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                          <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Name:</span>
                                            <span className="text-sm font-semibold">{app.applicantName}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Application Type:</span>
                                            <span className="text-sm font-semibold">{app.type}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Requested Amount:</span>
                                            <span className="text-sm font-semibold">
                                              ₹{app.amount.toLocaleString()}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Submitted:</span>
                                            <span className="text-sm font-semibold">{app.submittedDate}</span>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg">Verification Status</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Police Verification:</span>
                                            <Badge
                                              variant={app.policeVerification === "Verified" ? "default" : "secondary"}
                                            >
                                              {app.policeVerification}
                                            </Badge>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Documents:</span>
                                            <Badge variant={app.documents === "Complete" ? "default" : "destructive"}>
                                              {app.documents}
                                            </Badge>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Police Station:</span>
                                            <span className="text-sm font-semibold">{app.policeStation}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">District:</span>
                                            <span className="text-sm font-semibold">{app.district}</span>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>

                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg">Review Decision</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="decision">Decision</Label>
                                            <Select>
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select decision" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="approve">Approve</SelectItem>
                                                <SelectItem value="reject">Reject</SelectItem>
                                                <SelectItem value="more-info">Request More Information</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="approvedAmount">Approved Amount</Label>
                                            <Input
                                              id="approvedAmount"
                                              type="number"
                                              placeholder="Enter approved amount"
                                              defaultValue={app.amount}
                                            />
                                          </div>
                                        </div>

                                        <div className="space-y-2">
                                          <Label htmlFor="reviewNotes">Review Notes</Label>
                                          <Textarea
                                            id="reviewNotes"
                                            placeholder="Enter review comments and justification..."
                                            className="min-h-[100px]"
                                          />
                                        </div>

                                        <div className="flex gap-4">
                                          <Button className="flex-1">
                                            <ThumbsUp className="w-4 h-4 mr-2" />
                                            Approve Application
                                          </Button>
                                          <Button variant="destructive" className="flex-1">
                                            <ThumbsDown className="w-4 h-4 mr-2" />
                                            Reject Application
                                          </Button>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Disbursement Tab */}
            <TabsContent value="disbursement" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-success" />
                      Ready for Disbursement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-success">{approvedApplications}</div>
                    <p className="text-sm text-muted-foreground">₹{(approvedAmount / 1000).toFixed(0)}K total</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      Monthly Budget
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">₹50L</div>
                    <p className="text-sm text-muted-foreground">₹34L utilized</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-success" />
                      Disbursement Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-success">94%</div>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Fund Disbursement</CardTitle>
                  <CardDescription>Process approved applications for fund transfer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {applications
                      .filter((app) => app.status === "Approved")
                      .map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg bg-success/5"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground">{app.id}</h3>
                              <Badge variant="default">Approved</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {app.applicantName} • ₹{app.amount.toLocaleString()} • {app.type}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button size="sm">
                              <CreditCard className="w-4 h-4 mr-2" />
                              Disburse
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1">Process All Disbursements</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Generate Disbursement Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Application Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">PCR Act Compensation</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <Progress value={45} className="w-full" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">PoA Act Support</span>
                        <span className="font-semibold">30%</span>
                      </div>
                      <Progress value={30} className="w-full" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Medical Assistance</span>
                        <span className="font-semibold">25%</span>
                      </div>
                      <Progress value={25} className="w-full" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Monthly Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Applications Received</span>
                        <span className="font-semibold text-success">↑ 12%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Approval Rate</span>
                        <span className="font-semibold text-success">↑ 5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Processing Time</span>
                        <span className="font-semibold text-success">↓ 8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Disbursement Rate</span>
                        <span className="font-semibold text-success">↑ 3%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>District Performance</CardTitle>
                  <CardDescription>Comparative analysis across police stations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border border-border rounded-lg">
                        <h4 className="font-semibold text-foreground">MG Road</h4>
                        <p className="text-2xl font-bold text-success">18</p>
                        <p className="text-sm text-muted-foreground">Applications</p>
                      </div>
                      <div className="text-center p-4 border border-border rounded-lg">
                        <h4 className="font-semibold text-foreground">Jayanagar</h4>
                        <p className="text-2xl font-bold text-success">15</p>
                        <p className="text-sm text-muted-foreground">Applications</p>
                      </div>
                      <div className="text-center p-4 border border-border rounded-lg">
                        <h4 className="font-semibold text-foreground">Whitefield</h4>
                        <p className="text-2xl font-bold text-success">12</p>
                        <p className="text-sm text-muted-foreground">Applications</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Reports</CardTitle>
                  <CardDescription>Create detailed reports for administrative review and compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                      <FileText className="w-8 h-8" />
                      <span>Monthly Summary</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                      <DollarSign className="w-8 h-8" />
                      <span>Financial Report</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                      <Users className="w-8 h-8" />
                      <span>Beneficiary Report</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                      <BarChart3 className="w-8 h-8" />
                      <span>Performance Analytics</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                      <MapPin className="w-8 h-8" />
                      <span>District Overview</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                      <Calendar className="w-8 h-8" />
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
                  <CardTitle>District Settings</CardTitle>
                  <CardDescription>Configure district-specific parameters and thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="monthlyBudget">Monthly Budget (₹)</Label>
                        <Input id="monthlyBudget" type="number" defaultValue="5000000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxAmount">Maximum Compensation Amount (₹)</Label>
                        <Input id="maxAmount" type="number" defaultValue="100000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="processingDays">Target Processing Days</Label>
                        <Input id="processingDays" type="number" defaultValue="7" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="autoApproval">Auto-approval Threshold (₹)</Label>
                        <Input id="autoApproval" type="number" defaultValue="10000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="escalationDays">Escalation After (Days)</Label>
                        <Input id="escalationDays" type="number" defaultValue="10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notificationEmail">Notification Email</Label>
                        <Input id="notificationEmail" type="email" defaultValue="collector@bangalore.gov.in" />
                      </div>
                    </div>
                  </div>

                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
