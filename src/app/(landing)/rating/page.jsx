"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import StarRating from "@/components/star-rating";
import { AlertCircleIcon } from "lucide-react";
import React, { useState } from "react";

export default function Ratings() {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    console.log("You selected rating:", value);
  };
  const handleChange = () => {};

  return (
    <div className="min-h-screen font-poppins pt-24">
      <header className="bg-offWhite shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold font-bricolage text-absoluteDark">
            Review Submission
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-stone">
            Share your thoughts and suggestion.
          </p>
        </div>
      </header>
      <main>
        <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-semibold text-primary">
                  Form
                </h2>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <div className="py-4 sm:py-5 sm:grid sm:gap-4 sm:px-6">
                  <textarea
                    className="px-4 py-4 border border-gray h-40 "
                    type="text"
                    placeholder="Write your review ....."
                    onChange={handleChange}
                  />
                </div>

                <div className=" p-10 font-sans">
                  <h1 className="text-lg font-bold mb-4">
                    Rate Your Experience
                  </h1>
                  <StarRating onRatingChange={handleRatingChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
