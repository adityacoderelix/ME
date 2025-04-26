/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { VisuallyHidden } from "@/components/ui/visually-hidden"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function InfoDialog({ isOpen, onClose, property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const DialogComponent = isMobile ? Drawer : Dialog
  const DialogContentComponent = isMobile ? DrawerContent : DialogContent
  const DialogHeaderComponent = isMobile ? DrawerHeader : DialogHeader
  const DialogTitleComponent = isMobile ? DrawerTitle : DialogTitle

  const content = (
    <>
      <DialogHeaderComponent>
      <VisuallyHidden>
      <DialogTitle>Property Info</DialogTitle>
    </VisuallyHidden>
        <DialogTitleComponent>{property.title}</DialogTitleComponent>
     
      </DialogHeaderComponent>
      <div className="px-6 py-2">
        <p className="text-gray-600">{property.location}</p>
        <div className="grid gap-4 py-4">
          {/* <div className="flex justify-between py-2">
            <span className="text-gray-600">Price per night</span>
            <span className="font-medium">₹{property.price}</span>
          </div> */}
          {/* <div className="flex justify-between py-2">
            <span className="text-gray-600">Available dates</span>
            <span className="font-medium">{property.dateRange}</span>
          </div> */}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Property Images</h3>
          <div className="grid grid-cols-4 gap-2">
            {property?.images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative rounded-md overflow-hidden ${
                  currentImageIndex === idx ? "ring-2 ring-primary" : ""
                }`}
              >
                <Image
                  width={500}
                  height={500}
                  src={image}
                  alt={`${property.title} thumbnail ${idx + 1}`}
                  className="w-full aspect-square object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>{content}</DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">{content}</DialogContent>
    </Dialog>
  )
}

