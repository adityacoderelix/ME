"use client";
import FilterProperties from "@/components/filter-properties";
import { useParams } from "next/navigation";

export default function FarmHouse() {
  const params = useParams();

  console.log("obj", params.id);
  return (
    <div>
      <FilterProperties propertyType={`${params.id}`} />
    </div>
  );
}
