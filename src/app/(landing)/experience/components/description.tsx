import React from "react";
import { descriptionData } from "@/lib/experience/data";

interface StayInformationProps {
  title?: string;
  details?: string[];
}

export default function Description({
  title = descriptionData.title,
  details = descriptionData.details,
}: StayInformationProps) {
  return (
    <div className="pt-4">
      <div className="p-4 white-border rounded-lg max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <div className="h-px sm:w-[400px] w-[200px] bg-gray-200 my-4" />
        <div className="space-y-4">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gray-600 text-base">{detail}</span>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
