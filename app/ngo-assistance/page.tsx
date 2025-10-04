"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function NGOAssistancePage() {
  const [selectedNGO, setSelectedNGO] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    district: "",
    assistanceType: "",
    message: "",
  })

  // Mock NGO data
  const ngos = [
    {
      id: "1",
      name: "Child Protection Foundation",
      type: "Legal Aid",
      district: "Delhi",
      phone: "+91-11-XXXX-XXXX",
      email: "help@cpf.org",
      services: ["Legal Consultation", "Court Representation", "Documentation"],
      rating: 4.8,
      cases: 150,
    },
    {
      id: "2",
      name: "Trauma Care Support",
      type: "Counseling",
      district: "Mumbai",
      phone: "+91-22-XXXX-XXXX",
      email: "support@tcs.org",
      services: ["Psychological Counseling", "Family Support", "Rehabilitation"],
      rating: 4.9,
      cases: 200,
    },
    {
      id: "3",
      name: "Women & Child Welfare Society",
      type: "Comprehensive",
      district: "Bangalore",
      phone: "+91-80-XXXX-XXXX",
      email: "contact@wcws.org",
      services: ["Legal Aid", "Counseling", "Financial Support", "Shelter"],
      rating: 4.7,
      cases: 300,
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] NGO assistance request submitted:", formData)
    alert("Your request has been submitted. An NGO representative will contact you within 24 hours.")
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
                <h1 className="text-xl font-bold text-foreground">NGO Assistance</h1>
                <p className="text-sm text-muted-foreground">Connect with registered support organizations</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* NGO Directory */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Registered NGOs</h2>
            <div className="space-y-4">
              {ngos.map((ngo) => (
                <Card
                  key={ngo.id}
                  className={`border-border hover:shadow-lg transition-all cursor-pointer ${selectedNGO === ngo.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedNGO(ngo.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{ngo.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4" />
                          {ngo.district}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{ngo.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {ngo.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>{ngo.cases} cases handled</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>⭐ {ngo.rating}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Request Assistance</CardTitle>
                <CardDescription>Fill out this form to connect with an appropriate NGO for support</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                      <Label htmlFor="assistance">Type of Assistance *</Label>
                      <Select
                        value={formData.assistanceType}
                        onValueChange={(value) => setFormData({ ...formData, assistanceType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="legal">Legal Aid</SelectItem>
                          <SelectItem value="counseling">Counseling</SelectItem>
                          <SelectItem value="financial">Financial Support</SelectItem>
                          <SelectItem value="medical">Medical Assistance</SelectItem>
                          <SelectItem value="shelter">Shelter/Rehabilitation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message/Details</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your situation and the type of assistance you need..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Heart className="w-4 h-4 mr-2" />
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-destructive/20 bg-destructive/5 mt-6">
              <CardHeader>
                <CardTitle className="text-destructive">Emergency Support</CardTitle>
                <CardDescription>If you need immediate assistance, please contact:</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-destructive" />
                    <span className="font-semibold">24/7 Helpline: 1800-XXX-XXXX</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-destructive" />
                    <span>Available 24 hours, 7 days a week</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
