"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Accessibility, ZoomIn, ZoomOut, Type, Contrast, Eye, Keyboard } from "lucide-react"

export function AccessibilityToolbar() {
  const [fontSize, setFontSize] = useState([100])
  const [contrast, setContrast] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  const [keyboardNav, setKeyboardNav] = useState(false)

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize[0] + 10, 150)
    setFontSize([newSize])
    document.documentElement.style.fontSize = `${newSize}%`
  }

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize[0] - 10, 80)
    setFontSize([newSize])
    document.documentElement.style.fontSize = `${newSize}%`
  }

  const resetFontSize = () => {
    setFontSize([100])
    document.documentElement.style.fontSize = "100%"
  }

  const toggleHighContrast = () => {
    setContrast(!contrast)
    document.documentElement.classList.toggle("high-contrast", !contrast)
  }

  const toggleFocusMode = () => {
    setFocusMode(!focusMode)
    document.documentElement.classList.toggle("focus-mode", !focusMode)
  }

  const toggleKeyboardNav = () => {
    setKeyboardNav(!keyboardNav)
    document.documentElement.classList.toggle("keyboard-nav", !keyboardNav)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Accessibility options">
          <Accessibility className="h-4 w-4" />
          <span className="sr-only">Accessibility Options</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Accessibility className="h-4 w-4" />
              Accessibility Options
            </CardTitle>
            <CardDescription>Customize the interface for better accessibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Font Size Controls */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Font Size
                </label>
                <Badge variant="outline">{fontSize[0]}%</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={decreaseFontSize} aria-label="Decrease font size">
                  <ZoomOut className="h-3 w-3" />
                </Button>
                <Slider
                  value={fontSize}
                  onValueChange={(value) => {
                    setFontSize(value)
                    document.documentElement.style.fontSize = `${value[0]}%`
                  }}
                  max={150}
                  min={80}
                  step={10}
                  className="flex-1"
                  aria-label="Font size"
                />
                <Button variant="outline" size="sm" onClick={increaseFontSize} aria-label="Increase font size">
                  <ZoomIn className="h-3 w-3" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" onClick={resetFontSize} className="w-full">
                Reset to Default
              </Button>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                High Contrast
              </label>
              <Button
                variant={contrast ? "default" : "outline"}
                size="sm"
                onClick={toggleHighContrast}
                aria-pressed={contrast}
              >
                {contrast ? "On" : "Off"}
              </Button>
            </div>

            {/* Focus Mode */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Focus Mode
              </label>
              <Button
                variant={focusMode ? "default" : "outline"}
                size="sm"
                onClick={toggleFocusMode}
                aria-pressed={focusMode}
              >
                {focusMode ? "On" : "Off"}
              </Button>
            </div>

            {/* Keyboard Navigation */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Keyboard className="h-4 w-4" />
                Enhanced Keyboard Nav
              </label>
              <Button
                variant={keyboardNav ? "default" : "outline"}
                size="sm"
                onClick={toggleKeyboardNav}
                aria-pressed={keyboardNav}
              >
                {keyboardNav ? "On" : "Off"}
              </Button>
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Use Tab to navigate, Enter to select, and Escape to close dialogs. Screen reader compatible.
              </p>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
