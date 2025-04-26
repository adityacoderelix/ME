'use client'

import { useState, useMemo, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Filter, Star, X } from 'lucide-react'
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const generateRandomBooking = (id: number) => {
  const properties = [
    "Casa Belo - Chic 1BHK Serviced apt | Pool + Gym",
    "Modern & Comfortable - 1 BHK w/ AC & Fast Wifi",
    "Luxurious Villa with Ocean View",
    "Cozy Mountain Retreat",
    "Urban Loft in City Center"
  ]
  const locations = ["North Goa, India", "Deulwada Aramboi, India", "Bali, Indonesia", "Swiss Alps", "New York, USA"]
  const hosts = ["Nanda and Noopur", "Ricardo", "Emma", "John", "Sarah"]
  const statuses = ["Confirmed", "Pending", "Cancelled"]
  const prices = [11000, 17000, 25000, 9000, 30000]

  const randomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }

  const now = new Date()
  const pastDate = randomDate(new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()), now)
  const futureDate = randomDate(now, new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()))
  
  const isPast = Math.random() > 0.5
  const checkIn = isPast ? pastDate : futureDate
  const checkOut = new Date(checkIn.getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000)

  return {
    id,
    property: properties[Math.floor(Math.random() * properties.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    host: hosts[Math.floor(Math.random() * hosts.length)],
    rating: (Math.random() * 1 + 4).toFixed(1),
    reviews: Math.floor(Math.random() * 100),
    checkIn,
    checkOut,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    price: prices[Math.floor(Math.random() * prices.length)],
    nights: Math.floor((checkOut.getTime() - checkIn.getTime()) / (24 * 60 * 60 * 1000))
  }
}

type Booking = ReturnType<typeof generateRandomBooking>
interface FilterState {
  location: string
  minPrice: string
  maxPrice: string
}

const FilterDialog = ({ 
  open, 
  onOpenChange, 
  filters, 
  onFilterChange, 
  onApply, 
  onClear 
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: { location: string; minPrice: string; maxPrice: string }
  onFilterChange: (field: keyof FilterState, value: string) => void
  onApply: () => void
  onClear: () => void
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Bookings</DialogTitle>
          <DialogDescription>
            Apply filters to find specific bookings
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">Location</Label>
            <Input
              id="location"
              value={filters.location}
              onChange={(e) => onFilterChange('location', e.target.value)}
              className="col-span-3"
              placeholder="Enter location"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minPrice" className="text-right">Min Price</Label>
            <Input
              id="minPrice"
              type="number"
              value={filters.minPrice}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              className="col-span-3"
              placeholder="Minimum price"
              min="0"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maxPrice" className="text-right">Max Price</Label>
            <Input
              id="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              className="col-span-3"
              placeholder="Maximum price"
              min="0"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClear}>
            Clear Filters
          </Button>
          <Button onClick={onApply}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const ManageBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [activeTab, setActiveTab] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [tempFilters, setTempFilters] = useState({ location: '', minPrice: '', maxPrice: '' })
  const [appliedFilters, setAppliedFilters] = useState({ location: '', minPrice: '', maxPrice: '' })
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    setBookings(Array.from({ length: 20 }, (_, i) => generateRandomBooking(i + 1)))
    setIsLoading(false)
  }, [])

  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const isUpcoming = booking.checkIn > new Date()
      const isPast = booking.checkOut < new Date()
      const isCancelled = booking.status === 'Cancelled'

      const matchesTab = 
        (activeTab === 'all') ||
        (activeTab === 'upcoming' && isUpcoming) ||
        (activeTab === 'past' && isPast) ||
        (activeTab === 'cancelled' && isCancelled)

        const matchesLocation = !appliedFilters.location || 
        booking.location.toLowerCase().includes(appliedFilters.location.toLowerCase())
      
      const matchesMinPrice = !appliedFilters.minPrice || 
        booking.price >= parseInt(appliedFilters.minPrice)
      
      const matchesMaxPrice = !appliedFilters.maxPrice || 
        booking.price <= parseInt(appliedFilters.maxPrice)

      return matchesTab && matchesLocation && matchesMinPrice && matchesMaxPrice
    })
  }, [bookings, activeTab,  appliedFilters])

  const handleClearFilters = () => {
    const emptyFilters = { location: '', minPrice: '', maxPrice: '' }
    setTempFilters(emptyFilters)
    setAppliedFilters(emptyFilters)
    setShowFilters(false)
  }

  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters)
    setShowFilters(false)
  }

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setTempFilters(prev => ({ ...prev, [field]: value }))
  }

  const removeFilter = (field: keyof FilterState) => {
    setAppliedFilters(prev => ({ ...prev, [field]: '' }))
    setTempFilters(prev => ({ ...prev, [field]: '' }))
  }

  

  if (isLoading) {
    return<div>Loading...</div>
  }

  return (
    <main className='py-16 md:py-24'>

   
      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <h1 className="text-2xl font-bricolage text-absoluteDark font-bold">My Booking</h1>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
            <TabsList className="h-auto p-0 bg-transparent border-b border-gray-200 w-full lg:w-auto flex flex-wrap">
              {[
                { value: 'all', label: 'All' },
                { value: 'upcoming', label: 'Upcoming' },
                { value: 'past', label: 'Past' },
                { value: 'cancelled', label: 'Cancelled' },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative h-9 rounded-none border-b-2 border-transparent px-2 sm:px-4 pb-3 pt-2 text-sm sm:text-base font-semibold text-muted-foreground data-[state=active]:border-primaryGreen data-[state=active]:text-primaryGreen "
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <FilterDialog
            open={showFilters}
            onOpenChange={setShowFilters}
            filters={tempFilters}
            onFilterChange={handleFilterChange}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        </div>

        

        {/* Active Filters Display */}
        {(appliedFilters.location || appliedFilters.minPrice || appliedFilters.maxPrice) && (
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Active filters:</span>
            {appliedFilters.location && (
              <Badge variant="secondary" className="gap-1">
                Location: {appliedFilters.location}
                <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter('location')} />
              </Badge>
            )}
            {appliedFilters.minPrice && (
              <Badge variant="secondary" className="gap-1">
                Min Price: ₹{appliedFilters.minPrice}
                <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter('minPrice')} />
              </Badge>
            )}
            {appliedFilters.maxPrice && (
              <Badge variant="secondary" className="gap-1">
                Max Price: ₹{appliedFilters.maxPrice}
                <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter('maxPrice')} />
              </Badge>
            )}
          </div>
        )}

        <div className="space-y-4">
          <div className="hidden lg:grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 px-4 py-2 bg-muted text-sm font-medium">
            <div>Property</div>
            <div>Date</div>
            <div>Status</div>
            <div>Price</div>
            <div>Action</div>
          </div>

          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="p-4 hidden">
              <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <Image
                    alt="Property"
                    className="rounded-lg object-cover w-full lg:w-24 h-48 lg:h-24"
                    height={96}
                    src="/placeholder.svg"
                    width={96}
                  />
                  <div className="space-y-2">
                    <h3 className="font-medium">{booking.property}</h3>
                    <p className="text-sm text-muted-foreground">Entire rental unit in {booking.location}</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage alt="Host" src="/placeholder.svg" />
                        <AvatarFallback>H</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Hosted by</span> {booking.host}
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-primaryGreen text-primaryGreen" />
                          <span className="font-medium">{booking.rating}</span>
                          <span className="text-muted-foreground">({booking.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 lg:space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div className="text-sm">
                      <div className="text-muted-foreground">Check in</div>
                      <div>{booking.checkIn.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div className="text-sm">
                      <div className="text-muted-foreground">Check out</div>
                      <div>{booking.checkOut.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Badge 
                    variant="secondary" 
                    className={`
                      ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : ''}
                      ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                      ${booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' : ''}
                      hover:bg-opacity-80
                    `}
                  >
                    {booking.status}
                  </Badge>
                </div>

                <div>
                  <div className="font-medium">₹{booking.price.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total {booking.nights} nights</div>
                </div>

                <div className="">
                  <Button variant="outline"  size="sm" className="bg-primaryGreen text-white py-3 rounded-md w-full">
                    View Details
                  </Button>
                
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      </main>
   
  )
}

export default ManageBookings