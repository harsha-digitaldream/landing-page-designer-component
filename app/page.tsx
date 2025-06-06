"use client"

import LandingPageDesigner, {
  type LandingPageData,
  type InitialLandingPageData,
} from "@/components/landing-page-designer"

export default function Page() {
  /**
   * Example of how to use the LandingPageDesigner component with initial data
   * All fields in initialData are optional - component provides sensible defaults
   */

  // Example 1: Basic usage with no initial data (uses defaults)
  const handleDataChange = (data: LandingPageData) => {
    console.log("Landing page data updated:", data)
    // Here you would typically save to database, update state, etc.
    // Example: await saveLandingPageData(data)
  }

  // Example 2: Pre-populate with campaign data
  const campaignInitialData: InitialLandingPageData = {
    logo: "https://example.com/campaign-logo.png",
    title: "Welcome {{first-name}} to our exclusive event!",
    description:
      "Join us for an amazing experience tailored just for you, {{first-name}}. We can't wait to see you there!",
    button1: {
      text: "Register Now",
      url: "https://example.com/register",
      color: "#7C3AED",
    },
    button2: {
      text: "Learn More",
      url: "https://example.com/info",
      color: "#6B7280",
    },
    resourceUrl: "https://example.com/event-image.jpg",
    resourceType: "image",
    selectedDate: new Date("2024-12-25"),
    showDate: true,
  }

  // Example 3: Minimal initial data (only override what you need)
  const minimalInitialData: InitialLandingPageData = {
    title: "Special offer for {{company}} employees!",
    button1: {
      text: "Claim Offer",
      url: "/claim-offer",
    },
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Landing Page Designer</h1>
          <p className="text-gray-600">Create beautiful, personalized landing pages with live preview</p>
        </div>

        {/* Example 1: Default usage */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Example 1: Default Configuration</h2>
          <LandingPageDesigner onDataChange={handleDataChange} />
        </div>

        {/* Uncomment to see other examples */}
        {/* 
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Example 2: Pre-populated Campaign</h2>
          <LandingPageDesigner 
            initialData={campaignInitialData}
            onDataChange={handleDataChange} 
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Example 3: Minimal Override</h2>
          <LandingPageDesigner 
            initialData={minimalInitialData}
            onDataChange={handleDataChange} 
          />
        </div>
        */}
      </div>
    </div>
  )
}
