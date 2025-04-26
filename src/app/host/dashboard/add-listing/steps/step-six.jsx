import { useState } from 'react'
import { Input } from "@/components/ui/input"

export function SetPricing({ updateFormData, formData }) {
  const [basePrice, setBasePrice] = useState(formData?.basePrice || '')

  const handleChange = () => {
    updateFormData({ 
      basePrice, 
     
    })
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto ">
      <h3 className="text-xl md:text-2xl font-bricolage text-absoluteDark font-semibold">
      Let's set the pricing      </h3>
     
      <div>
        <h3 className="text-stone text-center mb-2">Set your price (per night)</h3>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-medium">₹</span>
          <Input
            id="basePrice"
            type="number"
            value={basePrice}
            onChange={(e) => {
              setBasePrice(e.target.value)
              handleChange()
            }}
            placeholder="Base price / night"
            className="max-w-[200px] text-xl py-8 text-stone no-spinner"
          />
        </div>
      </div>

    

    
    </div>
  )
}

