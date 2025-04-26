"use client";
import { useEffect, useState, useRef } from "react";

// Import Leaflet only on client side
const getLeaflet = async () => {
  if (typeof window !== "undefined") {
    const L = (await import("leaflet")).default;
    await import("leaflet/dist/leaflet.css");
    return L;
  }
  return null;
};

export default function Location({ property }) {
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const initializeMap = async () => {
      try {
        // Clean up existing map instance if it exists
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }

        // Get Leaflet instance
        if (!leafletRef.current) {
          leafletRef.current = await getLeaflet();
        }

        const L = leafletRef.current;
        if (!L || !containerRef.current) return;

        // Wait a brief moment to ensure DOM is ready
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Initialize map
        mapRef.current = L.map(containerRef.current, {
          center: [property?.latitude || 51.505, property?.longitude || -0.09],
          zoom: 13,
          zoomControl: false,
        });

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);

        // Add zoom control
        L.control.zoom({ position: "topright" }).addTo(mapRef.current);

        // Add marker
        const icon = L.icon({
          iconUrl: "/home.png",
          iconSize: [38, 38],
          iconAnchor: [19, 38],
          popupAnchor: [0, -38],
        });

        L.marker([property?.latitude || 51.505, property?.longitude || -0.09], {
          icon,
        }).addTo(mapRef.current);

        // Force a resize check
        mapRef.current.invalidateSize();
      } catch (error) {
        console.error("Map initialization error:", error);
      }
    };

    if (isClient) {
      initializeMap();
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isClient, property?.latitude, property?.longitude]);

  const handleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await containerRef.current.requestFullscreen();
      }

      // Give the map a moment to adjust to the new size
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 100);
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  if (!isClient) {
    return (
      <div className="sm:pt-[350px]">
        <div className="max-w-xl p-4">
          <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="sm:pt-[350px]">
      <div className="max-w-xl p-4">
        <h2 className="text-2xl font-semibold mb-2">{property?.title}</h2>
        <p className="text-gray-600 mb-4">{property?.location}</p>
        <div className="relative">
          <div
            ref={containerRef}
            className="h-[400px] rounded-lg overflow-hidden"
          />
          <button
            className="absolute top-2 left-2 bg-white p-2 rounded-md shadow-md z-[1000] hover:bg-gray-100 transition-colors duration-200"
            onClick={handleFullscreen}
            aria-label="Toggle fullscreen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
