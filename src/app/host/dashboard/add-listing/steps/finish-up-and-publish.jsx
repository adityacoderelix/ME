import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

const defaultHouseRules = [
  { id: 'no_smoking', label: 'No smoking' },
  { id: 'no_parties', label: 'No parties or events' },
  { id: 'no_pets', label: 'No pets' },
  { id: 'quiet_hours', label: 'Quiet hours from 10 PM to 7 AM' },
]

export function FinishUpAndPublish({ updateFormData, formData }) {
  const [basePrice, setBasePrice] = useState(formData?.basePrice || '')
  const [instantBook, setInstantBook] = useState(formData?.instantBook || false)
  const [flashBook, setFlashBook] = useState(formData?.flashBook || false)
  const [selectedRules, setSelectedRules] = useState(formData?.selectedRules || [])
  const [customRules, setCustomRules] = useState(formData?.customRules || [])
  const [newRule, setNewRule] = useState('')

  const handleChange = () => {
    updateFormData({ 
      basePrice, 
      instantBook, 
      flashBook, 
      selectedRules, 
      customRules
    })
  }

  const handleRuleChange = (ruleId) => {
    setSelectedRules(prev => 
      prev.includes(ruleId) 
        ? prev.filter(id => id !== ruleId) 
        : [...prev, ruleId]
    )
    handleChange()
  }

  const addCustomRule = () => {
    if (newRule.trim()) {
      setCustomRules(prev => [...prev, newRule.trim()])
      setNewRule('')
      handleChange()
    }
  }

  const removeCustomRule = (index) => {
    setCustomRules(prev => prev.filter((_, i) => i !== index))
    handleChange()
  }

  return (
    <div className="space-y-8">
      <h3 className="text-xl md:text-2xl font-bricolage text-absoluteDark font-semibold">
        Let's set the rules and pricing
      </h3>
      <div>
        <h3 className="text-xl font-semibold font-bricolage mb-4">Set your price</h3>
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
            placeholder="Enter base price per night"
            className="max-w-[200px] text-sm"
          />
          <span className="text-sm text-gray-500">per night</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bricolage font-semibold mb-4">Booking Options</h3>
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
            <Label htmlFor="instantBook" className="text-stone">Allow instant booking</Label>
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
            <Label htmlFor="flashBook" className="text-stone">Enable flash booking (10 minutes confirmation)</Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold font-bricolage mb-4">House Rules</h3>
        <div className="space-y-4">
          {defaultHouseRules.map((rule) => (
            <div key={rule.id} className="flex text-stone text-sm items-center space-x-2">
              <Checkbox
                id={rule.id}
                checked={selectedRules.includes(rule.id)}
                onCheckedChange={() => handleRuleChange(rule.id)}
              />
              <Label htmlFor={rule.id}>{rule.label}</Label>
            </div>
          ))}
          <div>
            <Label htmlFor="newRule" className="text-lg font-bricolage font-medium">Add custom rule</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input
                id="newRule"
                value={newRule}
                className="text-sm"
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Enter a custom rule"
              />
              <Button className="bg-primaryGreen" onClick={addCustomRule} type="button">Add</Button>
            </div>
          </div>
          {customRules.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-lg font-medium">Custom Rules:</h4>
              <ul className="list-disc list-inside">
                {customRules.map((rule, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{rule}</span>
                    <Button 
                      onClick={() => removeCustomRule(index)} 
                      variant="ghost" 
                      size="sm"
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

