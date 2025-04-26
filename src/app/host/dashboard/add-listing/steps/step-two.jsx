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

  DescribeYourPlace.validate = (formData) => {
    const { title, description, guests, bedrooms, beds, bathrooms } = formData;
    if (!title || !description || guests < 1 || bedrooms < 1 || beds < 1 || bathrooms < 1) {
      return false;
    }
    return true;
  };
  
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

<div className="space-y-6 max-w-3xl mx-auto">
      <h3 className="text-xl md:text-2xl font-bricolage text-absoluteDark font-semibold">
        Let us know about your place
      </h3>
      <div>
        <Label htmlFor="title" className=" font-medium">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            handleChange()
          }}
          placeholder="Enter a title for your listing"
          className="mt-2 rounded-md text-sm h-12 text-stone"
        />
      </div>
      <div>
        <Label htmlFor="description" className="font-medium">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
            handleChange()
          }}
          placeholder="Describe your place"
          className="mt-2 rounded-md text-sm h-12 text-stone"

          rows={4}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="guests" className="font-medium">Max guests</Label>
          <div className="flex items-center mt-2">
            
            <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement(setGuests)}                  disabled={guests.infants === 0}
                  className="transition-all h-9 w-9 bg-gray-50 border border-[#333] rounded-full duration-200 ease-in-out"
                >
                  <Minus className="h-5 w-5" />
                </Button>

            <Input
              id="guests"
              type="number"
              value={guests}
              onChange={(e) => {
                setGuests(Number(e.target.value))
                handleChange()
              }}
              className="w-16 mx-2 no-spinner text-center"
            />
             <Button
             type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleIncrement(setGuests)}                  disabled={guests.infants === 0}
                  className="transition-all h-9 w-9 bg-gray-50 border border-[#333] rounded-full duration-200 ease-in-out"
                >
                  <Plus className="h-5 w-5" />
                </Button>
           
          </div>
        </div>

        <div>
          <Label htmlFor="guests" className="font-medium">Bedrooms</Label>
          <div className="flex items-center mt-2">
            
            <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement(setBedrooms)}                  disabled={guests.infants === 0}
                  className="transition-all h-9 w-9 bg-gray-50 border border-[#333] rounded-full duration-200 ease-in-out"
                >
                  <Minus className="h-5 w-5" />
                </Button>

            <Input
              id="guests"
              type="number"
              value={bedrooms}
              onChange={(e) => {
                setGuests(Number(e.target.value))
                handleChange()
              }}
              className="w-16 mx-2 no-spinner text-center"
            />
             <Button
             type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleIncrement(setBedrooms)}                  disabled={guests.infants === 0}
                  className="transition-all h-9 w-9 bg-gray-50 border border-[#333] rounded-full duration-200 ease-in-out"
                >
                  <Plus className="h-5 w-5" />
                </Button>
           
          </div>
        </div>

        <div>
          <Label htmlFor="guests" className="font-medium">Beds</Label>
          <div className="flex items-center mt-2">
            
            <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement(setBeds)}                  disabled={guests.infants === 0}
                  className="transition-all h-9 w-9 bg-gray-50 border border-[#333] rounded-full duration-200 ease-in-out"
                >
                  <Minus className="h-5 w-5" />
                </Button>

            <Input
              id="guests"
              type="number"
              value={beds}
              onChange={(e) => {
                setGuests(Number(e.target.value))
                handleChange()
              }}
              className="w-16 mx-2 no-spinner text-center"
            />
             <Button
             type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleIncrement(setBeds)}                  disabled={guests.infants === 0}
                  className="transition-all h-9 w-9 bg-gray-50 border border-[#333] rounded-full duration-200 ease-in-out"
                >
                  <Plus className="h-5 w-5" />
                </Button>
           
          </div>
        </div>

        <div>
          <Label htmlFor="guests" className="font-medium">Bathroom</Label>
          <div className="flex items-center mt-2">
            
            <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement(setBathrooms)}                  disabled={guests.infants === 0}
                  className="transition-all h-9 w-9 bg-gray-50 border border-[#333] rounded-full duration-200 ease-in-out"
                >
                  <Minus className="h-5 w-5" />
                </Button>

            <Input
              id="guests"
              type="number"
              value={bathrooms}
              onChange={(e) => {
                setGuests(Number(e.target.value))
                handleChange()
              }}
              className="w-16 mx-2 no-spinner text-center"
            />
             <Button
             type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleIncrement(setBathrooms)}                  disabled={guests.infants === 0}
                  className="transition-all h-9 w-9 bg-gray-50 border border-[#333] rounded-full duration-200 ease-in-out"
                >
                  <Plus className="h-5 w-5" />
                </Button>
           
          </div>
        </div>


      </div>
    </div>
  )
}

