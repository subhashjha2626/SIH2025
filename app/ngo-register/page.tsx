"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Heart, Upload, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function NGORegisterPage() {
  const [formData, setFormData] = useState({
    ngoName: "",
    registrationId: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    state: "",
    services: [] as string[],
    experience: "",
    description: "",
    website: "",
    agreeTerms: false,
  })

  const serviceOptions = [
    "Legal Aid & Consultation",
    "Psychological Counseling",
    "Medical Assistance",
    "Financial Support",
    "Shelter & Rehabilitation",
    "Educational Support",
    "Skill Development",
    "Family Counseling",
  ]

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, services: [...formData.services, service] })
    } else {
      setFormData({ ...formData, services: formData.services.filter((s) => s !== service) })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] NGO registration submitted:", formData)
    alert("Registration submitted successfully! Your application will be reviewed within 5-7 business days.")
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
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">NGO Registration</h1>
                <p className="text-sm text-muted-foreground">Register your organization to provide assistance</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-2xl">Register Your NGO</CardTitle>
            <CardDescription>
              Join our network of registered NGOs to provide support and assistance to victims under PCR Act & PoA Act
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ngoName">NGO Name *</Label>
                    <Input
                      id="ngoName"
                      value={formData.ngoName}
                      onChange={(e) => setFormData({ ...formData, ngoName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="registrationId">Registration ID *</Label>
                    <Input
                      id="registrationId"
                      placeholder="e.g., 12A/80G/FCRA number"
                      value={formData.registrationId}
                      onChange={(e) => setFormData({ ...formData, registrationId: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://your-ngo.org"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Address</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Complete Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="district">District *</Label>
                      <Select
                        value={formData.district}
                        onValueChange={(value) => setFormData({ ...formData, district: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                          <SelectItem value="chennai">Chennai</SelectItem>
                          <SelectItem value="kolkata">Kolkata</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => setFormData({ ...formData, state: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="west-bengal">West Bengal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Services Offered</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {serviceOptions.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={formData.services.includes(service)}
                        onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                      />
                      <Label htmlFor={service} className="text-sm">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience & Description */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Organization Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your organization's mission and work..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Required Documents</h3>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Upload Registration Certificate</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Required: Registration Certificate, 12A/80G Certificate (if applicable), FCRA Certificate (if
                    applicable)
                  </p>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                  required
                />
                <Label htmlFor="agreeTerms" className="text-sm">
                  I agree to the terms and conditions and confirm that all information provided is accurate *
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={!formData.agreeTerms}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Registration
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="border-primary/20 bg-primary/5 mt-6">
          <CardHeader>
            <CardTitle className="text-primary">Registration Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>• Your application will be reviewed within 5-7 business days</p>
              <p>• You will receive an email confirmation once approved</p>
              <p>• Approved NGOs will be listed in our assistance directory</p>
              <p>• You can update your information anytime through the NGO portal</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
