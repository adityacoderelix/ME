import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from 'lucide-react'

export function DescribeYourPlace({ updateFormData, formData }) {
  const [title, setTitle] = useState(formData?.title || '')
  const [description, setDescription] = useState(formData?.description || '')
  const [guests, setGuests] = useState(formData?.guests || 1)
  const [bedrooms, setBedrooms] = useState(formData?.bedrooms || 1)
  const [beds, setBeds] = useState(formData?.beds || 1)
  const [bathrooms, setBathrooms] = useState(formData?.bathrooms || 1)

  const handleChange = () => {
    updateFormData({ title, description, guests, bedrooms, beds, bathrooms })
  }

  const handleIncrement = (setter) => {
    setter(prev => {
      const newValue = prev + 1
      handleChange()
      return newValue
    })
  }

  const handleDecrement = (setter) => {
    setter(prev => {
      const newValue = Math.max(1, prev - 1)
      handleChange()
      return newValue
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title" className="text-lg font-medium">Listing title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            handleChange()
          }}
          placeholder="Enter a catchy title for your listing"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="description" className="text-lg font-medium">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
            handleChange()
          }}
          placeholder="Describe your place"
          className="mt-1"
          rows={4}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="guests" className="text-lg font-medium">Max guests</Label>
          <div className="flex items-center mt-1">
            <Button type="button" variant="outline" size="icon" onClick={() => handleDecrement(setGuests)}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id="guests"
              type="number"
              value={guests}
              onChange={(e) => {
                setGuests(Number(e.target.value))
                handleChange()
              }}
              className="w-16 mx-2 text-center"
            />
            <Button type="button" variant="outline" size="icon" onClick={() => handleIncrement(setGuests)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="bedrooms" className="text-lg font-medium">Bedrooms</Label>
          <div className="flex items-center mt-1">
            <Button type="button" variant="outline" size="icon" onClick={() => handleDecrement(setBedrooms)}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id="bedrooms"
              type="number"
              value={bedrooms}
              onChange={(e) => {
                setBedrooms(Number(e.target.value))
                handleChange()
              }}
              className="w-16 mx-2 text-center"
            />
            <Button type="button" variant="outline" size="icon" onClick={() => handleIncrement(setBedrooms)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="beds" className="text-lg font-medium">Beds</Label>
          <div className="flex items-center mt-1">
            <Button type="button" variant="outline" size="icon" onClick={() => handleDecrement(setBeds)}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id="beds"
              type="number"
              value={beds}
              onChange={(e) => {
                setBeds(Number(e.target.value))
                handleChange()
              }}
              className="w-16 mx-2 text-center"
            />
            <Button type="button" variant="outline" size="icon" onClick={() => handleIncrement(setBeds)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="bathrooms" className="text-lg font-medium">Bathrooms</Label>
          <div className="flex items-center mt-1">
            <Button type="button" variant="outline" size="icon" onClick={() => handleDecrement(setBathrooms)}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id="bathrooms"
              type="number"
              value={bathrooms}
              onChange={(e) => {
                setBathrooms(Number(e.target.value))
                handleChange()
              }}
              className="w-16 mx-2 text-center"
            />
            <Button type="button" variant="outline" size="icon" onClick={() => handleIncrement(setBathrooms)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

