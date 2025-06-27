"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, MessageCircle, Phone, MapPin, Mail, Info } from "lucide-react"

export default function DelightCardLanding() {
  const [showHeartbeat, setShowHeartbeat] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeartbeat(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleSaveVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Alex Johnson
ORG:Delightloop
TITLE:Senior Product Designer
TEL:+1-555-0123
EMAIL:alex@delightloop.com
URL:https://linkedin.com/in/alexjohnson
ADR:;;123 Innovation Drive;San Francisco;CA;94105;USA
END:VCARD`

    const blob = new Blob([vCardData], { type: "text/vcard" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "alex-johnson.vcf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-0 md:py-8">
      <div className="w-full md:max-w-sm mx-auto bg-white rounded-none md:rounded-2xl shadow-none md:shadow-xl border-0 md:border border-gray-200 overflow-hidden relative">
        {/* Cover Section */}
        <div className="relative bg-gradient-to-br from-violet-400 via-purple-400 to-indigo-500 overflow-hidden h-40">
          {/* Animated background elements - lighter */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/3 to-transparent rounded-full blur-2xl"></div>
          </div>

          {/* Alert/Highlight Message - Centered */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-full px-4">
            <a
              href="#" // Replace with actual link
              className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm font-medium hover:bg-white/30 transition-colors duration-200 text-center"
            >
              <Info className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">New feature: Check out our latest updates!</span>
            </a>
          </div>
        </div>

        {/* Profile Image */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-30">
          <div className="relative w-32 h-32">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Alex Johnson"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-white rounded-full p-2 shadow-lg">
              <Image
                src="/delightloop-logo.png"
                alt="Delightloop"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4">
          {/* Profile Info Card */}
          <Card className="bg-gradient-to-r from-violet-50 to-purple-50 backdrop-blur-sm border border-violet-100/50 shadow-sm mb-6 pt-16 rounded-xl">
            <CardContent className="p-4 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Alex Johnson</h2>
              <p className="text-violet-600 font-semibold mb-1">Senior Product Designer</p>
              <p className="text-gray-700 font-medium mb-2">Delightloop</p>
              <div className="flex items-center justify-center gap-1 text-gray-600 text-sm">
                <MapPin className="w-4 h-4 text-violet-500" />
                <span>San Francisco, CA</span>
              </div>
            </CardContent>
          </Card>

          {/* Save Contact Button */}
          <Button
            onClick={handleSaveVCard}
            className={`w-full mb-6 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl text-base ${showHeartbeat ? "animate-heartbeat" : ""}`}
          >
            Save Contact
          </Button>

          {/* Contact Methods */}
          <div className="space-y-3">
            <Card className="bg-gradient-to-r from-violet-50 to-purple-50 backdrop-blur-sm border border-violet-100/50 hover:from-violet-100 hover:to-purple-100 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-semibold">LinkedIn</p>
                    <p className="text-gray-600 text-sm">Connect professionally</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-violet-50 to-purple-50 backdrop-blur-sm border border-violet-100/50 hover:from-violet-100 hover:to-purple-100 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-semibold">Message</p>
                    <p className="text-gray-600 text-sm">Send a direct message</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-violet-50 to-purple-50 backdrop-blur-sm border border-violet-100/50 hover:from-violet-100 hover:to-purple-100 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-semibold">WhatsApp</p>
                    <p className="text-gray-600 text-sm">Chat with me</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-violet-50 to-purple-50 backdrop-blur-sm border border-violet-100/50 hover:from-violet-100 hover:to-purple-100 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-semibold">Email</p>
                    <p className="text-gray-600 text-sm">Shoot me an email</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-violet-50 to-purple-50 backdrop-blur-sm border border-violet-100/50 hover:from-violet-100 hover:to-purple-100 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-semibold">Address</p>
                    <p className="text-gray-600 text-sm">Find me here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t border-gray-200 pb-4">
            <p className="text-gray-500 text-xs">Powered by Delightloop</p>
            <div className="flex items-center justify-center gap-1 mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
