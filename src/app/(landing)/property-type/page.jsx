"use client";
import FilterProperties from "@/components/filter-properties";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function FarmHouse() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const guests = searchParams.get("adults");
  const location = searchParams.get("location");
  const senior = searchParams.get("senior");
  const children = searchParams.get("children");
  const infants = searchParams.get("infants");
  const property = searchParams.get("propertyType");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDates() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/properties/search-properties`,
          {
            params: {
              location: location,
              from: from ? new Date(from).toISOString() : undefined,
              to: to ? new Date(to).toISOString() : undefined,
              guests: guests,
              propertyType: property,
            },
          }
        );

        // Check if response is successful
        if (response.status !== 200) {
          toast.error("There was some error. Try Again");
          return;
        }

        // Check if response data exists and has the expected structure
        if (!response.data || !response.data.data) {
          toast.error("No properties found for your search criteria");
          return;
        }

        console.log("Available properties:", response.data.data);
        await setData(response.data.data);
      } catch (err) {
        console.error("Frontend fetch error:", err);
        // Show different error messages based on error type
        if (err.response) {
          // The server responded with an error status
          toast.error(err.response.data?.message || "Server error occurred");
        } else if (err.request) {
          // The request was made but no response was received
          toast.error("Network error. Please check your connection.");
        } else {
          // Something else happened
          toast.error(
            "An unexpected error occurred. Check if your filter is set."
          );
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDates();
  }, [from, to, guests, location, property]);

  console.log("now", data);

  return (
    <div>
      {/* Add a Toaster component here as well for immediate visibility */}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primaryGreen"></div>
        </div>
      ) : (
        <>
          <FilterProperties
            properties={data}
            from={from}
            to={to}
            guests={guests}
            location={location}
            senior={senior}
            children={children}
            infants={infants}
            property={property}
          />
        </>
      )}
    </div>
  );
}
