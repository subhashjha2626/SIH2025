"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = {
  code: string
  name: string
  nativeName: string
}

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (languageCode: string) => void
  t: (key: string) => string
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
]

const translations: Record<string, Record<string, string>> = {
  en: {
    dbt_management_system: "DBT Management System",
    government_of_india: "Government of India",
    beneficiary_portal: "Beneficiary Portal",
    admin_access: "Admin Access",
    direct_benefit_transfer: "Direct Benefit Transfer",
    management_system: "Management System",
    system_features: "System Features",
    access_your_portal: "Access Your Portal",
    ngo_assistance: "NGO Assistance & Support",
    quick_links: "Quick Links",
    contact_information: "Contact Information",
    welcome: "Welcome",
    dashboard: "Dashboard",
    applications: "Applications",
    status: "Status",
    help: "Help",
    logout: "Logout",
    login: "Login",
    register: "Register",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    search: "Search",
    filter: "Filter",
    export: "Export",
    print: "Print",
    download: "Download",
    upload: "Upload",
    back: "Back",
    next: "Next",
    previous: "Previous",
    home: "Home",
    about: "About",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
  },
  hi: {
    dbt_management_system: "DBT प्रबंधन प्रणाली",
    government_of_india: "भारत सरकार",
    beneficiary_portal: "लाभार्थी पोर्टल",
    admin_access: "Admin Access", // Keep in English
    direct_benefit_transfer: "Direct Benefit Transfer", // Keep in English
    management_system: "Management System", // Keep in English
    system_features: "System Features", // Keep in English
    access_your_portal: "अपना पोर्टल एक्सेस करें",
    ngo_assistance: "NGO सहायता और समर्थन",
    quick_links: "Quick Links", // Keep in English
    contact_information: "संपर्क जानकारी",
    welcome: "स्वागत",
    dashboard: "Dashboard", // Keep in English
    applications: "आवेदन",
    status: "स्थिति",
    help: "सहायता",
    logout: "Logout", // Keep in English
    login: "Login", // Keep in English
    register: "पंजीकरण",
    submit: "जमा करें",
    cancel: "रद्द करें",
    save: "Save", // Keep in English
    edit: "Edit", // Keep in English
    delete: "Delete", // Keep in English
    view: "देखें",
    search: "खोजें",
    filter: "Filter", // Keep in English
    export: "Export", // Keep in English
    print: "Print", // Keep in English
    download: "Download", // Keep in English
    upload: "Upload", // Keep in English
    back: "वापस",
    next: "अगला",
    previous: "पिछला",
    home: "होम",
    about: "About", // Keep in English
    contact: "संपर्क",
    privacy: "Privacy Policy", // Keep in English
    terms: "Terms & Conditions", // Keep in English
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguageCode, setCurrentLanguageCode] = useState("en")

  const currentLanguage = languages.find((lang) => lang.code === currentLanguageCode) || languages[0]

  const setLanguage = (languageCode: string) => {
    console.log(`[v0] Language changed to: ${languageCode}`)
    setCurrentLanguageCode(languageCode)
  }

  const t = (key: string): string => {
    return translations[currentLanguageCode]?.[key] || translations.en[key] || key
  }

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
