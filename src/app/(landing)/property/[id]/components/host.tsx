import { Star, Award, Shield } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HostProps {
  host: {
    name: string
    joinDate: string
    isSuperhost: boolean
    avatar: string
  }
}

export default function Host({ host = { name: "", joinDate: "", isSuperhost: false, avatar: "" } }: HostProps) {
  return (
    <section className="mt-12 border-t pt-12">
      <div className="flex items-center mb-6">
        <Image
          src={host.avatar || "/placeholder.svg"}
          alt={host.name || "Host"}
          width={56}
          height={56}
          className="rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-semibold">Hosted by {host.name || "Anonymous"}</h2>
          <p className="text-gray-500">Joined in {host.joinDate || "N/A"}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-primary mr-2" />
          <span>1,378 Reviews</span>
        </div>
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-primary mr-2" />
          <span>Identity verified</span>
        </div>
        {host.isSuperhost && (
          <div className="flex items-center">
            <Award className="h-5 w-5 text-primary mr-2" />
            <span>Superhost</span>
          </div>
        )}
      </div>
      <p className="mb-4">
        Hi, I'm {host.name || "Your Host"}! I'm passionate about providing exceptional hospitality experiences. I love
        sharing the beauty of Lonavala with guests from around the world.
      </p>
      <p className="mb-4">
        As a Superhost, I ensure that every detail is taken care of to make your stay comfortable and memorable. Feel
        free to reach out if you have any questions!
      </p>
      <Button variant="outline" className="mb-6">
        Contact Host
      </Button>
      <div className="flex items-center space-x-4 text-sm">
        <Shield className="h-5 w-5 flex-shrink-0" />
        <p>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</p>
      </div>
    </section>
  )
}

