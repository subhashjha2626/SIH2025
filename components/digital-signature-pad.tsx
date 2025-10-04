"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PenTool, RotateCcw, Download, Check } from "lucide-react"

export function DigitalSignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.strokeStyle = "#1e40af"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.lineTo(x, y)
    ctx.stroke()
    setHasSignature(true)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
    setIsVerified(false)
  }

  const verifySignature = () => {
    // Mock verification process
    setTimeout(() => {
      setIsVerified(true)
    }, 1000)
  }

  const downloadSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "digital-signature.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PenTool className="h-5 w-5" />
          Digital Signature
          {isVerified && (
            <Badge variant="secondary" className="text-green-600">
              <Check className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-2">
          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            className="w-full h-32 cursor-crosshair bg-white rounded"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={clearSignature} disabled={!hasSignature}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Clear
          </Button>

          <Button variant="outline" size="sm" onClick={verifySignature} disabled={!hasSignature || isVerified}>
            <Check className="h-4 w-4 mr-1" />
            Verify
          </Button>

          <Button variant="outline" size="sm" onClick={downloadSignature} disabled={!hasSignature}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">Sign above to digitally authenticate your application</p>
      </CardContent>
    </Card>
  )
}
