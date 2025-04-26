"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReviewForm } from "./review-form"
import { BookingSelector } from "./booking-selector"
import { useState } from "react"

// This would come from your API/database
const mockBookings = [
  {
    id: "1",
    type: "stay",
    title: "Luxury Villa - Goa",
    date: "2024-01-15",
    image: "/placeholder.svg?height=100&width=150"
  },
  {
    id: "2",
    type: "experience",
    title: "Sunset Cruise Adventure",
    date: "2024-01-20",
    image: "/placeholder.svg?height=100&width=150"
  },
  {
    id: "3",
    type: "stay",
    title: "Beachfront Resort",
    date: "2024-01-25",
    image: "/placeholder.svg?height=100&width=150"
  }
]

export default function ReviewPage() {
  const [selectedBooking, setSelectedBooking] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-bricolage text-absoluteDark text-center">Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedBooking ? (
              <BookingSelector 
                bookings={mockBookings} 
                onSelect={setSelectedBooking} 
              />
            ) : (
              <div>
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="mb-6 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
                >
                  ← Back to bookings
                </button>
                <ReviewForm booking={selectedBooking} />
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

