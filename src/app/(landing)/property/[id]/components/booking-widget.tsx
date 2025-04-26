import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface BookingWidgetProps {
  isLoading: boolean
}

export default function BookingWidget({ isLoading }: BookingWidgetProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full mb-4" />
          <Skeleton className="h-10 w-full mb-4" />
        </CardContent>
        <CardFooter className="flex flex-col">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-4 w-3/4" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="lg:sticky lg:top-28">
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row justify-between items-baseline">
          <span className="text-2xl font-semibold">
            ₹65,000 <span className="text-base font-normal">night</span>
          </span>
          <span className="flex items-center text-sm mt-2 sm:mt-0">
            <Star className="h-4 w-4 fill-current text-primary mr-1" />
            4.91 · <span className="underline ml-1">139 reviews</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="border rounded-tl-lg rounded-bl-lg p-2">
            <div className="text-xs font-bold">CHECK-IN</div>
            <div>7/14/2023</div>
          </div>
          <div className="border rounded-tr-lg rounded-br-lg p-2">
            <div className="text-xs font-bold">CHECKOUT</div>
            <div>7/19/2023</div>
          </div>
        </div>
        <div className="border rounded-lg p-2 mb-4">
          <div className="text-xs font-bold">GUESTS</div>
          <div>1 guest</div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full mb-4">Reserve</Button>
        <p className="text-center text-sm text-gray-500">You won't be charged yet</p>
        <div className="mt-4 space-y-2 w-full">
          <div className="flex justify-between">
            <span className="underline">₹65,000 x 5 nights</span>
            <span>₹3,25,000</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Cleaning fee</span>
            <span>₹10,000</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Airbnb service fee</span>
            <span>₹47,025</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t w-full">
          <div className="flex justify-between font-semibold">
            <span>Total before taxes</span>
            <span>₹3,82,025</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

