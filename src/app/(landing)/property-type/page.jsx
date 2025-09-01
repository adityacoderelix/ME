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
  const destination = searchParams.get("from");
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchDates() {
      try {
        const response = await axios.get(
          `${API_URL}/properties/search-properties`,
          {
            params: {
              from: from ? new Date(from).toISOString() : undefined,
              to: to ? new Date(to).toISOString() : undefined,
              guests: guests,
            },
          }
        );
        if (response.status != 200) {
          console.error("There was some error. Try Again");
        }
        console.log("Available properties:", response.data.data);
        await setData(response.data.data);
      } catch (err) {
        console.error("Frontend fetch error:", err);
      }
    }

    fetchDates();
  }, [from, to, guests]);
  console.log("now", data);
  return (
    <div className="pt-10">
      <FilterProperties properties={data} />
    </div>
  );
}
