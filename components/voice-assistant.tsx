"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, VolumeX, MessageCircle } from "lucide-react"

interface VoiceAssistantProps {
  userRole?: "beneficiary" | "police" | "collector" | "central"
}

export function VoiceAssistant({ userRole = "beneficiary" }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== "undefined") {
      setIsSupported("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    }
  }, [])

  const startListening = () => {
    if (!isSupported) return

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript("")
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setTranscript(transcript)
      processVoiceCommand(transcript)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()
    let responseText = ""

    // Basic command processing based on user role
    if (userRole === "beneficiary") {
      if (lowerCommand.includes("application") || lowerCommand.includes("apply")) {
        responseText =
          "I can help you with your compensation application. You can check your application status, submit new applications, or track existing ones."
      } else if (lowerCommand.includes("status") || lowerCommand.includes("track")) {
        responseText =
          "To check your application status, please provide your application ID or use the tracking section in your dashboard."
      } else if (lowerCommand.includes("help") || lowerCommand.includes("support")) {
        responseText =
          "I can assist you with applications, status tracking, document uploads, and grievance filing. What would you like help with?"
      } else {
        responseText =
          "I understand you said: " + command + ". How can I help you with your compensation application today?"
      }
    } else {
      if (lowerCommand.includes("case") || lowerCommand.includes("cases")) {
        responseText =
          "I can help you manage cases, update statuses, and generate reports. What specific case information do you need?"
      } else if (lowerCommand.includes("report") || lowerCommand.includes("statistics")) {
        responseText =
          "I can help you generate reports and view statistics. Would you like monthly reports, performance metrics, or case summaries?"
      } else {
        responseText = "I understand you said: " + command + ". How can I assist you with your dashboard today?"
      }
    }

    setResponse(responseText)
    speakResponse(responseText)
  }

  const speakResponse = (text: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  if (!isSupported) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <MessageCircle className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Voice assistant not supported in this browser</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Voice Assistant
        </CardTitle>
        <CardDescription>Click the microphone to ask questions or get help</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            variant={isListening ? "destructive" : "default"}
            size="sm"
            onClick={isListening ? stopListening : startListening}
            disabled={isSpeaking}
          >
            {isListening ? (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-2" />
                Start Listening
              </>
            )}
          </Button>

          {isSpeaking && (
            <Button variant="outline" size="sm" onClick={stopSpeaking}>
              <VolumeX className="h-4 w-4 mr-2" />
              Stop Speaking
            </Button>
          )}

          {isListening && (
            <Badge variant="secondary" className="animate-pulse">
              Listening...
            </Badge>
          )}

          {isSpeaking && (
            <Badge variant="default" className="animate-pulse">
              <Volume2 className="h-3 w-3 mr-1" />
              Speaking
            </Badge>
          )}
        </div>

        {transcript && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-1">You said:</p>
            <p className="text-sm text-muted-foreground">"{transcript}"</p>
          </div>
        )}

        {response && (
          <div className="p-3 bg-primary/10 rounded-lg">
            <p className="text-sm font-medium mb-1">Assistant:</p>
            <p className="text-sm">{response}</p>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p>Try saying:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            {userRole === "beneficiary" ? (
              <>
                <li>"Check my application status"</li>
                <li>"How do I apply for compensation?"</li>
                <li>"Help me with my documents"</li>
              </>
            ) : (
              <>
                <li>"Show me pending cases"</li>
                <li>"Generate monthly report"</li>
                <li>"What are my statistics?"</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
