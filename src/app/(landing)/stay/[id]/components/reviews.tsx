"use client"

import { Star } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import ReviewsModal from "./review-modal"

interface ReviewsProps {
  reviews: {
    rating: number
    count: number
  }
  isLoading: boolean
}

export default function Reviews({ reviews, isLoading }: ReviewsProps) {
  const [isReviewsOpen, setIsReviewsOpen] = useState(false)

  if (isLoading) {
    return (
      <section className="mt-12 border-t pt-12">
        <Skeleton className="h-8 w-1/4 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="mt-4 md:mt-12 border-t pt-4 md:pt-12">
        <button
          onClick={() => setIsReviewsOpen(true)}
          className="text-xl md:text-2xl font-semibold mb-2 md:mb-6 flex items-center hover:opacity-80"
        >
          <Star className="h-5 w-5 fill-current text-primary mr-2" />
          {reviews?.rating} · {reviews?.count} reviews
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Cleanliness</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "98%" }}></div>
              </div>
              <span>4.9</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Accuracy</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "96%" }}></div>
              </div>
              <span>4.8</span>
            </div>
          </div>
        </div>
      </section>
      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
        rating={reviews?.rating}
        count={reviews?.count}
      />
    </>
  )
}

