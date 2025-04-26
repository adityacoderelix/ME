import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddressDetails({ updateFormData, formData }) {
  const [address, setAddress] = useState({
    line1: formData.line1 || '',
    line2: formData.line2 || '',
    pincode: formData.pincode || '',
    district: formData.district || '',
    state: formData.state || 'Goa',
    country: formData.country || 'India',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAddress(prev => ({ ...prev, [name]: value }))
    updateFormData(address)
  }

  return (
<div className="space-y-6 max-w-3xl mx-auto">
<h3 className="text-xl md:text-2xl font-bricolage text-absoluteDark font-semibold">
        Let's get your property's precise address
      </h3>
      <div>
        <Label htmlFor="line1" className=" font-medium mb-2">Property Address</Label>
        <div className="mt-1 space-y-2">
          <Input
            id="line1"
            name="line1"
            value={address.line1}
            onChange={handleInputChange}
            placeholder="Address Line 1"
            className='text-sm h-12 text-stone'

          />
          <Input
            id="line2"
            name="line2"
            value={address.line2}
            onChange={handleInputChange}
            placeholder="Address Line 2"
            className='text-sm h-12 text-stone'

          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input
              id="pincode"
              name="pincode"
              value={address.pincode}
              onChange={handleInputChange}
              placeholder="Pincode"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              className='text-sm h-12 text-stone no-spinner'

                            
            />
            <Input
              id="district"
              name="district"
              value={address.district}
              onChange={handleInputChange}
              placeholder="District"
              className='text-sm h-12 text-stone'

            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input
              id="state"
              name="state"
              value={address.state}
              onChange={handleInputChange}
              placeholder="State"
              className='text-sm h-12 text-stone'
            />
            <Input
              id="country"
              name="country"
              value={"India"}
              placeholder="Country"
              disabled
              className='text-sm h-12 text-stone'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

