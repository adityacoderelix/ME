/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function  PropertyCarousel({prizes}) {
  return (
    <div className=" w-full">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {prizes.map((prize, index) => (
            <CarouselItem key={index}>
              <Card  className="relative overflow-hidden">
                <img
                  src={prize.src}
                  alt={prize.alt}
                  className="rounded-md w-full h-auto"
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <CarouselPrevious className="h-8 w-8 rounded-full opacity-70 hover:opacity-100" />
                  <CarouselNext className="h-8 w-8 rounded-full opacity-70 hover:opacity-100" />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

