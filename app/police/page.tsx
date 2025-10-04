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
import { AIInsights } from "@/components/ai-insights"
import { PerformanceLeaderboard } from "@/components/performance-leaderboard"
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Plus,
  Eye,
  Edit,
  Users,
  Shield,
  MapPin,
  Phone,
  Camera,
  Upload,
  BarChart3,
} from "lucide-react"

export default function PoliceOfficerDashboard() {
  const [cases, setCases] = useState([
    {
      id: "CASE001",
      firNumber: "FIR/2024/001",
      victimName: "Rajesh Kumar",
      incidentType: "Assault",
      status: "Investigation",
      priority: "High",
      dateReported: "2024-01-15",
      location: "MG Road, Bangalore",
      assignedOfficer: "SI Priya Sharma",
      compensationStatus: "Pending Verification",
    },
    {
      id: "CASE002",
      firNumber: "FIR/2024/002",
      victimName: "Sunita Devi",
      incidentType: "Domestic Violence",
      status: "Verified",
      priority: "Medium",
      dateReported: "2024-01-12",
      location: "Jayanagar, Bangalore",
      assignedOfficer: "SI Priya Sharma",
      compensationStatus: "Verified",
    },
  ])

  const [selectedCase, setSelectedCase] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCases = cases.filter(
    (case_) =>
      case_.firNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.victimName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "default"
      case "Investigation":
        return "secondary"
      case "Closed":
        return "outline"
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

  return (
    <AuthGuard requiredRole="police" title="Police Officer Dashboard">
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Police Officer Dashboard</h1>
            <p className="text-muted-foreground">Manage cases, verify victims, and update compensation status</p>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="cases">Cases</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="grid md:grid-cols-4 gap-6 mb-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          Total Cases
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-foreground">24</div>
                        <p className="text-sm text-muted-foreground">This month</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Clock className="w-5 h-5 text-warning" />
                          Under Investigation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-warning">8</div>
                        <p className="text-sm text-muted-foreground">Active cases</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-success" />
                          Verified
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-success">12</div>
                        <p className="text-sm text-muted-foreground">Ready for compensation</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-destructive" />
                          High Priority
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-destructive">3</div>
                        <p className="text-sm text-muted-foreground">Urgent attention</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Cases */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Cases</CardTitle>
                      <CardDescription>Latest cases assigned to you</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {cases.slice(0, 3).map((case_) => (
                          <div
                            key={case_.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-foreground">{case_.firNumber}</h3>
                                <Badge variant={getStatusColor(case_.status)}>{case_.status}</Badge>
                                <Badge variant={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Victim: {case_.victimName} • Type: {case_.incidentType}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Location: {case_.location} • Date: {case_.dateReported}
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View Case
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <AIInsights userRole="police" />
                </div>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button className="h-20 flex-col gap-2">
                      <Plus className="w-6 h-6" />
                      Register New Case
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Search className="w-6 h-6" />
                      Search Cases
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <FileText className="w-6 h-6" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Insights Tab */}
            <TabsContent value="ai-insights" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <AIInsights userRole="police" />
                <PerformanceLeaderboard userRole="police" />
              </div>
            </TabsContent>

            {/* Cases Tab */}
            <TabsContent value="cases" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Case Management</CardTitle>
                      <CardDescription>View and manage all assigned cases</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          New Case
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Register New Case</DialogTitle>
                          <DialogDescription>Enter case details and victim information</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firNumber">FIR Number</Label>
                              <Input id="firNumber" placeholder="FIR/2024/XXX" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="incidentDate">Incident Date</Label>
                              <Input type="date" id="incidentDate" />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="victimName">Victim Name</Label>
                              <Input id="victimName" placeholder="Enter victim name" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="incidentType">Incident Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="assault">Assault</SelectItem>
                                  <SelectItem value="domestic">Domestic Violence</SelectItem>
                                  <SelectItem value="theft">Theft</SelectItem>
                                  <SelectItem value="accident">Accident</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="location">Incident Location</Label>
                            <Input id="location" placeholder="Enter location details" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Case Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Detailed description of the incident..."
                              className="min-h-[100px]"
                            />
                          </div>

                          <div className="flex gap-4">
                            <Button className="flex-1">Register Case</Button>
                            <Button variant="outline" className="flex-1 bg-transparent">
                              Save Draft
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Search by FIR number or victim name..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Cases</SelectItem>
                          <SelectItem value="investigation">Investigation</SelectItem>
                          <SelectItem value="verified">Verified</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      {filteredCases.map((case_) => (
                        <div key={case_.id} className="border border-border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-foreground">{case_.firNumber}</h3>
                                <Badge variant={getStatusColor(case_.status)}>{case_.status}</Badge>
                                <Badge variant={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div>
                                  <p>
                                    <strong>Victim:</strong> {case_.victimName}
                                  </p>
                                  <p>
                                    <strong>Type:</strong> {case_.incidentType}
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    <strong>Location:</strong> {case_.location}
                                  </p>
                                  <p>
                                    <strong>Date:</strong> {case_.dateReported}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Update
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-border">
                            <span className="text-sm text-muted-foreground">
                              Compensation: {case_.compensationStatus}
                            </span>
                            <Button size="sm">Update Status</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Verification Tab */}
            <TabsContent value="verification" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Victim Verification</CardTitle>
                  <CardDescription>
                    Verify victim details and incident information for compensation eligibility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Pending Verification</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                            <div>
                              <p className="font-semibold text-foreground">FIR/2024/001</p>
                              <p className="text-sm text-muted-foreground">Rajesh Kumar</p>
                            </div>
                            <Button size="sm">Verify</Button>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                            <div>
                              <p className="font-semibold text-foreground">FIR/2024/003</p>
                              <p className="text-sm text-muted-foreground">Meera Patel</p>
                            </div>
                            <Button size="sm">Verify</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Verification Checklist</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-success" />
                            <span className="text-sm">Identity Verification</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-success" />
                            <span className="text-sm">Medical Reports Review</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-warning" />
                            <span className="text-sm">Witness Statements</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-warning" />
                            <span className="text-sm">Scene Investigation</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Verification Form</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="caseId">Case ID</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select case" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="case001">FIR/2024/001 - Rajesh Kumar</SelectItem>
                              <SelectItem value="case003">FIR/2024/003 - Meera Patel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="verificationStatus">Verification Status</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="verified">Verified</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                              <SelectItem value="pending">Pending More Info</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="verificationNotes">Verification Notes</Label>
                        <Textarea
                          id="verificationNotes"
                          placeholder="Enter verification details, observations, and recommendations..."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Supporting Evidence</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload photos, documents, or additional evidence
                          </p>
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Files
                          </Button>
                        </div>
                      </div>

                      <Button className="w-full">Submit Verification</Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Cases Registered</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Cases Verified</span>
                        <span className="font-semibold">18</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Pending Verification</span>
                        <span className="font-semibold">6</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Average Processing Time</span>
                        <span className="font-semibold">5.2 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Verification Rate</span>
                        <span className="font-semibold text-success">92%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Response Time</span>
                        <span className="font-semibold text-success">2.1 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Quality Score</span>
                        <span className="font-semibold text-success">4.8/5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Cases Closed</span>
                        <span className="font-semibold">16</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Generate Reports</CardTitle>
                  <CardDescription>Create detailed reports for administrative review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <FileText className="w-6 h-6" />
                      Monthly Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Users className="w-6 h-6" />
                      Victim Statistics
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <BarChart3 className="w-6 h-6" />
                      Performance Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Officer Profile</CardTitle>
                  <CardDescription>Your profile information and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                      <Shield className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">SI Priya Sharma</h3>
                      <p className="text-muted-foreground">Sub Inspector</p>
                      <p className="text-sm text-muted-foreground">Badge: 12345 • Station: MG Road Police Station</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-semibold">Contact Information</Label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">+91 98765 43210</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">MG Road Police Station, Bangalore</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-semibold">Performance Summary</Label>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Cases Handled</span>
                            <span className="text-sm font-semibold">156</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Success Rate</span>
                            <span className="text-sm font-semibold">94%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Years of Service</span>
                            <span className="text-sm font-semibold">8 years</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button>Update Profile</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
