import { Award, Heart, Share } from "lucide-react"
import BookingWidget from "./booking-widget"

interface PropertyDetailsProps {
  title?: string
  location?: string
  details?: {
    guests?: number
    bedrooms?: number
    beds?: number
    bathrooms?: number
  }
}

export default function PropertyDetails({ title = "", location = "", details = {} }: PropertyDetailsProps) {
  const { guests = 0, bedrooms = 0, beds = 0, bathrooms = 0 } = details
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="mt-2 text-gray-500">{location}</p>
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-2 py-1">
              <Share className="h-4 w-4" />
              <span className="text-sm font-semibold underline">Share</span>
            </button>
            <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-2 py-1">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-semibold underline">Save</span>
            </button>
          </div>
        </div>
        <div className="mt-6 border-t pt-8">
          <div className="flex items-center space-x-4">
            <Award className="h-8 w-8" />
            <div>
              <h2 className="font-semibold">Hosted by Saurabh</h2>
              <p className="text-sm text-gray-500">Superhost · 5 years hosting</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <h3 className="font-semibold">{guests} guests</h3>
              <p className="text-sm text-gray-500">Maximum occupancy</p>
            </div>
            <div>
              <h3 className="font-semibold">{bedrooms} bedrooms</h3>
              <p className="text-sm text-gray-500">Comfortable sleeping arrangements</p>
            </div>
            <div>
              <h3 className="font-semibold">{beds} beds</h3>
              <p className="text-sm text-gray-500">Cozy sleeping options</p>
            </div>
            <div>
              <h3 className="font-semibold">{bathrooms} bathrooms</h3>
              <p className="text-sm text-gray-500">Private and convenient</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1">
        <BookingWidget isLoading={false} />
      </div>
    </div>
  )
}

