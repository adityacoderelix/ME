'use client'

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"


export function DatePicker({ onSelect, onClose }) {
  const [selectedDates, setSelectedDates] = React.useState()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">When's your trip?</h2>
      
      <Tabs defaultValue="dates" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dates">Dates</TabsTrigger>
          <TabsTrigger value="months">Months</TabsTrigger>
          <TabsTrigger value="flexible">Flexible</TabsTrigger>
        </TabsList>
      </Tabs>

      <Calendar
        mode="range"
        numberOfMonths={3}
        selected={selectedDates}
        onSelect={setSelectedDates}
        className="rounded-md border"
      />

      <div className="flex gap-2">
        <Button variant="outline" className="rounded-full" size="sm">
          Exact dates
        </Button>
        <Button variant="outline" className="rounded-full" size="sm">
          ± 1 day
        </Button>
        <Button variant="outline" className="rounded-full" size="sm">
          ± 2 days
        </Button>
        <Button variant="outline" className="rounded-full" size="sm">
          ± 3 days
        </Button>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onClose}>
          Skip
        </Button>
        <Button 
          onClick={() => {
            onSelect(selectedDates)
          }}
          className="bg-black text-white hover:bg-black/90"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

