import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Pricing({ updateFormData, formData }) {
  const [basePrice, setBasePrice] = useState(formData.basePrice || '')
  const [currency, setCurrency] = useState(formData.currency || 'USD')
  const [cleaningFee, setCleaningFee] = useState(formData.cleaningFee || '')
  const [minNights, setMinNights] = useState(formData.minNights || '')

  const handleChange = () => {
    updateFormData({ basePrice, currency, cleaningFee, minNights })
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="basePrice">Base Price (per night)</Label>
          <Input
            id="basePrice"
            type="number"
            value={basePrice}
            onChange={(e) => {
              setBasePrice(e.target.value)
              handleChange()
            }}
            placeholder="Enter base price"
          />
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Select
            value={currency}
            onValueChange={(value) => {
              setCurrency(value)
              handleChange()
            }}
          >
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="cleaningFee">Cleaning Fee</Label>
        <Input
          id="cleaningFee"
          type="number"
          value={cleaningFee}
          onChange={(e) => {
            setCleaningFee(e.target.value)
            handleChange()
          }}
          placeholder="Enter cleaning fee"
        />
      </div>
      <div>
        <Label htmlFor="minNights">Minimum Nights</Label>
        <Input
          id="minNights"
          type="number"
          value={minNights}
          onChange={(e) => {
            setMinNights(e.target.value)
            handleChange()
          }}
          placeholder="Enter minimum nights"
        />
      </div>
    </div>
  )
}

