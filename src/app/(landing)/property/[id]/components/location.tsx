import GoogleMap from "./google-map"

interface LocationProps {
  locationInfo: {
    description: string
    lat: number
    lng: number
  }
}

export default function Location({ locationInfo = { description: "", lat: 0, lng: 0 } }: LocationProps) {
  return (
    <section className="mt-12 border-t pt-12">
      <h2 className="text-2xl font-semibold mb-6">Where you'll be</h2>
      <div className="mb-6">
        <GoogleMap lat={locationInfo.lat ?? 0} lng={locationInfo.lng ?? 0} />
      </div>
      <h3 className="font-semibold mb-2">Lonavala, Maharashtra, India</h3>
      <p className="text-gray-500 mb-4">{locationInfo.description ?? "No description available."}</p>
      <button className="font-semibold underline">Show more</button>
    </section>
  )
}

