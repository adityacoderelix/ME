"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import StarRating from "@/components/star-rating";
import { AlertCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Ratings() {
  const searchParams = useSearchParams();
  const emailToken = searchParams.get("token");
  const [rating, setRating] = useState(0);
  const [reviewData, setReviewData] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const bookingId = searchParams.get("booking");
  const [bookData, setBookData] = useState();
  const router = useRouter();
  const verifyToken = async (emailToken) => {
    try {
      const getLocalData = await localStorage.getItem("token");
      const data = JSON.parse(getLocalData);
      if (data) {
        const response = await fetch(`${API_URL}/review/verify`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${data}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailToken: emailToken,
          }),
        });
        if (!response.ok) {
          return;
        }
        return response.json();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const auth = async () => {
    const getLocalData = await localStorage.getItem("token");
    const data = JSON.parse(getLocalData);
    if (data) setIsAuth(true);
  };

  const getBookingId = async (bookingId) => {
    try {
      const getLocalData = await localStorage.getItem("token");
      const data = JSON.parse(getLocalData);
      if (data) {
        const response = await fetch(`${API_URL}/booking/${bookingId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          return;
        }
        const result = await response.json();

        return result.data;
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    auth();
  }, []);
  useEffect(() => {
    if (emailToken) {
      verifyToken(emailToken);
    }
  }, [emailToken]);

  const {
    data: bookingData,
    isLoading: isBookingLoading, // Renamed for clarity
    error: bookingError, // Renamed for clarity
    isFetching: isBookingFetching,
    isError: isBookingError,
  } = useQuery({
    queryKey: ["bookingId", bookingId],
    queryFn: () => getBookingId(bookingId),
    enabled: !!bookingId, // Only run if propertyId exists
    // Optional: Add staleTime, cacheTime etc.
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleChange = (event) => {
    setReviewData(event.target.value);
  };

  const handleSubmitReviewData = async () => {
    try {
      if (!reviewData) {
        toast.error("Cannot leave review text box empty.");
        return;
      }
      const getLocalData = await localStorage.getItem("token");
      const data = JSON.parse(getLocalData);

      if (data) {
        const response = await fetch(`${API_URL}/review/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${data}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: bookingId,
            rating: rating,
            content: reviewData,
          }),
        });
        if (!response.ok) {
          toast.error("Failed to submit review");
        }
        toast.success("Submitted review");
        router.push(`/stay/${bookingData?.propertyId?._id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = (value) => {
    setRating(value);
  };
  // setData(bookingData.checkOut);
  console.log(bookingData);
  const dat = new Date().toLocaleDateString();
  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center font-poppins pt-24">
        You are not authorized to access this page. &nbsp;{" "}
        <Link href="/login">
          <u>
            <b>Click Here</b>
          </u>
        </Link>
        &nbsp; to log in now to access.
      </div>
    );
  }
  if (dat != "8/8/2025") {
    return (
      <div className="min-h-screen flex items-center justify-center font-poppins pt-24">
        Your review date has expired. The review remains open only for the next
        14 days from check out date. &nbsp;{" "}
      </div>
    );
  }

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
                  My Review
                </h2>
              </div>

              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <div className=" p-10 font-sans">
                  <h1 className="text-lg font-bold mb-4">
                    Rate Your Experience
                  </h1>
                  <StarRating
                    onRatingChange={handleRatingChange}
                    resetChange={handleReset}
                  />{" "}
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:gap-4 sm:px-6">
                  <textarea
                    className="px-4 py-4 border border-gray h-40 "
                    type="text"
                    placeholder="Write your review ....."
                    onChange={handleChange}
                  />
                  <Button onClick={handleSubmitReviewData}>Submit</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
