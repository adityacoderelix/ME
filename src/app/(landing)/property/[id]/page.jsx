"use client"

import { useState, useEffect } from "react"
import ImageGallery from "./components/image-gallery"
import PropertyDetails from "./components/property-details"
import Reviews from "./components/reviews"
import Location from "./components/location"
import Host from "./components/host"
import ThingsToKnow from "./components/things-to-know"

const initialData = {
  images: [],
  title: "",
  location: "",
  host: {},
  details: {},
  reviews: {},
  locationInfo: {
    description: "",
    lat: 0,
    lng: 0,
  },
  thingsToKnow: {},
}

export default function Home() {
  const [propertyData, setPropertyData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const mockData = {
        images: [
          "/placeholder.svg?height=600&width=600",
          "/placeholder.svg?height=300&width=300",
          "/placeholder.svg?height=300&width=300",
          "/placeholder.svg?height=300&width=300",
          "/placeholder.svg?height=300&width=300",
        ],
        title: "Luxurious 5 BHK Villa with Private Pool",
        location: "Lonavala, Maharashtra, India",
        host: {
          name: "Saurabh",
          joinDate: "June 2018",
          isSuperhost: true,
          avatar: "/placeholder.svg?height=56&width=56",
        },
        details: {
          guests: 10,
          bedrooms: 5,
          beds: 5,
          bathrooms: 5,
        },
        reviews: {
          rating: 4.91,
          count: 139,
        },
        locationInfo: {
          description:
            "The villa is located in a serene and picturesque area of Lonavala, offering breathtaking views of the surrounding mountains and valleys.",
          lat: 18.7546, // Example coordinates for Lonavala
          lng: 73.4062,
        },
        thingsToKnow: {
          houseRules: ["Check-in: 2:00 PM - 8:00 PM", "Checkout: 11:00 AM", "No smoking", "No pets"],
          safety: ["Pool/hot tub without a gate or lock", "Carbon monoxide alarm", "Smoke alarm"],
          cancellation:
            "Free cancellation before Jul 9. After that, cancel before 2:00 PM on Jul 14 and get a 50% refund, minus the first night and service fee.",
        },
      }

      setPropertyData(mockData)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ImageGallery images={propertyData.images} isLoading={isLoading} />
        <PropertyDetails
          title={propertyData.title}
          location={propertyData.location}
          details={propertyData.details}
          isLoading={isLoading}
        />
        <Reviews reviews={propertyData.reviews} isLoading={isLoading} />
        <Location locationInfo={propertyData.locationInfo} isLoading={isLoading} />
        <Host host={propertyData.host} isLoading={isLoading} />
        <ThingsToKnow thingsToKnow={propertyData.thingsToKnow} isLoading={isLoading} />
      </div>
    </main>
  )
}

