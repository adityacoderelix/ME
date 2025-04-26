"use client"

import { useState } from "react"
import { ChevronDown, FileText, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function TaxInformation() {
  const [activeTab, setActiveTab] = useState<"Overview" | "Personal" | "Documents">("Overview")

  return (
    <main className="flex-1 p-4 sm:p-8">
      <div className="rounded-lg border p-4 sm:p-6">
        <h2 className="text-2xl font-bold mb-2">Tax Information</h2>
        <p className="text-sm text-muted-foreground mb-8">
          Manage your tax documents and information for your Goa stays bookings and earnings
        </p>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <nav className="flex gap-4 sm:gap-8 whitespace-nowrap">
            {(["Overview", "Personal", "Documents"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-brightGreen text-brightGreen"
                    : "font-medium text-black"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "Overview" && (
          <div className="space-y-6">
            <div className="rounded-lg border p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Overview of Taxes on Bookings</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Understanding the taxes applied to your Majestic Escape&apos;s bookings
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-muted rounded-lg p-4 sm:p-6">
                  <h4 className="font-medium text-sm mb-4">Types of Taxes</h4>
                  <ul className="space-y-3 text-sm">
                    <li>Goods and Services Tax (GST)</li>
                    <li>Luxury Tax</li>
                    <li>Municipal Tax</li>
                  </ul>
                </div>

                <div className="bg-muted rounded-lg p-4 sm:p-6">
                  <h4 className="font-medium text-sm mb-4">Factors Affecting Taxes</h4>
                  <ul className="space-y-3 text-sm">
                    <li>Type of accommodation</li>
                    <li>Room tariff</li>
                    <li>Duration of Stay</li>
                  </ul>
                </div>
              </div>

              <Collapsible className="mt-6">
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4 text-left">
                  <span className="text-sm font-semibold">How are taxes calculated?</span>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Tax calculation details would appear here...
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <div className="mt-6">
                <Button variant="outline" className="text-brightGreen font-medium text-sm border-brightGreen rounded-full p-4 sm:p-6 px-6 sm:px-8 hover:bg-primary/5">
                  Need more help?
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Personal" && (
          <div className="space-y-6">
            <div className="rounded-lg border p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-2">Personal Tax Information</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Manage your tax details for accurate reporting
              </p>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="pan" className="block text-sm font-medium mb-2">PAN Number</label>
                  <input
                    id="pan"
                    type="text"
                    placeholder="Enter your PAN no."
                    className="w-full sm:w-[426px] px-3 py-2 border rounded-md placeholder-graphite"
                  />
                  <p className="text-sm text-muted-foreground mt-1">Your Permanent Account Number is required for tax purposes</p>
                </div>

                <div>
                  <label htmlFor="gstin" className="block text-sm font-medium mb-2">GSTIN (Optional)</label>
                  <input
                    id="gstin"
                    type="text"
                    placeholder="Enter your GSTIN."
                    className="w-full sm:w-[426px] px-3 py-2 border rounded-md placeholder-graphite"
                  />
                  <p className="text-sm text-muted-foreground mt-1">Required only if you&apos;re registered under GST</p>
                </div>

                <div className="mt-6">
                  <Button variant="outline" className="text-brightGreen font-medium text-sm border-brightGreen rounded-full p-4 sm:p-6 px-6 sm:px-8 hover:bg-primary/5">
                    Save Tax Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Documents" && (
          <div className="space-y-6">
            <div className="rounded-lg border p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-2">Tax Documents</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Access and manage your tax-related documents
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "Form 26AS", description: "Tax Credit Statement" },
                  { title: "Rental Income Statement", description: "Annual earnings report" }
                ].map((doc, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <div className="p-2 bg-primary/5 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{doc.title}</h4>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                    <Button className="text-brightGreen bg-white shadow-none hover:bg-primary/5 w-full sm:w-auto">
                      <Download className="h-5 w-5 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}