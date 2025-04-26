import React from "react";

export default function StayInformation({
  description,
}: {
  description: string;
}) {
  return (
    <div className="pt-4">
      <div className="p-4 white-border rounded-lg max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-900">
          About this place
        </h2>
        <div className="h-px sm:w-[400px] w-[200px] bg-gray-200 my-4" />
        <p className="text-gray-600 text-base">{description}</p>
      </div>
    </div>
  );
}
