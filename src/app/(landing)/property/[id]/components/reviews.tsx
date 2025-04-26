import { Star } from "lucide-react"

interface ReviewsProps {
  reviews: {
    rating: number
    count: number
  }
}

export default function Reviews({ reviews = { rating: 0, count: 0 } }: ReviewsProps) {
  return (
    <section className="mt-12 border-t pt-12">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <Star className="h-5 w-5 fill-current text-primary mr-2" />
        {reviews?.rating?.toFixed(2) ?? "N/A"} · {reviews?.count ?? 0} reviews
      </h2>
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
  )
}

