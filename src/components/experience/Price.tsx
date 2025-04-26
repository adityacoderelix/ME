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
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  data: typeof import("../../lib/experience/data").priceData;
}

const font = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

const fonts = Inter({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Price({ data }: BookingCardProps) {
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    new Date(data.defaultDates.checkIn)
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    new Date(data.defaultDates.checkOut)
  );
  const [guests, setGuests] = useState(1);

  // Calculate number of nights
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

  // Calculate totals
  const basePrice = data.pricePerNight * nights;
  const total =
    basePrice +
    data.fees.platformFees +
    data.fees.serviceFees -
    data.fees.discount;

  return (
    <div className="max-w-md mx-auto pt-6">
      <div className="rounded-lg custom-border-2 p-6 space-y-6">
        {/* Price per night */}
        <div className="flex items-baseline gap-1">
          <span className="text-xl text-[#46921E] font-semibold">
            {" "}
            ₹{data.pricePerNight.toLocaleString()}
          </span>
          <span className={cn("text-black text-xl", font.className)}>
            / night
          </span>
        </div>

        {/* Stay details */}
        <div className={cn("text-[#707070] text-base", fonts.className)}>
          {data.stayDetails.guests} guests · {data.stayDetails.bedrooms} bedroom
          · {data.stayDetails.beds} bed · {data.stayDetails.bathrooms} bathrooms
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
                    <div className={cn("text-xs mb-1", fonts.className)}>
                      CHECK-IN
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon
                        className={cn("mr-2 h-4 w-4", font.className)}
                      />
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
                    <div className={cn("text-xs mb-1 ", fonts.className)}>
                      CHECK-OUT
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon
                        className={cn("mr-2 h-4 w-4", font.className)}
                      />
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
                  <div
                    className={cn(
                      "text-xs font-semibold mb-1 text-left",
                      fonts.className
                    )}
                  >
                    GUESTS
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span
                      className={cn(
                        "text-[#707070] text-base",
                        fonts.className
                      )}
                    >
                      {guests} guest{guests !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: data.maxGuests }, (_, i) => i + 1).map(
                  (num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} guest{num !== 1 ? "s" : ""}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              ₹{data.pricePerNight.toLocaleString()}
              <span className={cn("text-[#707070] text-base", fonts.className)}>
                × {nights} nights
              </span>
            </div>
            <div>₹{basePrice.toLocaleString()}</div>
          </div>

          <div className="flex justify-between">
            <div>Discount</div>
            <div className="text-green-600">-₹{data.fees.discount}</div>
          </div>

          <div className="flex justify-between">
            <div>Platform Fees</div>
            <div>₹{data.fees.platformFees}</div>
          </div>

          <div className="flex justify-between">
            <div>Service Fees</div>
            <div>₹{data.fees.serviceFees}</div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-semibold">
              <div>Total before taxes</div>
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
