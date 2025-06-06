"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, Play, ImageIcon, Monitor, Smartphone } from "lucide-react"
import { format } from "date-fns"

interface LandingPageData {
  logo: string
  title: string
  description: string
  showDate: boolean
  selectedDate: Date | undefined
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

export default function LandingPageDesigner() {
  const [data, setData] = useState<LandingPageData>({
    logo: "/placeholder.svg?height=40&width=120&text=Logo",
    title: "You've Got a Special Gift!",
    description:
      "We're excited to share something special with you. Your gift is on its way, and we wanted to create this personalized experience just for you.",
    showDate: true,
    selectedDate: new Date(),
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
  })

  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile")

  const updateData = (field: keyof LandingPageData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const updateButton = (buttonNum: 1 | 2, field: "show" | "text" | "url" | "color", value: any) => {
    setData((prev) => ({
      ...prev,
      [`button${buttonNum}`]: {
        ...prev[`button${buttonNum}`],
        [field]: value,
      },
    }))
  }

  const updateBackground = (field: keyof LandingPageData["background"], value: any) => {
    setData((prev) => ({
      ...prev,
      background: {
        ...prev.background,
        [field]: value,
      },
    }))
  }

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
              className={`font-bold text-gray-900 leading-tight ${previewMode === "mobile" ? "text-xl" : "text-4xl"}`}
            >
              {data.title}
            </h1>
            <p className={`text-gray-600 leading-relaxed ${previewMode === "mobile" ? "text-sm" : "text-lg"}`}>
              {data.description}
            </p>
          </div>

          {/* Date Field */}
          {data.showDate && data.selectedDate && (
            <div
              className={`flex items-center gap-2 text-violet-600 font-medium ${
                previewMode === "mobile" ? "text-sm" : "text-base"
              }`}
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
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">3. Design Landing Page Experience</h3>
        <p className="text-sm text-gray-600">
          Create the page recipients will see when they scan the QR code on their postcard.
        </p>
      </div>

      {/* Main Content - Split Layout */}
      <div className="grid lg:grid-cols-6 gap-8">
        {/* Left Panel - Customization Controls */}
        <div className="lg:col-span-2">
          <div className="h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3 px-4 pt-4">
                <CardTitle className="text-sm font-medium">Customize Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-4 pb-4">
                {/* Logo Section */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-700">Logo</Label>
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
                </div>

                {/* Text Content */}
                <div className="space-y-3">
                  <Label className="text-xs font-medium text-gray-700">Content</Label>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="title" className="text-xs text-gray-600">
                        Headline
                      </Label>
                      <Input
                        id="title"
                        value={data.title}
                        onChange={(e) => updateData("title", e.target.value)}
                        className="mt-1 text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-xs text-gray-600">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => updateData("description", e.target.value)}
                        className="mt-1 text-xs min-h-[60px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Background Section */}
                <div className="space-y-3">
                  <Label className="text-xs font-medium text-gray-700">Background</Label>
                  <Tabs
                    value={data.background.type}
                    onValueChange={(value) => updateBackground("type", value as "solid" | "gradient")}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="solid" className="text-xs px-1">
                        Solid
                      </TabsTrigger>
                      <TabsTrigger value="gradient" className="text-xs px-1">
                        Gradient
                      </TabsTrigger>
                    </TabsList>

                    <div className="mt-2 space-y-3">
                      {data.background.type === "solid" ? (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={data.background.color}
                              onChange={(e) => updateBackground("color", e.target.value)}
                              className="h-8 w-16 p-1 border rounded"
                            />
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
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={data.background.gradientFrom}
                                onChange={(e) => updateBackground("gradientFrom", e.target.value)}
                                className="h-8 w-16 p-1 border rounded"
                              />
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
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={data.background.gradientTo}
                                onChange={(e) => updateBackground("gradientTo", e.target.value)}
                                className="h-8 w-16 p-1 border rounded"
                              />
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
                </div>

                {/* Date Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-gray-700">Event Date</Label>
                    <Switch checked={data.showDate} onCheckedChange={(checked) => updateData("showDate", checked)} />
                  </div>
                  {data.showDate && (
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
                  )}
                </div>

                {/* Resource Section */}
                <div className="space-y-3">
                  <Label className="text-xs font-medium text-gray-700">Media</Label>
                  <Tabs
                    value={data.resourceType}
                    onValueChange={(value) => updateData("resourceType", value as "video" | "image")}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="image" className="text-xs px-1">
                        <ImageIcon className="w-4 h-4 mr-1" />
                        Image
                      </TabsTrigger>
                      <TabsTrigger value="video" className="text-xs px-1">
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
                </div>

                {/* Buttons Section */}
                <div className="space-y-3">
                  <Label className="text-xs font-medium text-gray-700">Action Buttons</Label>

                  {/* Primary Button */}
                  <div className="space-y-2 border-b pb-3">
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
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={data.button1.color}
                            onChange={(e) => updateButton(1, "color", e.target.value)}
                            className="h-7 w-12 p-1 border rounded"
                          />
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
                  <div className="space-y-2 pt-1">
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
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={data.button2.color}
                            onChange={(e) => updateButton(2, "color", e.target.value)}
                            className="h-7 w-12 p-1 border rounded"
                          />
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="lg:col-span-4 space-y-4">
          {/* Preview Controls */}
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Live Preview</Label>
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
              <Button
                variant={previewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("mobile")}
                className="h-8 px-3"
              >
                <Smartphone className="w-4 h-4 mr-1" />
                Mobile
              </Button>
              <Button
                variant={previewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("desktop")}
                className="h-8 px-3"
              >
                <Monitor className="w-4 h-4 mr-1" />
                Desktop
              </Button>
            </div>
          </div>

          {/* Preview Container */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {previewMode === "mobile" ? (
                /* Mobile Preview Frame */
                <div className="flex justify-center p-6">
                  <div className="bg-gray-900 rounded-[2rem] p-2 max-w-sm">
                    <div className="bg-white rounded-[1.5rem] overflow-hidden">{renderLandingPageContent()}</div>
                  </div>
                </div>
              ) : (
                /* Desktop Preview */
                <div className="bg-white rounded-lg overflow-hidden border">
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
                  <div className="max-w-5xl mx-auto">{renderLandingPageContent()}</div>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-center text-xs text-gray-500">
            {previewMode === "mobile" ? "Mobile" : "Desktop"} Preview - Updates in real-time
          </p>
        </div>
      </div>

      {/* Info Note */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white text-xs font-bold">i</span>
        </div>
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Landing Page Preview</p>
          <p>
            Recipients will see this page when they scan the QR code on their postcard. Most recipients will view on
            mobile devices, but the page works on all screen sizes.
          </p>
        </div>
      </div>
    </div>
  )
}
