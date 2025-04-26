import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"


export function SetBooking({ updateFormData, formData }) {
  const [instantBook, setInstantBook] = useState(formData?.instantBook || false)
  const [flashBook, setFlashBook] = useState(formData?.flashBook || false)

  const handleChange = () => {
    updateFormData({ 
      instantBook, 
      flashBook, 
    })
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto ">
      <h3 className="text-xl md:text-2xl font-bricolage text-absoluteDark font-semibold">
      Let's set the booking availability</h3>
     
      

      <div>
        <h3 className=" font-bricolage font-semibold mb-4">Booking Options</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="instantBook"
              checked={instantBook}
              onCheckedChange={(checked) => {
                setInstantBook(checked)
                handleChange()
              }}
            />
            <Label htmlFor="instantBook" className="text-stone font-normal text-sm">Allow instant booking</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
            className="bg-purple-50"
              id="flashBook"
              checked={flashBook}
              onCheckedChange={(checked) => {
                setFlashBook(checked)
                handleChange()
              }}
            />
            <Label htmlFor="flashBook" className="text-stone font-normal text-sm">Enable flash booking (10 minutes confirmation)</Label>
          </div>
        </div>
      </div>

    
    </div>
  )
}

