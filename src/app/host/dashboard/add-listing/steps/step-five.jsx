import { useState, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

const amenities = [
  { id: 'wifi', label: 'Wi-Fi', icon: '📶' },
  { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { id: 'washer', label: 'Washer', icon: '🧺' },
  { id: 'dryer', label: 'Dryer', icon: '👕' },
  { id: 'ac', label: 'Air conditioning', icon: '❄️' },
  { id: 'heating', label: 'Heating', icon: '🔥' },
  { id: 'tv', label: 'TV', icon: '📺' },
  { id: 'parking', label: 'Free parking', icon: '🅿️' },
  { id: 'pool', label: 'Swimming Pool', icon: '🏊' },
  { id: 'hot_tub', label: 'Hot Tub', icon: '🛁' },
  { id: 'gym', label: 'Gym', icon: '🏋️' },
  { id: 'breakfast', label: 'Breakfast', icon: '🍳' },
  { id: 'pets', label: 'Pet-friendly', icon: '🐾' },
  { id: 'workspace', label: 'Dedicated Workspace', icon: '💻' },
  { id: 'smoking_allowed', label: 'Smoking Allowed', icon: '🚬' },
  { id: 'beachfront', label: 'Beachfront', icon: '🏖️' },
  { id: 'fireplace', label: 'Fireplace', icon: '🔥' },
  { id: 'bbq', label: 'BBQ Grill', icon: '🍖' },
  { id: 'balcony', label: 'Balcony', icon: '🏞️' },
  { id: 'garden', label: 'Garden', icon: '🌳' },
  { id: 'security', label: '24/7 Security', icon: '🔒' },
  { id: 'elevator', label: 'Elevator', icon: '🛗' },
  { id: 'wheelchair_accessible', label: 'Wheelchair Accessible', icon: '♿' },
  { id: 'child_friendly', label: 'Child-friendly', icon: '👶' },
  { id: 'long_term', label: 'Long-term stays allowed', icon: '🕒' },
  { id: 'hair_dryer', label: 'Hair Dryer', icon: '💇‍♂️' },
  { id: 'iron', label: 'Iron', icon: '🧼' },
  { id: 'first_aid', label: 'First Aid Kit', icon: '🩹' },
  { id: 'carbon_monoxide_detector', label: 'Carbon Monoxide Detector', icon: '🛑' },
  { id: 'smoke_detector', label: 'Smoke Detector', icon: '🚨' },
];

export function AddAmenities({ updateFormData, formData }) {
  const [selectedAmenities, setSelectedAmenities] = useState(formData?.amenities || [])

  useEffect(() => {
    setSelectedAmenities(formData?.amenities || [])
  }, [formData?.amenities])

  const toggleAmenity = (amenityId) => {
    let updatedAmenities = [...selectedAmenities]
    if (updatedAmenities.includes(amenityId)) {
      updatedAmenities = updatedAmenities.filter((id) => id !== amenityId)
    } else {
      updatedAmenities.push(amenityId)
    }
    setSelectedAmenities(updatedAmenities)
    updateFormData({ amenities: updatedAmenities })
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto  py-4 pb-12">
      <h3 className="text-xl md:text-2xl font-bricolage text-absoluteDark font-semibold">
        Add amenities to stand out
      </h3>
      <div>
        <h3 className="text-base text-stone font-medium mb-4">Select your property's standout amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenities.map((amenity) => (
            <Card
              key={amenity.id}
              className={`cursor-pointer hover:bg-gray-50 ${
                selectedAmenities.includes(amenity.id) ? 'border-2 border-primaryGreen' : 'border border-gray-300'
              }`}
              onClick={() => toggleAmenity(amenity.id)}
            >
              <CardContent className="p-4">
                <Label
                  className="flex flex-col items-center justify-center space-y-2 font-medium"
                >
                  <span className="text-2xl">{amenity.icon}</span>
                  <span className="text-sm font-bricolage text-stone text-center">{amenity.label}</span>
                </Label>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
