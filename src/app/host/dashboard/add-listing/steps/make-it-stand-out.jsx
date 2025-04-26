import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const amenities = [
  { id: 'wifi', label: 'Wi-Fi', icon: '📶' },
  { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { id: 'washer', label: 'Washer', icon: '🧺' },
  { id: 'dryer', label: 'Dryer', icon: '👕' },
  { id: 'ac', label: 'Air conditioning', icon: '❄️' },
  { id: 'heating', label: 'Heating', icon: '🔥' },
  { id: 'tv', label: 'TV', icon: '📺' },
  { id: 'parking', label: 'Free parking', icon: '🅿️' },
]

export function MakeItStandOut({ updateFormData, formData }) {
  const [photos, setPhotos] = useState(formData?.photos || [])
  const [selectedAmenities, setSelectedAmenities] = useState(formData?.amenities || [])

  const handlePhotoUpload = (e) => {
    const files = e.target.files
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file))
      const updatedPhotos = [...photos, ...newPhotos]
      setPhotos(updatedPhotos)
      updateFormData({ photos: updatedPhotos })
    }
  }

  const removePhoto = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index)
    setPhotos(updatedPhotos)
    updateFormData({ photos: updatedPhotos })
  }

  const handleAmenityChange = (amenityId) => {
    const updatedAmenities = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter(id => id !== amenityId)
      : [...selectedAmenities, amenityId]
    setSelectedAmenities(updatedAmenities)
    updateFormData({ amenities: updatedAmenities })
  }

  return (
    <div className="space-y-8 py-4">
       <h3 className="text-xl md:text-2xl font-bricolage text-absoluteDark font-semibold">
        Add property photos and amenities to make your place stand out
      </h3>
      <div>
        <div className="space-y-4">
          <Input
            id="photos"
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <Label
            htmlFor="photos"
            className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primaryGreen"
          >
            <div className="text-center">
              <span className="text-2xl">📷</span>
              <p className="mt-2">Click to upload photos</p>
            </div>
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img src={photo} alt={`Property photo ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => removePhoto(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">What amenities do you offer?</h3>
        <div className="grid grid-cols-2 gap-4">
          {amenities.map((amenity) => (
            <div key={amenity.id} className="flex items-center space-x-2">
              <Checkbox
                id={amenity.id}
                checked={selectedAmenities.includes(amenity.id)}
                onCheckedChange={() => handleAmenityChange(amenity.id)}
              />
              <Label htmlFor={amenity.id} className="flex items-center">
                <span className="mr-2">{amenity.icon}</span>
                {amenity.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

