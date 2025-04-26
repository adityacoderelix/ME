"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

export default function PriceCard({ property }) {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState(1);

  // Calculate number of nights
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

  // Calculate totals
  const basePrice = property.price.base * nights;
  const total =
    basePrice +
    property.price.cleaning +
    property.price.service +
    property.price.tax;

  return (
    <div className="max-w-md mx-auto pt-6">
      <div className="rounded-lg custom-border-2 p-6 space-y-6">
        {/* Price per night */}
        <div className="flex items-baseline gap-1">
          <span className="text-xl text-[#46921E] font-semibold">
            ₹{property.price.base.toLocaleString()}
          </span>
          <span className="text-black text-xl">/ night</span>
        </div>

        {/* Stay details */}
        <div className="text-[#707070] text-base">
          {property.capacity.guests} guests · {property.capacity.bedrooms}{" "}
          bedroom · {property.capacity.beds} bed · {property.capacity.bathrooms}{" "}
          bathrooms
        </div>

        {/* Date and Guest Selection */}
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="justify-start text-left font-normal h-14 rounded-none border-r"
                >
                  <div>
                    <div className="text-xs mb-1">CHECK-IN</div>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "dd/MM/yyyy") : "Add date"}
                    </div>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="justify-start text-left font-normal h-14 rounded-none"
                >
                  <div>
                    <div className="text-xs mb-1 ">CHECK-OUT</div>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "dd/MM/yyyy") : "Add date"}
                    </div>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="border-t">
            <Select
              value={guests.toString()}
              onValueChange={(value) => setGuests(parseInt(value))}
            >
              <SelectTrigger className="border-0 rounded-none h-14">
                <div>
                  <div className="text-xs font-semibold mb-1 text-left">
                    GUESTS
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-[#707070] text-base">
                      {guests} guest{guests !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                {Array.from(
                  { length: property.capacity.guests },
                  (_, i) => i + 1
                ).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} guest{num !== 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              ₹{property.price.base.toLocaleString()}
              <span className="text-[#707070] text-base">
                × {nights} nights
              </span>
            </div>
            <div>₹{basePrice.toLocaleString()}</div>
          </div>

          <div className="flex justify-between">
            <div>Cleaning Fee</div>
            <div>₹{property.price.cleaning}</div>
          </div>

          <div className="flex justify-between">
            <div>Service Fee</div>
            <div>₹{property.price.service}</div>
          </div>

          <div className="flex justify-between">
            <div>Taxes</div>
            <div>₹{property.price.tax}</div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-semibold">
              <div>Total</div>
              <div className="text-base font-medium">
                ₹{total.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Reserve Button */}
        <Button className="w-full bg-[#36621F] hover:bg-[#2d5119] text-white rounded-full h-12">
          Reserve
        </Button>
      </div>
    </div>
  );
}
