/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface BookingWidgetProps {
  isLoading: boolean
  propertyId: string
  propertyImage: string
}

export default function BookingWidget({ isLoading, propertyId, propertyImage }: BookingWidgetProps) {
  const [date, setDate] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: undefined,
  })
  const [guests, setGuests] = useState("1")
  const router = useRouter()

  const calculateTotal = () => {
    const nightlyRate = 65000
    const cleaningFee = 10000
    const serviceFee = 47025
    const nights = date.to ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)) : 5

    return {
      nights,
      subtotal: nightlyRate * nights,
      cleaningFee,
      serviceFee,
      total: nightlyRate * nights + cleaningFee + serviceFee,
    }
  }

  const totals = calculateTotal()

  const handleReserve = () => {
    const searchParams = new URLSearchParams({
      propertyId,
      propertyImage: "https://s3-media0.fl.yelpcdn.com/bphoto/iG0EEEGlXe-gcepFU6ebyQ/348s.jpg",
      checkin: date.from.toISOString().split("T")[0],
      checkout: date.to ? date.to.toISOString().split("T")[0] : "",
      numberOfGuests: guests,
    })
    router.push(`/book?${searchParams.toString()}`)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full mb-4" />
          <Skeleton className="h-10 w-full mb-4" />
        </CardContent>
        <CardFooter className="flex flex-col">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-4 w-3/4" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="lg:sticky lg:top-28">
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row justify-between items-baseline">
          <span className="text-2xl font-semibold">
            ₹20,000 <span className="text-base font-normal">night</span>
          </span>
          <span className="flex items-center text-sm mt-2 sm:mt-0">
            <Star className="h-4 w-4 fill-current text-primary mr-1" />
            0 · <span className="underline ml-1">No reviews</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <div>
                  <div className="text-xs font-bold">CHECK-IN</div>
                  <div>{date.from ? date.from.toLocaleDateString() : "Add date"}</div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date.from}
                selected={date}
                onSelect={(value: any) => setDate(value)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <div>
                  <div className="text-xs font-bold">CHECKOUT</div>
                  <div>{date.to ? date.to.toLocaleDateString() : "Add date"}</div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date.from}
                selected={date}
                onSelect={(value: any) => setDate(value)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Select value={guests} onValueChange={setGuests}>
          <SelectTrigger>
            <div>
              <div className="text-xs font-bold">GUESTS</div>
              <div>
                {guests} guest{Number(guests) > 1 ? "s" : ""}
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num} guest{num > 1 ? "s" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full mb-4" onClick={handleReserve}>
          Reserve
        </Button>
        <p className="text-center text-sm text-gray-500">You won't be charged yet</p>
        <div className="mt-4 space-y-2 w-full">
          <div className="flex justify-between">
            <span className="underline">₹20,000 x {totals.nights} nights</span>
            <span>₹{totals.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Cleaning fee</span>
            <span>₹{totals.cleaningFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Majestic Escape service fee</span>
            <span>₹{totals.serviceFee.toLocaleString()}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t w-full">
          <div className="flex justify-between font-semibold">
            <span>Total before taxes</span>
            <span>₹{totals.total.toLocaleString()}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

