/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import Image from "next/image"
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type PropertyImage = {
  src: string
  alt: string
}

interface PropertyCarouselProps {
  images: PropertyImage[]
}

export default function PropertyCarousel({ images }: PropertyCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
      }

      emblaApi.on('select', onSelect)
      onSelect()

      return () => {
        emblaApi.off('select', onSelect)
      }
    }
  }, [emblaApi])

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-1">
        <div className="relative overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <div className="relative aspect-square">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500} // Replace with actual width
                    height={500} // Replace with actual height
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-between p-4">
            {canScrollPrev && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/70 hover:bg-white/90"
                onClick={scrollPrev}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            {canScrollNext && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/70 hover:bg-white/90"
                onClick={scrollNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
