/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Loader } from 'lucide-react'



export function AddressDetails({ updateFormData, formData }) {
  const [address, setAddress] = useState(formData?.address || '')
  const [useGoogleMaps, setUseGoogleMaps] = useState(false)
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`
    script.async = true
    script.onload = initMap
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const initMap = () => {
    const mapOptions = {
      center: { lat: 20.5937, lng: 78.9629 }, // Center of India
      zoom: 5,
    }
    const newMap = new window.google.maps.Map(document.getElementById('map'), mapOptions)
    setMap(newMap)
    setIsLoading(false)

    const newMarker = new window.google.maps.Marker({
      map: newMap,
      draggable: true,
    })
    setMarker(newMarker)

    newMap.addListener('click', (e) => {
      newMarker.setPosition(e.latLng)
      updateAddressFromLatLng(e.latLng)
    })

    newMarker.addListener('dragend', () => {
      updateAddressFromLatLng(newMarker.getPosition())
    })

    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('address-input')
    )
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.geometry) {
        newMap.setCenter(place.geometry.location)
        newMap.setZoom(15)
        newMarker.setPosition(place.geometry.location)
        setAddress(place.formatted_address)
        updateFormData({ address: place.formatted_address })
      }
    })
  }

  const updateAddressFromLatLng = (latLng) => {
    if (latLng) {
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setAddress(results[0].formatted_address)
          updateFormData({ address: results[0].formatted_address })
        }
      })
    }
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
    updateFormData({ address: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="address" className="text-lg font-medium">Property Address</Label>
        <div className="mt-1 space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="useGoogleMaps"
              checked={useGoogleMaps}
              onCheckedChange={setUseGoogleMaps}
            />
            <Label htmlFor="useGoogleMaps">Use Google Maps to set location</Label>
          </div>
          {useGoogleMaps ? (
            <>
              <Input
                id="address-input"
                type="text"
                placeholder="Search for address"
                className="w-full"
              />
              <div id="map" style={{ height: '400px', width: '100%' }} className="rounded-md">
                {isLoading && (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <Loader className="h-8 w-8 animate-spin text-gray-500" />
                  </div>
                )}
              </div>
            </>
          ) : (
            <Textarea
              id="address"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter the full address of your property"
              rows={4}
            />
          )}
        </div>
      </div>
    </div>
  )
}

