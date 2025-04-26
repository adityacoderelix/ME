"use client"

import { useState } from "react"
import { addMonths, format, isSameMonth, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"
import { ChevronLeft, ChevronRight, Upload, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const FullCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })
  const [blockReason, setBlockReason] = useState("")
  const [syncPlatform, setSyncPlatform] = useState("")
  const [iCalUrl, setICalUrl] = useState("")
  const [offers, setOffers] = useState([])
  const [pricing, setPricing] = useState({})
  const [reservedDates, setReservedDates] = useState([])
  const [blockedDates, setBlockedDates] = useState([])

  const handlePrevMonth = () => setCurrentDate(addMonths(currentDate, -1))
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const handleDateClick = (date) => {
    setSelectedDate(date)
    setDateRange({ from: date, to: undefined })
    setIsDialogOpen(true)
  }

  const handleBlockDates = () => {
    if (dateRange.from && dateRange.to) {
      const dates = eachDayOfInterval({ start: dateRange.from, end: dateRange.to })
      setBlockedDates([...blockedDates, ...dates])
    } else if (dateRange.from) {
      setBlockedDates([...blockedDates, dateRange.from])
    }
    setIsDialogOpen(false)
    setBlockReason("")
  }

  const handleReserveDates = () => {
    if (dateRange.from && dateRange.to) {
      const dates = eachDayOfInterval({ start: dateRange.from, end: dateRange.to })
      setReservedDates([...reservedDates, ...dates])
    } else if (dateRange.from) {
      setReservedDates([...reservedDates, dateRange.from])
    }
    setIsDialogOpen(false)
  }

  const handleSyncCalendar = () => {
    if (syncPlatform === "google") {
      console.log("Syncing with Google Calendar")
      // Implement Google Calendar sync logic here
    } else if (syncPlatform === "ical") {
      console.log("Syncing with iCal URL:", iCalUrl)
      // Implement iCal sync logic here
    }
  }

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

    return (
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}
        {monthDays.map((day) => {
          const isReserved = reservedDates.some((date) => isSameDay(date, day))
          const isBlocked = blockedDates.some((date) => isSameDay(date, day))
          const dayPrice = pricing[format(day, "yyyy-MM-dd")] || ""
          return (
            <Button
              key={day.toString()}
              variant="outline"
              className={`h-16 relative ${
                !isSameMonth(day, currentDate) ? "opacity-50" : ""
              } ${isReserved ? "!bg-green-500 hover:!bg-green-600 !text-white" : ""} ${
                isBlocked ? "!bg-red-400 hover:!bg-red-500 !text-white" : ""
              }`}
              onClick={() => handleDateClick(day)}
            >
              <span className="absolute top-1 left-1 text-sm font-semibold">{format(day, "d")}</span>
              <span className="absolute bottom-1 right-1 text-xs font-medium">${dayPrice}</span>
              {isReserved && <span className="absolute bottom-1 left-1 text-xs font-medium">Reserved</span>}
              {isBlocked && <span className="absolute bottom-1 left-1 text-xs font-medium">Blocked</span>}
            </Button>
          )
        })}
      </div>
    )
  }

  const handleAddOffer = (offer) => {
    setOffers([...offers, offer])
  }

  const handleRemoveOffer = (offerId) => {
    setOffers(offers.filter((offer) => offer.id !== offerId))
  }

  const handleSetPricing = (date, price) => {
    setPricing({ ...pricing, [format(date, "yyyy-MM-dd")]: price })
  }

  const handleDialogSubmit = () => {
    const selectedTab = document.querySelector('[role="tab"][aria-selected="true"]').getAttribute("value")

    if (selectedTab === "block") {
      handleBlockDates()
    } else if (selectedTab === "reserve") {
      handleReserveDates()
    } else if (selectedTab === "offer") {
      const offerName = document.getElementById("offerName").value
      const offerDiscount = document.getElementById("offerDiscount").value
      handleAddOffer({ id: Date.now(), name: offerName, discount: offerDiscount })
    } else if (selectedTab === "pricing") {
      const price = document.getElementById("price").value
      if (dateRange.from && dateRange.to) {
        const dates = eachDayOfInterval({ start: dateRange.from, end: dateRange.to })
        dates.forEach((date) => handleSetPricing(date, price))
      } else if (dateRange.from) {
        handleSetPricing(dateRange.from, price)
      }
    }

    setIsDialogOpen(false)
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{format(currentDate, "MMMM yyyy")}</CardTitle>
          <div>
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth} className="ml-2">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>{renderCalendar()}</CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 bg-green-500 mr-2"></span>
              <span className="text-sm font-medium">Reserved</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 bg-red-400 mr-2"></span>
              <span className="text-sm font-medium">Blocked</span>
            </div>
          </div>
          <Button onClick={() => setCurrentDate(new Date())}>Today</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calendar Sync</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="import">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="import">Import Calendar</TabsTrigger>
              <TabsTrigger value="export">Export Calendar</TabsTrigger>
            </TabsList>
            <TabsContent value="import">
              <div className="space-y-4">
                <Select onValueChange={setSyncPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform to sync from" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Calendar</SelectItem>
                    <SelectItem value="ical">iCal URL</SelectItem>
                  </SelectContent>
                </Select>
                {syncPlatform === "ical" && (
                  <Input placeholder="Enter iCal URL" value={iCalUrl} onChange={(e) => setICalUrl(e.target.value)} />
                )}
                <Button
                  className="bg-primaryGreen hover:bg-brightGreen"
                  onClick={handleSyncCalendar}
                  disabled={!syncPlatform || (syncPlatform === "ical" && !iCalUrl)}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Import Calendar
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="export">
              <div className="space-y-4">
                <p>Export your calendar to use on other platforms:</p>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Export as iCal
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Current Offers</CardTitle>
        </CardHeader>
        <CardContent>
          {offers.length === 0 ? (
            <p>No current offers</p>
          ) : (
            <ul>
              {offers.map((offer) => (
                <li key={offer.id} className="flex justify-between items-center mb-2">
                  <span>
                    {offer.name} - {offer.discount}% off
                  </span>
                  <Button variant="destructive" onClick={() => handleRemoveOffer(offer.id)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Manage Date</DialogTitle>
            <DialogDescription>
              Block, reserve dates, add offers, or set pricing for the selected date range.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className="rounded-md border"
            />
            <Tabs defaultValue="block">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="block">Block</TabsTrigger>
                <TabsTrigger value="reserve">Reserve</TabsTrigger>
                <TabsTrigger value="offer">Offer</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>
              <TabsContent value="block">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reason" className="text-right">
                    Reason
                  </Label>
                  <Input
                    id="reason"
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </TabsContent>
              <TabsContent value="reserve">
                <p>Click submit to reserve the selected date range.</p>
              </TabsContent>
              <TabsContent value="offer">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="offerName" className="text-right">
                    Offer Name
                  </Label>
                  <Input id="offerName" className="col-span-3" />
                  <Label htmlFor="offerDiscount" className="text-right">
                    Discount %
                  </Label>
                  <Input id="offerDiscount" type="number" className="col-span-3" />
                </div>
              </TabsContent>
              <TabsContent value="pricing">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input id="price" type="number" className="col-span-3" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleDialogSubmit}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default FullCalendarPage

