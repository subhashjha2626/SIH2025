"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { AccessibilityToolbar } from "@/components/accessibility-toolbar"
import { useLanguage } from "@/contexts/language-context"
import { Users, Shield, BarChart3, Globe, Menu, X, Heart, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-primary/20 bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Government Emblem Placeholder */}
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-2 border-primary/20">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{t("Nyay Sahyog")}</h1>
                <p className="text-sm text-muted-foreground font-medium">
                  {t("government_of_india")} | PCR Act & PoA Act Implementation
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <AccessibilityToolbar />
              <LanguageSelector />
              <ThemeToggle />
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-border">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <AccessibilityToolbar />
                  <LanguageSelector />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-semibold">
            🇮🇳 {t("government_of_india")} Initiative
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-foreground">
            {t("Nyay Sahyog")}
            
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 leading-relaxed max-w-3xl mx-auto">
            Streamlined implementation of Protection of Civil Right Act, 1955 & Prevention of
            Atrocities (PoA) Act, 1989 for efficient victim compensation and support services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/beneficiary">
              <Button size="lg" className="w-full sm:w-auto shadow-lg">
                <Users className="w-5 h-5 mr-2" />
                {t("beneficiary portal")}
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-2">
                <Shield className="w-5 h-5 mr-2" />
                {t("admin access")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("system_features")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive tools for managing victim compensation and administrative oversight
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-8 h-8 text-primary mb-2" />
                <CardTitle>{t("multi_portal_access")}</CardTitle>
                <CardDescription>
                  Separate portals for beneficiaries, police officers, collectors, and central/state officers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="w-8 h-8 text-primary mb-2" />
                <CardTitle>{t("multilingual support")}</CardTitle>
                <CardDescription>
                  Available in English, Hindi, Telugu, Tamil and other regional languages
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-primary mb-2" />
                <CardTitle>{t("ai powered analytics")}</CardTitle>
                <CardDescription>
                  Real-time insights, performance tracking, and predictive analytics for better decision making
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle>{t("secure authentication")}</CardTitle>
                <CardDescription>OTP-based login, role-based access control, and secure data handling</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-8 h-8 text-primary mb-2" />
                <CardTitle>{t("voice assistant")}</CardTitle>
                <CardDescription>
                  Accessibility-first design with voice navigation and screen reader support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-primary mb-2" />
                <CardTitle>{t("performance tracking")}</CardTitle>
                <CardDescription>
                  Leaderboards, case resolution metrics, and administrative performance monitoring
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Portal Access Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("access_your_portal")}</h2>
            <p className="text-muted-foreground text-lg">
              Choose your role to access the appropriate dashboard and tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/beneficiary">
              <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <CardHeader className="text-center">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>{t("beneficiary portal")}</CardTitle>
                  <CardDescription>Apply for compensation, track applications, file grievances</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">{t("access_portal")}</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/police">
              <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <CardHeader className="text-center">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>{t("police officer")}</CardTitle>
                  <CardDescription>Case management, victim verification, status updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">{t("access_dashboard")}</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/collector">
              <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <CardHeader className="text-center">
                  <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>{t("District officer")}</CardTitle>
                  <CardDescription>Application review, fund disbursement, district oversight</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">{t("access_dashboard")}</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/central">
              <Card className="border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <CardHeader className="text-center">
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>{t("central/state officer")}</CardTitle>
                  <CardDescription>Policy oversight, analytics, system administration</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">{t("access_dashboard")}</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* NGO Assistance Section */}
      <section className="py-16 px-4 bg-accent/5 border-y border-border">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("ngo_assistance")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Connect with registered NGOs for additional support, guidance, and assistance throughout your compensation
              process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-border hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="text-center">
                <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>{t("twenty_four_seven_helpline")}</CardTitle>
                <CardDescription>Immediate support and guidance from trained counselors</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" variant="outline">
                  {t("call_now")} 1800-XXX-XXXX
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>{t("legal_aid")}</CardTitle>
                <CardDescription>Free legal consultation and representation services</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/ngo-assistance">
                  <Button className="w-full">{t("find_legal_aid")}</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="text-center">
                <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>{t("counseling_support")}</CardTitle>
                <CardDescription>Professional psychological support and trauma counseling</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/ngo-assistance">
                  <Button className="w-full">{t("get_support")}</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/ngo-register">
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5 mr-2" />
                {t("register_your_ngo")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-primary/20 bg-card py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-2 border-primary/20">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground text-lg">{t("dbt_management_system")}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("government_of_india")} initiative for streamlined victim compensation under PCR Act & PoA Act.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">{t("quick_links")}</h3>
              <div className="space-y-2">
                <Link href="/beneficiary" className="block text-muted-foreground hover:text-primary text-sm">
                  {t("beneficiary_portal")}
                </Link>
                <Link href="/ngo-assistance" className="block text-muted-foreground hover:text-primary text-sm">
                  {t("ngo_assistance")}
                </Link>
                <Link href="/track-application" className="block text-muted-foreground hover:text-primary text-sm">
                  {t("track_application")}
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">{t("contact_information")}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{t("helpline")}: 1800-XXX-XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{t("support_email")}: support@dbt.gov.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{t("new_delhi_india")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 {t("government_of_india")}. All rights reserved. | National Informatics Centre (NIC)
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
