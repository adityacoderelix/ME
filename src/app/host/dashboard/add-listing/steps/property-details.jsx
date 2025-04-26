import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PropertyDetails({ updateFormData, formData }) {
  const [title, setTitle] = useState(formData.title || '')
  const [description, setDescription] = useState(formData.description || '')
  const [type, setType] = useState(formData.type || '')
  const [bedrooms, setBedrooms] = useState(formData.bedrooms || '')
  const [bathrooms, setBathrooms] = useState(formData.bathrooms || '')

  const handleChange = () => {
    updateFormData({ title, description, type, bedrooms, bathrooms })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Property Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            handleChange()
          }}
          placeholder="Enter a catchy title for your property"
        />
      </div>
      <div>
        <Label htmlFor="description">Property Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
            handleChange()
          }}
          placeholder="Describe your property"
        />
      </div>
      <div>
        <Label htmlFor="type">Property Type</Label>
        <Select
          value={type}
          onValueChange={(value) => {
            setType(value)
            handleChange()
          }}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="cabin">Cabin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="bedrooms">Number of Bedrooms</Label>
        <Input
          id="bedrooms"
          type="number"
          value={bedrooms}
          onChange={(e) => {
            setBedrooms(e.target.value)
            handleChange()
          }}
          placeholder="Enter number of bedrooms"
        />
      </div>
      <div>
        <Label htmlFor="bathrooms">Number of Bathrooms</Label>
        <Input
          id="bathrooms"
          type="number"
          value={bathrooms}
          onChange={(e) => {
            setBathrooms(e.target.value)
            handleChange()
          }}
          placeholder="Enter number of bathrooms"
        />
      </div>
    </div>
  )
}

