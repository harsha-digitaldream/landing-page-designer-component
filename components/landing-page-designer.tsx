"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight } from "lucide-react"
import {
  CalendarIcon,
  Upload,
  Play,
  ImageIcon,
  Monitor,
  Smartphone,
  Palette,
  Bold,
  Italic,
  Underline,
  ThumbsUp,
  ThumbsDown,
  X,
  Video,
  MessageSquare,
} from "lucide-react"
import { format } from "date-fns"

/**
 * Landing Page Data Interface
 * Defines the structure of all customizable landing page elements
 */
interface LandingPageData {
  logo: string
  title: string
  titleColor: string
  description: string
  descriptionColor: string
  showDate: boolean
  selectedDate: Date | undefined
  dateColor: string
  resourceType: "video" | "image"
  resourceUrl: string
  button1: {
    show: boolean
    text: string
    url: string
    color: string
  }
  button2: {
    show: boolean
    text: string
    url: string
    color: string
  }
  background: {
    type: "solid" | "gradient"
    color: string
    gradientFrom: string
    gradientTo: string
    gradientDirection: "to-r" | "to-br" | "to-b" | "to-bl"
  }
}

/**
 * Initial Data Interface
 * Allows parent components to pre-populate specific fields
 * All fields are optional - component will use sensible defaults
 */
interface InitialLandingPageData {
  /** Logo URL - if not provided, uses placeholder */
  logo?: string
  /** Headline text - supports dynamic fields like {{first-name}} */
  title?: string
  /** Description text - supports dynamic fields like {{first-name}} */
  description?: string
  /** Primary button configuration */
  button1?: {
    text?: string
    url?: string
    color?: string
  }
  /** Secondary button configuration */
  button2?: {
    text?: string
    url?: string
    color?: string
  }
  /** Background image or video URL */
  resourceUrl?: string
  /** Resource type - 'image' or 'video' */
  resourceType?: "video" | "image"
  /** Event date for the landing page */
  selectedDate?: Date
  /** Whether to show the event date */
  showDate?: boolean
}

/**
 * Component Props Interface
 */
interface LandingPageDesignerProps {
  /** Callback fired when any data changes - use this to save/sync data */
  onDataChange?: (data: LandingPageData) => void
  /**
   * Initial data to populate the component
   * All fields are optional - component provides sensible defaults
   *
   * Example usage:
   * \`\`\`tsx
   * const initialData = {
   *   logo: "https://example.com/logo.png",
   *   title: "Welcome {{first-name}} to our event!",
   *   description: "Join us for an amazing experience, {{first-name}}.",
   *   button1: {
   *     text: "Register Now",
   *     url: "https://example.com/register"
   *   },
   *   button2: {
   *     text: "Learn More",
   *     url: "https://example.com/info"
   *   }
   * }
   * \`\`\`
   */
  initialData?: InitialLandingPageData
}

/**
 * Feedback Modal Component - Direct to Video with Text Option
 */
function FeedbackModal({
  isOpen,
  onClose,
  previewMode,
}: { isOpen: boolean; onClose: () => void; previewMode: "mobile" | "desktop" }) {
  const [feedbackType, setFeedbackType] = useState<"video" | "text">("video") // Default to video
  const [isRecording, setIsRecording] = useState(false)
  const [textFeedback, setTextFeedback] = useState("")

  if (!isOpen) return null

  const handleSubmit = () => {
    // In preview, just close and show the rating
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-lg ${previewMode === "mobile" ? "w-full max-w-sm" : "w-full max-w-md"} max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className={`font-semibold text-gray-900 ${previewMode === "mobile" ? "text-lg" : "text-xl"}`}>
            Leave a Message
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {feedbackType === "video" ? (
            /* Video recording interface - Default */
            <div className="space-y-4">
              <div className="text-center">
                <h4 className={`font-medium text-gray-900 mb-2 ${previewMode === "mobile" ? "text-base" : "text-lg"}`}>
                  Record Your Message
                </h4>
                <p className={`text-gray-600 ${previewMode === "mobile" ? "text-sm" : "text-base"}`}>
                  {isRecording ? "Recording... Tap to stop" : "Share a personal video message"}
                </p>
              </div>

              {/* Video preview area */}
              <div
                className={`bg-gray-900 rounded-lg ${previewMode === "mobile" ? "h-40" : "h-48"} flex items-center justify-center relative overflow-hidden`}
              >
                <div className="text-center text-white">
                  {isRecording ? (
                    <div className="space-y-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full mx-auto animate-pulse"></div>
                      <p className="text-sm">Recording...</p>
                      <p className="text-xs text-gray-300">00:15</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                        <Video className="w-8 h-8" />
                      </div>
                      <p className="text-sm">Camera Preview</p>
                      <p className="text-xs text-gray-300">Max 2 minutes</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Recording controls */}
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setFeedbackType("text")}
                  className={`${previewMode === "mobile" ? "text-sm" : ""} border-blue-200 text-blue-700 hover:bg-blue-50`}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Write instead
                </Button>
                <Button
                  className={`${isRecording ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"} text-white ${previewMode === "mobile" ? "text-sm" : ""}`}
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Video className="w-4 h-4 mr-2" />
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
              </div>

              {isRecording && (
                <div className="text-center">
                  <Button
                    onClick={handleSubmit}
                    className={`bg-green-600 hover:bg-green-700 text-white ${previewMode === "mobile" ? "text-sm" : ""}`}
                  >
                    Send Video Message
                  </Button>
                </div>
              )}
            </div>
          ) : (
            /* Text feedback interface */
            <div className="space-y-4">
              <div className="text-center">
                <h4 className={`font-medium text-gray-900 mb-2 ${previewMode === "mobile" ? "text-base" : "text-lg"}`}>
                  Write Your Message
                </h4>
                <p className={`text-gray-600 ${previewMode === "mobile" ? "text-sm" : "text-base"}`}>
                  Share your thoughts, feedback, or just say hello!
                </p>
              </div>

              <textarea
                value={textFeedback}
                onChange={(e) => setTextFeedback(e.target.value)}
                placeholder="Type your message here..."
                className={`w-full border border-gray-300 rounded-lg p-3 ${previewMode === "mobile" ? "h-32 text-sm" : "h-40"} resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                autoFocus
              />

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setFeedbackType("video")}
                  className={`${previewMode === "mobile" ? "text-sm" : ""} border-purple-200 text-purple-700 hover:bg-purple-50`}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Record instead
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!textFeedback.trim()}
                  className={`bg-blue-600 hover:bg-blue-700 text-white ${previewMode === "mobile" ? "text-sm" : ""}`}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Landing Page Designer Component
 *
 * A comprehensive landing page builder with live preview functionality.
 * Supports dynamic content fields, color customization, and responsive design.
 *
 * Features:
 * - Live preview (mobile/desktop)
 * - Dynamic content fields ({{field-name}} syntax)
 * - Color customization for all text elements
 * - Background customization (solid colors and gradients)
 * - Media upload (images/videos)
 * - Customizable action buttons
 * - Event date display
 *
 * @param onDataChange - Callback fired when data changes
 * @param initialData - Optional initial data to populate fields
 *
 * @example
 * \`\`\`tsx
 * // Basic usage with defaults
 * <LandingPageDesigner onDataChange={(data) => console.log(data)} />
 *
 * // With initial data
 * <LandingPageDesigner
 *   initialData={{
 *     logo: "https://example.com/logo.png",
 *     title: "Welcome {{first-name}}!",
 *     button1: { text: "Get Started", url: "/signup" }
 *   }}
 *   onDataChange={(data) => saveToDatabase(data)}
 * />
 * \`\`\`
 */
export default function LandingPageDesigner({ onDataChange, initialData }: LandingPageDesignerProps) {
  // Default values for better UX when no initial data is provided
  const defaultData: LandingPageData = {
    logo: "/placeholder.svg?height=40&width=120&text=Logo",
    title: "Hello {{first-name}}, You've Got a Special Gift!",
    titleColor: "#111827",
    description:
      "We're excited to share something special with you, {{first-name}}. Your gift is on its way, and we wanted to create this personalized experience just for you.",
    descriptionColor: "#6B7280",
    showDate: true,
    selectedDate: new Date(),
    dateColor: "#7C3AED",
    resourceType: "image",
    resourceUrl: "/placeholder.svg?height=400&width=600&text=Gift+Preview",
    button1: {
      show: true,
      text: "Track My Gift",
      url: "#",
      color: "#7C3AED",
    },
    button2: {
      show: true,
      text: "Learn More",
      url: "#",
      color: "#6B7280",
    },
    background: {
      type: "solid",
      color: "#FFFFFF",
      gradientFrom: "#7C3AED",
      gradientTo: "#A855F7",
      gradientDirection: "to-br",
    },
  }

  // Merge initial data with defaults, preserving nested objects
  const mergeInitialData = (defaults: LandingPageData, initial?: InitialLandingPageData): LandingPageData => {
    if (!initial) return defaults

    return {
      ...defaults,
      // Override simple fields if provided
      ...(initial.logo && { logo: initial.logo }),
      ...(initial.title && { title: initial.title }),
      ...(initial.description && { description: initial.description }),
      ...(initial.resourceUrl && { resourceUrl: initial.resourceUrl }),
      ...(initial.resourceType && { resourceType: initial.resourceType }),
      ...(initial.selectedDate && { selectedDate: initial.selectedDate }),
      ...(initial.showDate !== undefined && { showDate: initial.showDate }),

      // Merge button configurations
      button1: {
        ...defaults.button1,
        ...(initial.button1?.text && { text: initial.button1.text }),
        ...(initial.button1?.url && { url: initial.button1.url }),
        ...(initial.button1?.color && { color: initial.button1.color }),
      },
      button2: {
        ...defaults.button2,
        ...(initial.button2?.text && { text: initial.button2.text }),
        ...(initial.button2?.url && { url: initial.button2.url }),
        ...(initial.button2?.color && { color: initial.button2.color }),
      },
    }
  }

  // Initialize state with merged data
  const [data, setData] = useState<LandingPageData>(mergeInitialData(defaultData, initialData))
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile")
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [shouldPulse, setShouldPulse] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const [openSections, setOpenSections] = useState({
    logo: true,
    background: true,
    content: true,
    media: true,
    buttons: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Stop pulse animation after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldPulse(false)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  /**
   * Updates a top-level field in the data object
   * Automatically triggers onDataChange callback
   */
  const updateData = (field: keyof LandingPageData, value: any) => {
    const newData = { ...data, [field]: value }
    setData(newData)
    onDataChange?.(newData)
  }

  /**
   * Updates button-specific fields (button1 or button2)
   * Automatically triggers onDataChange callback
   */
  const updateButton = (buttonNum: 1 | 2, field: "show" | "text" | "url" | "color", value: any) => {
    const newData = {
      ...data,
      [`button${buttonNum}`]: {
        ...data[`button${buttonNum}`],
        [field]: value,
      },
    }
    setData(newData)
    onDataChange?.(newData)
  }

  /**
   * Updates background-specific fields
   * Automatically triggers onDataChange callback
   */
  const updateBackground = (field: keyof LandingPageData["background"], value: any) => {
    const newData = {
      ...data,
      background: {
        ...data.background,
        [field]: value,
      },
    }
    setData(newData)
    onDataChange?.(newData)
  }

  /**
   * Generates CSS styles for background based on current settings
   * Supports both solid colors and gradients
   */
  const getBackgroundStyle = () => {
    if (data.background.type === "gradient") {
      const direction = data.background.gradientDirection
      return {
        background: `linear-gradient(${direction === "to-r" ? "to right" : direction === "to-br" ? "to bottom right" : direction === "to-b" ? "to bottom" : "to bottom left"}, ${data.background.gradientFrom}, ${data.background.gradientTo})`,
      }
    }
    return {
      backgroundColor: data.background.color,
    }
  }

  /**
   * Renders text with dynamic field replacement for preview
   * Replaces {{field-name}} with sample data for demonstration
   */
  const renderDynamicText = (text: string) => {
    return text.replace(/\{\{([^}]+)\}\}/g, (match, field) => {
      // Sample data for preview - in production, this would come from actual user data
      const sampleData: Record<string, string> = {
        "first-name": "Sarah",
        "last-name": "Johnson",
        company: "Acme Corp",
        "gift-name": "Premium Package",
      }
      return sampleData[field] || `[${field}]`
    })
  }

  /**
   * Renders rich text content with dynamic field replacement for preview
   */
  const renderRichTextWithDynamicFields = (htmlContent: string) => {
    return htmlContent.replace(/\{\{([^}]+)\}\}/g, (match, field) => {
      const sampleData: Record<string, string> = {
        "first-name": "Sarah",
        "last-name": "Johnson",
        company: "Acme Corp",
        "gift-name": "Premium Package",
      }
      return sampleData[field] || `[${field}]`
    })
  }

  /**
   * Handles feedback modal close and shows rating
   */
  const handleFeedbackModalClose = () => {
    setShowFeedbackModal(false)
    setShowRating(true)
  }

  /**
   * Renders the actual landing page content
   * This is what users will see on the final landing page
   */
  const renderLandingPageContent = () => (
    <div className={`${previewMode === "mobile" ? "p-6" : "p-8"} space-y-6 min-h-full`} style={getBackgroundStyle()}>
      {/* Header with Logo */}
      <div className="flex justify-end">
        <img src={data.logo || "/placeholder.svg"} alt="Logo" className={previewMode === "mobile" ? "h-8" : "h-10"} />
      </div>

      <div className={`${previewMode === "desktop" ? "grid lg:grid-cols-2 gap-12 items-start" : "space-y-6"}`}>
        {/* Left Side - Text Content */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h1
              className={`font-bold leading-tight ${previewMode === "mobile" ? "text-xl" : "text-4xl"}`}
              style={{ color: data.titleColor }}
            >
              {renderDynamicText(data.title)}
            </h1>
            <p
              className={`leading-relaxed ${previewMode === "mobile" ? "text-sm" : "text-lg"}`}
              style={{ color: data.descriptionColor }}
              dangerouslySetInnerHTML={{ __html: renderRichTextWithDynamicFields(data.description) }}
            />
          </div>

          {/* Date Field */}
          {data.showDate && data.selectedDate && (
            <div
              className={`flex items-center gap-2 font-medium ${previewMode === "mobile" ? "text-sm" : "text-base"}`}
              style={{ color: data.dateColor }}
            >
              <CalendarIcon className={previewMode === "mobile" ? "w-4 h-4" : "w-5 h-5"} />
              {format(data.selectedDate, "MMMM d, yyyy")}
            </div>
          )}
        </div>

        {/* Right Side - Resource */}
        <div className="space-y-6">
          <div className="rounded-lg overflow-hidden bg-gray-100">
            {data.resourceType === "image" ? (
              <img
                src={data.resourceUrl || "/placeholder.svg"}
                alt="Resource"
                className={`w-full object-cover ${previewMode === "mobile" ? "h-32" : "h-64"}`}
              />
            ) : (
              <div
                className={`w-full bg-gray-900 flex items-center justify-center ${
                  previewMode === "mobile" ? "h-32" : "h-64"
                }`}
              >
                <div className="text-center text-white">
                  <Play className={`mx-auto mb-2 ${previewMode === "mobile" ? "w-8 h-8" : "w-12 h-12"}`} />
                  <p className={previewMode === "mobile" ? "text-xs" : "text-sm"}>Video Player</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {(data.button1.show || data.button2.show) && (
            <div className={`space-y-3 ${previewMode === "desktop" ? "" : ""}`}>
              {/* Primary and Secondary Buttons */}
              <div className={`${previewMode === "desktop" ? "flex flex-col sm:flex-row gap-3" : "space-y-2"}`}>
                {data.button1.show && (
                  <Button
                    className={`${previewMode === "desktop" ? "flex-1" : "w-full text-sm"} text-white hover:opacity-90`}
                    style={{ backgroundColor: data.button1.color }}
                    onClick={() => window.open(data.button1.url, "_blank")}
                  >
                    {data.button1.text}
                  </Button>
                )}
                {data.button2.show && (
                  <Button
                    className={`${previewMode === "desktop" ? "flex-1" : "w-full text-sm"} text-white hover:opacity-90`}
                    style={{ backgroundColor: data.button2.color }}
                    onClick={() => window.open(data.button2.url, "_blank")}
                  >
                    {data.button2.text}
                  </Button>
                )}
              </div>

              {/* Feedback Button - Integrated as part of CTAs */}
              {!showRating ? (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className={`${previewMode === "mobile" ? "text-sm px-4 py-2" : "px-6 py-3"} border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-colors ${
                      shouldPulse ? "animate-pulse" : ""
                    }`}
                    onClick={() => setShowFeedbackModal(true)}
                  >
                    <span className="mr-2">💌</span>
                    Leave a message for host
                  </Button>
                </div>
              ) : (
                /* Rating Section - Shown after modal closes */
                <div className="text-center space-y-3">
                  <p className={`text-gray-700 ${previewMode === "mobile" ? "text-sm" : "text-base"}`}>
                    Was this experience delightful?
                  </p>

                  {/* Like/Dislike with Lucide Icons */}
                  <div className="flex justify-center gap-6">
                    <button className="group flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-green-50 transition-colors">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <ThumbsUp className="w-5 h-5 text-green-600" />
                      </div>
                      <span
                        className={`text-green-600 font-medium ${previewMode === "mobile" ? "text-xs" : "text-sm"}`}
                      >
                        Yes
                      </span>
                    </button>

                    <button className="group flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-red-50 transition-colors">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                        <ThumbsDown className="w-5 h-5 text-red-600" />
                      </div>
                      <span className={`text-red-600 font-medium ${previewMode === "mobile" ? "text-xs" : "text-sm"}`}>
                        No
                      </span>
                    </button>
                  </div>

                  {/* Thank you message */}
                  <p className={`text-gray-500 ${previewMode === "mobile" ? "text-xs" : "text-sm"}`}>
                    Thank you for your feedback!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Show feedback button even when main buttons are hidden */}
          {!data.button1.show && !data.button2.show && (
            <div className="space-y-3">
              {!showRating ? (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className={`${previewMode === "mobile" ? "text-sm px-4 py-2" : "px-6 py-3"} border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-colors ${
                      shouldPulse ? "animate-pulse" : ""
                    }`}
                    onClick={() => setShowFeedbackModal(true)}
                  >
                    <span className="mr-2">💌</span>
                    Leave a message for host
                  </Button>
                </div>
              ) : (
                /* Rating Section - Shown after modal closes */
                <div className="text-center space-y-3">
                  <p className={`text-gray-700 ${previewMode === "mobile" ? "text-sm" : "text-base"}`}>
                    Was this experience delightful?
                  </p>

                  {/* Like/Dislike with Lucide Icons */}
                  <div className="flex justify-center gap-6">
                    <button className="group flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-green-50 transition-colors">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <ThumbsUp className="w-5 h-5 text-green-600" />
                      </div>
                      <span
                        className={`text-green-600 font-medium ${previewMode === "mobile" ? "text-xs" : "text-sm"}`}
                      >
                        Yes
                      </span>
                    </button>

                    <button className="group flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-red-50 transition-colors">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                        <ThumbsDown className="w-5 h-5 text-red-600" />
                      </div>
                      <span className={`text-red-600 font-medium ${previewMode === "mobile" ? "text-xs" : "text-sm"}`}>
                        No
                      </span>
                    </button>
                  </div>

                  {/* Thank you message */}
                  <p className={`text-gray-500 ${previewMode === "mobile" ? "text-xs" : "text-sm"}`}>
                    Thank you for your feedback!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal isOpen={showFeedbackModal} onClose={handleFeedbackModalClose} previewMode={previewMode} />
    </div>
  )

  // Fullscreen Modal
  const FullscreenModal = () => {
    if (!isFullscreen) return null

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Fullscreen Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Landing Page Preview</h2>
            <div className="flex items-center gap-1 p-0.5 bg-gray-100 rounded-md">
              <Button
                variant={previewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("mobile")}
                className={`h-7 px-3 text-sm rounded-sm ${
                  previewMode === "mobile" ? "bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90" : "hover:bg-gray-200"
                }`}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </Button>
              <Button
                variant={previewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("desktop")}
                className={`h-7 px-3 text-sm rounded-sm ${
                  previewMode === "desktop" ? "bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90" : "hover:bg-gray-200"
                }`}
              >
                <Monitor className="w-4 h-4 mr-2" />
                Desktop
              </Button>
            </div>
          </div>

          <Button variant="outline" onClick={() => setIsFullscreen(false)} className="h-8 px-3 text-sm">
            <X className="w-4 h-4 mr-2" />
            Exit Fullscreen
          </Button>
        </div>

        {/* Fullscreen Content */}
        <div className="flex-1 overflow-hidden bg-gray-50">
          {previewMode === "mobile" ? (
            /* Mobile Fullscreen View */
            <div className="h-full flex items-center justify-center p-8">
              <div className="bg-gray-900 rounded-[2rem] p-3 shadow-2xl">
                <div className="bg-white rounded-[1.5rem] overflow-hidden w-[375px] h-[667px]">
                  <div className="h-full overflow-y-auto">{renderLandingPageContent()}</div>
                </div>
              </div>
            </div>
          ) : (
            /* Desktop Fullscreen View */
            <div className="h-full p-8">
              <div className="bg-white rounded-lg overflow-hidden border shadow-lg h-full flex flex-col max-w-6xl mx-auto">
                <div className="bg-gray-100 px-4 py-3 border-b flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-white rounded px-4 py-1.5 text-sm text-gray-600 inline-block">
                      your-landing-page.com
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="max-w-5xl mx-auto">{renderLandingPageContent()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white min-h-screen">
      <div className="grid lg:grid-cols-6">
        {/* Left Panel - Customization Controls */}
        <div className="lg:col-span-2 border-r border-gray-200">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4 h-[65px] flex items-center">
            <h4 className="text-sm font-medium text-gray-900">Customize Content</h4>
          </div>

          {/* Scrollable Content */}
          <div className="h-[calc(100vh-65px)] overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Logo Section */}
              <Collapsible open={openSections.logo} onOpenChange={() => toggleSection("logo")}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-2 h-auto border-b border-gray-200 hover:bg-gray-50"
                  >
                    <Label className="text-sm font-bold text-gray-900">Logo</Label>
                    {openSections.logo ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 pt-3">
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <Input
                      placeholder="Or paste logo URL"
                      value={data.logo}
                      onChange={(e) => updateData("logo", e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Background Section */}
              <Collapsible open={openSections.background} onOpenChange={() => toggleSection("background")}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-2 h-auto border-b border-gray-200 hover:bg-gray-50"
                  >
                    <Label className="text-sm font-bold text-gray-900">Background</Label>
                    {openSections.background ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 pt-3">
                  <Tabs
                    value={data.background.type}
                    onValueChange={(value) => updateBackground("type", value as "solid" | "gradient")}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 h-7 bg-gray-100 rounded-md p-0.5">
                      <TabsTrigger
                        value="solid"
                        className="text-xs px-1 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-sm"
                      >
                        Solid
                      </TabsTrigger>
                      <TabsTrigger
                        value="gradient"
                        className="text-xs px-1 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-sm"
                      >
                        Gradient
                      </TabsTrigger>
                    </TabsList>

                    <div className="mt-2 space-y-3">
                      {data.background.type === "solid" ? (
                        <div className="space-y-2">
                          <div className="flex gap-2 items-center">
                            <div className="relative">
                              <Input
                                type="color"
                                value={data.background.color}
                                onChange={(e) => updateBackground("color", e.target.value)}
                                className="h-8 w-16 p-1 border rounded cursor-pointer"
                              />
                              <Palette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                            </div>
                            <Input
                              type="text"
                              value={data.background.color}
                              onChange={(e) => updateBackground("color", e.target.value)}
                              placeholder="#FFFFFF"
                              className="flex-1 text-xs"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label className="text-xs text-gray-600">From Color</Label>
                            <div className="flex gap-2 items-center">
                              <div className="relative">
                                <Input
                                  type="color"
                                  value={data.background.gradientFrom}
                                  onChange={(e) => updateBackground("gradientFrom", e.target.value)}
                                  className="h-8 w-16 p-1 border rounded cursor-pointer"
                                />
                                <Palette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                              </div>
                              <Input
                                type="text"
                                value={data.background.gradientFrom}
                                onChange={(e) => updateBackground("gradientFrom", e.target.value)}
                                placeholder="#7C3AED"
                                className="flex-1 text-xs"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs text-gray-600">To Color</Label>
                            <div className="flex gap-2 items-center">
                              <div className="relative">
                                <Input
                                  type="color"
                                  value={data.background.gradientTo}
                                  onChange={(e) => updateBackground("gradientTo", e.target.value)}
                                  className="h-8 w-16 p-1 border rounded cursor-pointer"
                                />
                                <Palette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                              </div>
                              <Input
                                type="text"
                                value={data.background.gradientTo}
                                onChange={(e) => updateBackground("gradientTo", e.target.value)}
                                placeholder="#A855F7"
                                className="flex-1 text-xs"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs text-gray-600">Direction</Label>
                            <select
                              value={data.background.gradientDirection}
                              onChange={(e) => updateBackground("gradientDirection", e.target.value)}
                              className="w-full text-xs border rounded px-2 py-1.5 bg-white"
                            >
                              <option value="to-r">Left to Right</option>
                              <option value="to-br">Top Left to Bottom Right</option>
                              <option value="to-b">Top to Bottom</option>
                              <option value="to-bl">Top Right to Bottom Left</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </Tabs>
                </CollapsibleContent>
              </Collapsible>

              {/* Content Section */}
              <Collapsible open={openSections.content} onOpenChange={() => toggleSection("content")}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-2 h-auto border-b border-gray-200 hover:bg-gray-50"
                  >
                    <Label className="text-sm font-bold text-gray-900">Content</Label>
                    {openSections.content ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 pt-3">
                  {/* Headline Section */}
                  <div>
                    <Label htmlFor="title" className="text-xs text-gray-600">
                      Headline
                    </Label>
                    <div className="mt-1 space-y-2">
                      <Input
                        id="title"
                        value={data.title}
                        onChange={(e) => updateData("title", e.target.value)}
                        className="text-xs"
                        placeholder="Hello {{first-name}}, you've got a gift!"
                      />

                      {/* Dynamic Field Quick-Add Buttons */}
                      <div className="flex flex-wrap gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => updateData("title", data.title + "{{first-name}}")}
                        >
                          + First Name
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => updateData("title", data.title + "{{last-name}}")}
                        >
                          + Last Name
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => updateData("title", data.title + "{{company}}")}
                        >
                          + Company
                        </Button>
                      </div>

                      {/* Title Color Picker */}
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-600">Headline Color</Label>
                        <div className="flex gap-2 items-center">
                          <div className="relative">
                            <Input
                              type="color"
                              value={data.titleColor}
                              onChange={(e) => updateData("titleColor", e.target.value)}
                              className="h-8 w-12 p-1 border rounded cursor-pointer"
                            />
                            <Palette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                          </div>
                          <Input
                            type="text"
                            value={data.titleColor}
                            onChange={(e) => updateData("titleColor", e.target.value)}
                            placeholder="#111827"
                            className="flex-1 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description Section with Rich Text Editor */}
                  <div>
                    <Label htmlFor="description" className="text-xs text-gray-600">
                      Description
                    </Label>
                    <div className="mt-1 space-y-2">
                      {/* Rich Text Editor Toolbar - Make it more visible */}
                      <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50 border-gray-300">
                        <span className="text-xs text-gray-500 mr-2">Format:</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0 border-gray-300"
                          onMouseDown={(e) => {
                            e.preventDefault()
                            document.execCommand("bold", false)
                          }}
                          title="Bold (Ctrl+B)"
                        >
                          <Bold className="w-3 h-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0 border-gray-300"
                          onMouseDown={(e) => {
                            e.preventDefault()
                            document.execCommand("italic", false)
                          }}
                          title="Italic (Ctrl+I)"
                        >
                          <Italic className="w-3 h-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0 border-gray-300"
                          onMouseDown={(e) => {
                            e.preventDefault()
                            document.execCommand("underline", false)
                          }}
                          title="Underline (Ctrl+U)"
                        >
                          <Underline className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Rich Text Editor */}
                      <div
                        contentEditable
                        className="min-h-[80px] p-3 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                        onInput={(e) => {
                          const content = e.currentTarget.innerHTML
                          updateData("description", content)
                        }}
                        onKeyDown={(e) => {
                          // Add keyboard shortcuts
                          if (e.ctrlKey || e.metaKey) {
                            switch (e.key.toLowerCase()) {
                              case "b":
                                e.preventDefault()
                                document.execCommand("bold", false)
                                break
                              case "i":
                                e.preventDefault()
                                document.execCommand("italic", false)
                                break
                              case "u":
                                e.preventDefault()
                                document.execCommand("underline", false)
                                break
                            }
                          }
                        }}
                        placeholder="We're excited to share something special with you..."
                        style={{
                          minHeight: "80px",
                          lineHeight: "1.5",
                        }}
                      />

                      {/* Dynamic Field Quick-Add Buttons for Description */}
                      <div className="flex flex-wrap gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => {
                            const editor = document.querySelector("[contenteditable]") as HTMLElement
                            if (editor) {
                              const selection = window.getSelection()
                              if (selection && selection.rangeCount > 0) {
                                const range = selection.getRangeAt(0)
                                const textNode = document.createTextNode("{{first-name}}")
                                range.insertNode(textNode)
                                range.setStartAfter(textNode)
                                range.setEndAfter(textNode)
                                selection.removeAllRanges()
                                selection.addRange(range)
                                updateData("description", editor.innerHTML)
                              }
                            }
                          }}
                        >
                          + First Name
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => {
                            const editor = document.querySelector("[contenteditable]") as HTMLElement
                            if (editor) {
                              const selection = window.getSelection()
                              if (selection && selection.rangeCount > 0) {
                                const range = selection.getRangeAt(0)
                                const textNode = document.createTextNode("{{last-name}}")
                                range.insertNode(textNode)
                                range.setStartAfter(textNode)
                                range.setEndAfter(textNode)
                                selection.removeAllRanges()
                                selection.addRange(range)
                                updateData("description", editor.innerHTML)
                              }
                            }
                          }}
                        >
                          + Last Name
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => {
                            const editor = document.querySelector("[contenteditable]") as HTMLElement
                            if (editor) {
                              const selection = window.getSelection()
                              if (selection && selection.rangeCount > 0) {
                                const range = selection.getRangeAt(0)
                                const textNode = document.createTextNode("{{company}}")
                                range.insertNode(textNode)
                                range.setStartAfter(textNode)
                                range.setEndAfter(textNode)
                                selection.removeAllRanges()
                                selection.addRange(range)
                                updateData("description", editor.innerHTML)
                              }
                            }
                          }}
                        >
                          + Company
                        </Button>
                      </div>

                      {/* Description Color Picker */}
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-600">Description Color</Label>
                        <div className="flex gap-2 items-center">
                          <div className="relative">
                            <Input
                              type="color"
                              value={data.descriptionColor}
                              onChange={(e) => updateData("descriptionColor", e.target.value)}
                              className="h-8 w-12 p-1 border rounded cursor-pointer"
                            />
                            <Palette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                          </div>
                          <Input
                            type="text"
                            value={data.descriptionColor}
                            onChange={(e) => updateData("descriptionColor", e.target.value)}
                            placeholder="#6B7280"
                            className="flex-1 text-xs"
                          />
                        </div>
                      </div>

                      {/* Helper Text */}
                      <p className="text-xs text-gray-500">
                        Select text and use toolbar buttons for formatting. Use Ctrl+B, Ctrl+I, Ctrl+U shortcuts.
                      </p>
                    </div>
                  </div>

                  {/* Date Field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-gray-600">Event Date</Label>
                      <Switch checked={data.showDate} onCheckedChange={(checked) => updateData("showDate", checked)} />
                    </div>
                    {data.showDate && (
                      <div className="space-y-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal size=sm h-7 text-xs"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {data.selectedDate ? format(data.selectedDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={data.selectedDate}
                              onSelect={(date) => updateData("selectedDate", date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        {/* Date Color Picker */}
                        <div className="space-y-1">
                          <Label className="text-xs text-gray-600">Date Color</Label>
                          <div className="flex gap-2 items-center">
                            <div className="relative">
                              <Input
                                type="color"
                                value={data.dateColor}
                                onChange={(e) => updateData("dateColor", e.target.value)}
                                className="h-8 w-12 p-1 border rounded cursor-pointer"
                              />
                              <Palette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                            </div>
                            <Input
                              type="text"
                              value={data.dateColor}
                              onChange={(e) => updateData("dateColor", e.target.value)}
                              placeholder="#7C3AED"
                              className="flex-1 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Media Section */}
              <Collapsible open={openSections.media} onOpenChange={() => toggleSection("media")}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-2 h-auto border-b border-gray-200 hover:bg-gray-50"
                  >
                    <Label className="text-sm font-bold text-gray-900">Media</Label>
                    {openSections.media ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 pt-3">
                  <Tabs
                    value={data.resourceType}
                    onValueChange={(value) => updateData("resourceType", value as "video" | "image")}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 h-7 bg-gray-100 rounded-md p-0.5">
                      <TabsTrigger
                        value="image"
                        className="text-xs px-1 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-sm"
                      >
                        <ImageIcon className="w-4 h-4 mr-1" />
                        Image
                      </TabsTrigger>
                      <TabsTrigger
                        value="video"
                        className="text-xs px-1 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-sm"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Video
                      </TabsTrigger>
                    </TabsList>

                    <div className="mt-2 space-y-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload {data.resourceType}
                      </Button>
                      <Input
                        placeholder={`${data.resourceType} URL`}
                        value={data.resourceUrl}
                        onChange={(e) => updateData("resourceUrl", e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </Tabs>
                </CollapsibleContent>
              </Collapsible>

              {/* Action Buttons Section */}
              <Collapsible open={openSections.buttons} onOpenChange={() => toggleSection("buttons")}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-2 h-auto border-b border-gray-200 hover:bg-gray-50"
                  >
                    <Label className="text-sm font-bold text-gray-900">Action Buttons</Label>
                    {openSections.buttons ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 pt-3">
                  {/* Primary Button */}
                  <div className="space-y-2 border-b border-gray-100 pb-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-gray-600">Primary Button</Label>
                      <Switch
                        checked={data.button1.show}
                        onCheckedChange={(checked) => updateButton(1, "show", checked)}
                      />
                    </div>

                    {data.button1.show && (
                      <>
                        <Input
                          placeholder="Button text"
                          value={data.button1.text}
                          onChange={(e) => updateButton(1, "text", e.target.value)}
                          className="text-xs"
                        />
                        <Input
                          placeholder="Button URL"
                          value={data.button1.url}
                          onChange={(e) => updateButton(1, "url", e.target.value)}
                          className="text-xs"
                        />
                        <div className="flex gap-2 items-center">
                          <div className="relative">
                            <Input
                              type="color"
                              value={data.button1.color}
                              onChange={(e) => updateButton(1, "color", e.target.value)}
                              className="h-7 w-12 p-1 border rounded cursor-pointer"
                            />
                            <Palette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                          </div>
                          <Input
                            type="text"
                            value={data.button1.color}
                            onChange={(e) => updateButton(1, "color", e.target.value)}
                            placeholder="#7C3AED"
                            className="flex-1 text-xs"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Secondary Button */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-gray-600">Secondary Button</Label>
                      <Switch
                        checked={data.button2.show}
                        onCheckedChange={(checked) => updateButton(2, "show", checked)}
                      />
                    </div>

                    {data.button2.show && (
                      <>
                        <Input
                          placeholder="Button text"
                          value={data.button2.text}
                          onChange={(e) => updateButton(2, "text", e.target.value)}
                          className="text-xs"
                        />
                        <Input
                          placeholder="Button URL"
                          value={data.button2.url}
                          onChange={(e) => updateButton(2, "url", e.target.value)}
                          className="text-xs"
                        />
                        <div className="flex gap-2 items-center">
                          <div className="relative">
                            <Input
                              type="color"
                              value={data.button2.color}
                              onChange={(e) => updateButton(2, "color", e.target.value)}
                              className="h-7 w-12 p-1 border rounded cursor-pointer"
                            />
                            <Palette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                          </div>
                          <Input
                            type="text"
                            value={data.button2.color}
                            onChange={(e) => updateButton(2, "color", e.target.value)}
                            placeholder="#6B7280"
                            className="flex-1 text-xs"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
        {/* Right Panel - Live Preview */}
        <div className="lg:col-span-4 flex flex-col">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4 h-[65px] flex items-center">
            <div className="flex items-center justify-between w-full">
              <h4 className="text-sm font-medium text-gray-900">Live Preview</h4>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 p-0.5 bg-gray-100 rounded-md">
                  <Button
                    variant={previewMode === "mobile" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewMode("mobile")}
                    className={`h-6 px-2 text-xs rounded-sm ${
                      previewMode === "mobile" ? "bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90" : "hover:bg-gray-200"
                    }`}
                  >
                    <Smartphone className="w-3 h-3 mr-1" />
                    Mobile
                  </Button>
                  <Button
                    variant={previewMode === "desktop" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewMode("desktop")}
                    className={`h-6 px-2 text-xs rounded-sm ${
                      previewMode === "desktop" ? "bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90" : "hover:bg-gray-200"
                    }`}
                  >
                    <Monitor className="w-3 h-3 mr-1" />
                    Desktop
                  </Button>
                </div>

                {/* Fullscreen Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFullscreen(true)}
                  className="h-6 px-2 text-xs border-gray-300 hover:bg-gray-50"
                  title="View Fullscreen"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                  Fullscreen
                </Button>
              </div>
            </div>
          </div>

          {/* Fixed Preview Content */}
          <div className="flex-1 p-4">
            {/* Preview Container */}
            <Card className="border-0 shadow-sm h-full">
              <CardContent className="p-0 h-full">
                {previewMode === "mobile" ? (
                  /* Mobile Preview Frame */
                  <div className="flex justify-center items-center p-6 h-full">
                    <div className="bg-gray-900 rounded-[2rem] p-2 max-w-sm">
                      <div className="bg-white rounded-[1.5rem] overflow-hidden">{renderLandingPageContent()}</div>
                    </div>
                  </div>
                ) : (
                  /* Desktop Preview */
                  <div className="bg-white rounded-lg overflow-hidden border h-full flex flex-col">
                    <div className="bg-gray-100 px-4 py-2 border-b flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="bg-white rounded px-3 py-1 text-xs text-gray-600 inline-block">
                          your-landing-page.com
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <div className="max-w-5xl mx-auto">{renderLandingPageContent()}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <p className="text-center text-xs text-gray-500 mt-4">
              {previewMode === "mobile" ? "Mobile" : "Desktop"} Preview - Updates in real-time
            </p>
          </div>
        </div>
      </div>
      <FullscreenModal />
    </div>
  )
}

// Export types for external use
export type { LandingPageData, InitialLandingPageData }
