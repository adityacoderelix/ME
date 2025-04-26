"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ReviewsModalProps {
  isOpen: boolean
  onClose: () => void
  rating: number
  count: number
}

export default function ReviewsModal({ isOpen, onClose, rating, count }: ReviewsModalProps) {
  const reviews = [
    {
      id: 1,
      author: "Sarah",
      avatar: "/placeholder.svg",
      date: "January 2024",
      rating: 5,
      content: "Amazing property with stunning views. Everything was perfect!",
      helpful: 12,
    },
    {
      id: 2,
      author: "Michael",
      avatar: "/placeholder.svg",
      date: "December 2023",
      rating: 5,
      content: "Exceptional stay! The host was very accommodating and the property is beautiful.",
      helpful: 8,
    },
    // Add more mock reviews
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-semibold">
            <Star className="h-5 w-5 fill-primary text-primary mr-2" />
            {rating} · {count} reviews
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-8 last:border-0">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{review.author}</h3>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <p className="mt-4">{review.content}</p>
              <button className="mt-4 flex items-center text-sm text-gray-500 hover:text-gray-700">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Helpful · {review.helpful}
              </button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

