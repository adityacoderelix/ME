import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const amenitiesList = [
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'parking', label: 'Free Parking' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'washer', label: 'Washer' },
  { id: 'dryer', label: 'Dryer' },
  { id: 'ac', label: 'Air Conditioning' },
  { id: 'heating', label: 'Heating' },
  { id: 'tv', label: 'TV' },
  { id: 'pool', label: 'Pool' },
  { id: 'hottub', label: 'Hot Tub' },
]

export function Amenities({ updateFormData, formData }) {
  const [amenities, setAmenities] = useState>(formData.amenities || [])

  const handleAmenityChange = (amenityId) => {
    const updatedAmenities = amenities.includes(amenityId)
      ? amenities.filter(id => id !== amenityId)
      : [...amenities, amenityId]
    
    setAmenities(updatedAmenities)
    updateFormData({ amenities: updatedAmenities })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Available Amenities</h3>
      <div className="grid grid-cols-2 gap-4">
        {amenitiesList.map((amenity) => (
          <div key={amenity.id} className="flex items-center space-x-2">
            <Checkbox
              id={amenity.id}
              checked={amenities.includes(amenity.id)}
              onCheckedChange={() => handleAmenityChange(amenity.id)}
            />
            <Label htmlFor={amenity.id}>{amenity.label}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

