'use client'

import * as React from "react"
import { Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface GuestPickerProps {
  onSelect: (guests: GuestCounts) => void
  onClose: () => void
}

interface GuestCounts {
  adults: number
  children: number
  infants: number
  pets: number
}

export function GuestPicker({ onSelect, onClose }: GuestPickerProps) {
  const [counts, setCounts] = React.useState<GuestCounts>({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0
  })

  const updateCount = (type: keyof GuestCounts, increment: boolean) => {
    setCounts(prev => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Who's coming?</h2>
      
      {[
        { type: 'adults' as const, label: 'Adults', description: 'Ages 13 or above' },
        { type: 'children' as const, label: 'Children', description: 'Ages 2–12' },
        { type: 'infants' as const, label: 'Infants', description: 'Under 2' },
        { type: 'pets' as const, label: 'Pets', description: 'Bringing a service animal?' },
      ].map(({ type, label, description }) => (
        <div key={type} className="flex items-center justify-between py-4 border-b last:border-none">
          <div>
            <div className="font-medium">{label}</div>
            <div className="text-sm text-muted-foreground">
              {type === 'pets' ? (
                <Button variant="link" className="p-0 h-auto text-sm underline">
                  {description}
                </Button>
              ) : (
                description
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={() => updateCount(type, false)}
              disabled={counts[type] === 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-4 text-center">{counts[type]}</span>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={() => updateCount(type, true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <Button 
          onClick={() => {
            onSelect(counts)
            onClose()
          }}
          className="bg-black text-white hover:bg-black/90"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

