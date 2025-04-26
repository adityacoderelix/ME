import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function Photos({ updateFormData, formData }) {
  const [photos, setPhotos] = useState(formData.photos || [])

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

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="photos">Upload Property Photos</Label>
        <Input
          id="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <img src={photo} alt={`Property photo ${index + 1}`} className="w-full h-40 object-cover rounded-md" />
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
  )
}

