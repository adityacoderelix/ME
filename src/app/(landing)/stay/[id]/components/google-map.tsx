"use client"

import { useEffect, useRef } from "react"

interface GoogleMapProps {
  lat: number
  lng: number
}

export default function GoogleMap({ lat, lng }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window.google === "undefined") {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      document.head.appendChild(script)
      script.onload = initMap
    } else {
      initMap()
    }

    function initMap() {
      if (mapRef.current) {
        new window.google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: 15,
        })
      }
    }

    return () => {
      const script = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')
      if (script) {
        document.head.removeChild(script)
      }
    }
  }, [lat, lng])

  return <div ref={mapRef} className="w-full h-[400px] rounded-lg" />
}

