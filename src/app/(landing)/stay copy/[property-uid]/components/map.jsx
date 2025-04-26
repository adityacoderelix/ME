"use client";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import { Icon } from "leaflet";

export default function Map({ property }) {
  const center = [property?.latitude || 51.505, property?.longitude || -0.09];

  const customIcon = new Icon({
    iconUrl: "/home.png",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={customIcon} />
      <ZoomControl position="topright" />
    </MapContainer>
  );
}
