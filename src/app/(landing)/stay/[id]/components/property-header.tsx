import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PropertyHeader() {
  return (
    <div className="border-b pb-6 mb-6">
      <div className="flex items-center gap-4 mt-6">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Host" />
          <AvatarFallback>RH</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-medium">Hosted by Rohan</h2>
          <p className="text-gray-600">2 years hosting</p>
        </div>
      </div>
    </div>
  )
}

