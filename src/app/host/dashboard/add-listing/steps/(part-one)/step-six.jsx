"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Users, User, UsersRound, Users2, Key } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
export function OccupancySelector({ updateFormData, formData }) {
  const [options, setOptions] = useState([
    {
      id: "self-check-in",
      title: "Self Check in",
      icon: Key,
      selected: true,
    },
    {
      id: "me",
      title: "Me",
      icon: User,
      selected: false,
    },
    {
      id: "family",
      title: "My family",
      icon: Users,
      selected: false,
    },
    {
      id: "guests",
      title: "Other guests",
      icon: UsersRound,
      selected: false,
    },
    {
      id: "flatmates",
      title: "Flatmates/\nhousemates",
      icon: Users2,
      selected: false,
    },
  ]);

  useEffect(() => {
    // Initialize options based on formData
    if (formData.occupancy) {
      setOptions(
        options.map((option) => ({
          ...option,
          selected: formData.occupancy.includes(option.id),
        }))
      );
    }
  }, [formData.occupancy]);

  const toggleOption = (id) => {
    const newOptions = options.map((option) =>
      option.id === id ? { ...option, selected: !option.selected } : option
    );
    setOptions(newOptions);

    // Update formData
    const selectedOccupancy = newOptions
      .filter((option) => option.selected)
      .map((option) => option.id);
    updateFormData({ occupancy: selectedOccupancy });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-6 mb-12">
        <TextReveal>

 
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl font-bricolage text-absoluteDark font-semibold">
            Who else might be there?
          </h3>
          <p className="text-muted-foreground">
            Guests need to know whether they'll encounter other people during
            their stay.
          </p>
        </div>
        </TextReveal>
        <TextReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.id}
                className={`p-6 cursor-pointer transition-colors hover:bg-accent ${
                  option.selected ? "border-primary" : ""
                }`}
                onClick={() => toggleOption(option.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-secondary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium whitespace-pre-line">
                    {option.title}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
        </TextReveal>
        <p className="text-sm text-muted-foreground">
          We'll show this information on your listing and in search results.
        </p>
      </div>
    </div>
  );
}
