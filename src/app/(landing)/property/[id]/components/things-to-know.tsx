import { Clock, Ban, Book } from "lucide-react"

interface ThingsToKnowProps {
  thingsToKnow: {
    houseRules: string[]
    safety: string[]
    cancellation: string
  }
}

export default function ThingsToKnow({
  thingsToKnow = { houseRules: [], safety: [], cancellation: "" },
}: ThingsToKnowProps) {
  return (
    <section className="mt-12 border-t pt-12">
      <h2 className="text-2xl font-semibold mb-6">Things to know</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold mb-4 flex items-center">
            <Clock className="h-6 w-6 mr-2" />
            House rules
          </h3>
          <ul className="space-y-2 text-sm">
            {thingsToKnow.houseRules?.map((rule, index) => <li key={index}>{rule}</li>) ?? (
              <li>No house rules specified.</li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 flex items-center">
            <Ban className="h-6 w-6 mr-2" />
            Safety & property
          </h3>
          <ul className="space-y-2 text-sm">
            {thingsToKnow.safety?.map((item, index) => <li key={index}>{item}</li>) ?? (
              <li>No safety information available.</li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 flex items-center">
            <Book className="h-6 w-6 mr-2" />
            Cancellation policy
          </h3>
          <p className="text-sm">{thingsToKnow.cancellation || "No cancellation policy specified."}</p>
        </div>
      </div>
    </section>
  )
}

