/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, ChevronLeft, Check } from "lucide-react"
import Link from "next/link"

// Add Razorpay to Window interface
// declare global {
//   interface Window {
//     Razorpay: any
//   }
// }

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Function to fetch property data
const fetchProperty = async (id) => {
  if (!id) throw new Error("Property ID is missing")
  const response = await fetch(`${API_URL}/properties/${id}`)
  if (!response.ok) {
    console.error("Failed to fetch property:", response.status, await response.text())
    throw new Error(`Failed to fetch property data (status: ${response.status})`)
  }
  return response.json()
}

// Create a BookPageContent component that uses React Query
function BookPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const propertyId = params.id

  const [date, setDate] = useState({
    from: searchParams.get("checkin") ? new Date(searchParams.get("checkin")) : new Date("2025-03-24"),
    to: searchParams.get("checkout") ? new Date(searchParams.get("checkout")) : new Date("2025-03-28"),
  })
  const [guests, setGuests] = useState(searchParams.get("guests") || "1")
  const [nights, setNights] = useState(searchParams.get("nights") || "0")

  // Fetch property data using TanStack Query
  const {
    data: property,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => fetchProperty(propertyId),
    enabled: !!propertyId,
  })

  const calculateTotal = () => {
    if (!property) return { nights: 0, subtotal: 0, cleaningFee: 0, serviceFee: 0, taxes: 0, total: 0 }

    const nightlyRate = property.basePrice || 20000
    const cleaningFee = 0
    const nightsCount = 
      nights && Number(nights) > 0
        ? Number(nights)
        : Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))
    const subtotal = nightlyRate * nightsCount
    const serviceFee = Math.round(subtotal * 0.14) // 14% service fee like Airbnb
    const taxes = Math.round(subtotal * 0.18) // 18% GST in India

    return {
      nights: nightsCount,
      subtotal,
      cleaningFee,
      serviceFee,
      taxes,
      total: subtotal + cleaningFee + serviceFee + taxes,
    }
  }

  const totals = calculateTotal()

  // Load Razorpay SDK
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        script.onload = () => {
          resolve(true)
        }
        script.onerror = () => {
          resolve(false)
        }
        document.body.appendChild(script)
      })
    }

    const initializeRazorpay = async () => {
      const res = await loadRazorpayScript()
      if (!res) {
        console.error("Razorpay SDK failed to load")
      }
    }

    initializeRazorpay()
  }, [])

  const handlePayment = async () => {
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK is not loaded yet. Please try again in a moment.")
      return
    }

    try {
      const options = {
        key: "rzp_test_w0bKE5w5UPOPrY", // Replace with your actual test key
        amount: totals.total * 100,
        currency: "INR",
        name: "Majestic Escape",
        description: `Booking for ${property?.title || "Property"} (${date.from.toLocaleDateString()} - ${date.to.toLocaleDateString()})`,
        image: "/logo.png",
        handler: (response) => {
          console.log("Payment successful:", response)
          // Redirect to booking summary page
          const summaryParams = new URLSearchParams({
            bookingId: response.razorpay_payment_id,
            propertyId: propertyId,
            propertyName: property?.title || "Property",
            propertyImage: property?.photos[0],
            checkin: date.from.toISOString(),
            checkout: date.to.toISOString(),
            numberOfGuests: guests,
            totalAmount: totals.total.toString(),
            nights: totals.nights.toString(),
          })
          router.push(`/booking-summary?${summaryParams.toString()}`)
        },
       
        theme: {
          color: "#36621F", // Airbnb red color
        },
        modal: {
          ondismiss: () => {
            console.log("Payment modal closed")
          },
        },
        notes: {
          propertyId: propertyId,
          checkIn: date.from.toISOString(),
          checkOut: date.to.toISOString(),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error)
        alert(`Payment failed: ${response.error.description}`)
      })
      rzp.open()
    } catch (error) {
      console.error("Razorpay error:", error)
      alert("Payment initialization failed. Please try again.")
    }
  }

  if (isLoading) {
    return <BookingPageSkeleton />
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center p-8 bg-red-50 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-red-700 mb-2">Error loading property</h2>
          <p className="text-red-600">{error.message || "An unknown error occurred."}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primaryGreen text-white rounded hover:bg-brightGreen"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // Extract property details
  const propertyTitle = property?.title || "Property"
  const propertyLocation = property?.address
    ? `${property.address.city || ""}, ${property.address.state || ""}, ${property.address.country || ""}`
    : "Location not specified"
  const propertyImage = property?.photos[0]
  const propertyPrice = property?.basePrice
  const propertyRating = property?.rating || 0
  const propertyReviews = property?.reviews?.length || 0
  const propertyAmenities = property?.amenities?.map((a) => a.name)
  const propertyHouseRules = property?.houseRules || ["No smoking", "No parties", "No pets"]
  const propertyCheckIn = property?.checkInTime || "2:00 PM"
  const propertyCheckOut = property?.checkOutTime || "11:00 AM"

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 md:py-32">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to listing
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-semibold font-bricolage mb-6">Confirm and pay</h1>

          <div className="mb-8 border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Your trip</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-1">Dates</h3>
                <p>
                  {date.from.toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                  {date.to?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Guests</h3>
                <p>
                  {guests} guest{Number(guests) > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 border-b pb-8">
            <h2 className="text-xl font-semibold mb-4">Check-in details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-1">Check-in</h3>
                <p>{propertyCheckIn}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Check-out</h3>
                <p>{propertyCheckOut}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 border-b pb-8">
            <h2 className="text-xl font-semibold mb-4">House rules</h2>
            <ul className="space-y-2">
              {propertyHouseRules.map((rule, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8 border-b pb-8">
            <h2 className="text-xl font-semibold mb-4">Cancellation policy</h2>
            <p className="text-gray-700">
              Free cancellation for 48 hours. After that, cancel before 2:00 PM on{" "}
              {date.from.toLocaleDateString("en-US", { month: "short", day: "numeric" })} and get a full refund, minus
              the first night and service fee.
            </p>
            <Link href="/cancellation-policy" className="px-0 text-black font-medium underline mt-2">
              Learn more
            </Link>
          </div>

          <div className="mb-8 border-b pb-8">
            <h2 className="text-xl font-semibold mb-4">Ground rules</h2>
            <p className="text-gray-700">
              We ask every guest to remember a few simple things about what makes a great guest.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                <span>Follow the house rules</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 shrink-0 mt-0.5" />
                <span>Treat your Host's home like your own</span>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <Button onClick={handlePayment} className="w-full h-12 text-base bg-primaryGreen hover:bg-brightGreen">
              Pay ₹{totals.total.toLocaleString()}
            </Button>
            <p className="text-sm text-center mt-4 text-gray-500">You won't be charged yet</p>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 self-start">
          <Card className="border rounded-xl shadow-lg">
            <CardHeader className="flex flex-row items-center space-x-4 pb-4">
              {/* <Image
                src={propertyImage || "/placeholder.svg"}
                alt={propertyTitle}
                width={120}
                height={120}
               
                className="rounded-lg object-cover"
              /> */}
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Entire {property?.propertyType} in {property?.address?.city || "Goa"}
                </p>
                <CardTitle className="text-lg">{propertyTitle}</CardTitle>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 fill-current text-black mr-1" />
                  <span className="text-sm">
                    {propertyRating} · {propertyReviews} reviews
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="border-t pt-6">
              <h3 className="font-medium font-bricolage text-lg mb-4">Price details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="underline">
                    ₹{propertyPrice.toLocaleString()} x {totals.nights} night{totals.nights > 1 ? "s" : ""}
                  </span>
                  <span>₹{totals.subtotal.toLocaleString()}</span>
                </div>
                <div className="hidden justify-between">
                  <span className="underline">Cleaning fee</span>
                  <span>₹{totals.cleaningFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Majestic Escape service fee</span>
                  <span>₹{totals.serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Taxes</span>
                  <span>₹{totals.taxes.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex justify-between w-full font-semibold text-lg">
                <span>Total (INR)</span>
                <span>₹{totals.total.toLocaleString()}</span>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-6 p-4 border rounded-xl">
            <h3 className="font-semibold mb-4">Your reservation is protected by</h3>
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-sm">Booking Protection Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-sm">24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main component that creates a QueryClient and provides it to the BookPageContent
export default function BookPage() {
  // Create a client
  const queryClientRef = useRef(null)
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <BookPageContent />
    </QueryClientProvider>
  )
}

function BookingPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Skeleton className="h-10 w-32 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Skeleton className="h-10 w-64 mb-6" />
          <Skeleton className="h-32 w-full mb-6 rounded-xl" />
          <Skeleton className="h-32 w-full mb-6" />
          <Skeleton className="h-48 w-full mb-6" />
          <Skeleton className="h-32 w-full mb-6" />
          <Skeleton className="h-32 w-full mb-6" />
          <Skeleton className="h-14 w-full mb-2" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
        <div>
          <Skeleton className="h-[400px] w-full mb-6 rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
