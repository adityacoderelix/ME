"use client";

import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TextReveal } from "@/components/text-reveal";

const discountOptions = [

  
  {
    id: "new-listing",
    percentage: 25,
    title: "New listing promotion",
    description: "Offer 25% off your first 3 bookings",
  },
  {
    id: "fifer",
    percentage: 10,
    title: "Weekly discount",
    description: "For stays of 5 nights or more",
  },
  {
    id: "extended",
    percentage: 20,
    title: "Extended Stay Discount",
    description: "For stays of 20 nights or more",
  },
];

export function DiscountSettings({ updateFormData, formData }) {
  const [selectedDiscounts, setSelectedDiscounts] = useState(new Set());

  useEffect(() => {
    // Initialize selectedDiscounts based on formData
    if (formData.discounts) {
      setSelectedDiscounts(new Set(formData.discounts));
    }
  }, [formData.discounts]);

  const toggleDiscount = (id) => {
    const newSelected = new Set(selectedDiscounts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedDiscounts(newSelected);

    // Update formData
    updateFormData({ discounts: Array.from(newSelected) });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl py-12">
      <TextReveal>
         <div className=" mb-8">
          <h3 className="text-xl md:text-2xl font-bricolage text-absoluteDark font-semibold">
            Add discounts
          </h3>
          <p className="text-lg text-muted-foreground">
            Help your place stand out to get booked faster and earn your first
            reviews.
          </p>
        </div>
        </TextReveal> 

        <TextReveal>
        <div className="space-y-4">
          {discountOptions.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-colors ${
                selectedDiscounts.has(option.id)
                  ? "border-black border-2"
                  : "hover:border-primary"
              }`}
              onClick={() => toggleDiscount(option.id)}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-16 items-center justify-center rounded-md border text-lg font-semibold">
                  {option.percentage}%
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors
                  ${
                    selectedDiscounts.has(option.id)
                      ? "bg-primary text-primary-foreground"
                      : "border"
                  }`}
                >
                  {selectedDiscounts.has(option.id) && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        </TextReveal> 

        <TextReveal>

        <p className="mt-4 text-sm text-muted-foreground">
          Only one discount will be applied per stay.{" "}
          <Link href="#" className="underline hover:text-foreground">
            Learn more
          </Link>
        </p>
        </TextReveal>
      </main>
    </div>
  );
}
