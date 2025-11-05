"use client";

import React, { Suspense } from "react";
import BookingSummaryPage from "./booking-summary-page";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24">Loading...</div>}>
      <BookingSummaryPage />
    </Suspense>
  );
}
