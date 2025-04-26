"use client"

import { useState } from "react"
import {  Lock, Share, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const [activeTab, setActiveTab] = useState<"Data" | "Sharing" | "Services">("Sharing")

  return (
    
        <main className="flex-1 p-4 sm:p-8">
          <div className="rounded-lg border p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-2">Privacy & Sharing</h2>
            <p className="text-muted-foreground mb-8">
              Protecting your personal data, so you can enjoy your escape
            </p>

            {/* Tabs */}
            <div className="mb-6 overflow-x-auto">
              <nav className="flex gap-4 sm:gap-8 whitespace-nowrap">
                {["Data", "Sharing", "Services"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as typeof activeTab)}
                    className={`pb-2 text-sm font-medium ${
                      activeTab === tab
                        ? "text-brightGreen border-b-2 border-brightGreen"
                        : "text-black"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === "Data" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      <CardTitle>Data Access</CardTitle>
                    </div>
                    <CardDescription className="mt-4">
                      Control and access your personal information with transparency and ease.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="space-y-4">
                      {[
                        { title: "Personal Data", description: "View and manage your personal information", action: "Manage" },
                        { title: "Data Export", description: "Download a copy of your data", action: "Export" },
                        { title: "Privacy Settings", description: "Control your privacy preferences", action: "Settings" },
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Button variant="ghost" className="text-brightGreen">{item.action}</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "Sharing" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Share className="h-5 w-5 text-primary" />
                      <CardTitle>Sharing Preferences</CardTitle>
                    </div>
                    <CardDescription className="mt-4">
                      Manage how your information is shared with others
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Sharing preferences content would appear here
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "Services" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      <CardTitle>Connected Services</CardTitle>
                    </div>
                    <CardDescription className="mt-4">
                      Manage your connected services and applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Connected services content would appear here
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
   
  )
}