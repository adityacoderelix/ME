"use client";

import { SetStateAction, useState } from "react";
import {
  Search,
  MapPin,
  Building2,
  Mountain,
  Castle,
  Navigation,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from "./date-picker";
import { GuestPicker } from "./guest-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SearchSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchSheet({ isOpen, onClose }: SearchSheetProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>();
  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [activeSection, setActiveSection] = useState<string | undefined>();

  const suggestions = [
    {
      city: "Panaji",
      state: "Goa",
      description: "Capital city",
      icon: <Building2 className="w-6 h-6 text-rose-500" />,
    },
    {
      city: "Calangute",
      state: "Goa",
      description: "Popular beach destination",
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
    },
    {
      city: "Anjuna",
      state: "Goa",
      description: "Known for flea markets",
      icon: <Mountain className="w-6 h-6 text-green-600" />,
    },
    {
      city: "Ponda",
      state: "Goa",
      description: "Cultural hub",
      icon: <Castle className="w-6 h-6 text-purple-600" />,
    },
    {
      city: "Margao",
      state: "Goa",
      description: "Commercial center",
      icon: <Building2 className="w-6 h-6 text-yellow-600" />,
    },
    {
      city: "Vasco da Gama",
      state: "Goa",
      description: "Port city",
      icon: <Navigation className="w-6 h-6 text-teal-600" />,
    },
  ];

  const totalGuests = guestCounts.adults + guestCounts.children;

  const formatDateRange = (dates: Date[] | undefined) => {
    if (!dates || dates.length !== 2) return "Add dates";
    return `${dates[0].toLocaleDateString()} - ${dates[1].toLocaleDateString()}`;
  };

  const formatGuestCount = () => {
    if (totalGuests === 0) return "Add guests";
    return `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="top"
        className="h-[100vh] w-full border-none flex flex-col p-0"
      >
        <div className="px-6 py-4 border-b bg-background">
          <SheetHeader className="space-y-4">
            <div className="flex items-center justify-center">
              <Tabs defaultValue="stays" className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="stays">Stays</TabsTrigger>
                  <TabsTrigger value="experiences">Experiences</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </SheetHeader>
        </div>

        <ScrollArea className="flex-grow px-6">
          <div className="py-6">
            <Accordion
              type="single"
              collapsible
              value={activeSection}
              onValueChange={setActiveSection}
            >
              <AccordionItem value="where" className="border-none">
                <AccordionTrigger className="p-4 hover:no-underline [&[data-state=open]]:bg-accent rounded-xl">
                  <div className="flex flex-col items-start">
                    <div className="font-medium">Where</div>
                    <div className="text-sm text-muted-foreground">
                      {searchQuery || "I'm flexible"}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-0">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search destinations"
                        className="pl-9 h-10 text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    {/* 
                    <div className="space-y-4">
                      <h3 className="text-sm text-muted-foreground">Suggested destinations</h3>
                      <div className="space-y-2">
                        {suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            className="w-full justify-start h-auto py-4 hover:bg-accent"
                          >
                            <div className="mr-4 bg-secondary/20 p-2 rounded-lg">
                              {suggestion.icon}
                            </div>
                            <div className="text-left">
                              <div className="font-medium">{suggestion.city}, {suggestion.state}</div>
                              <div className="text-sm text-muted-foreground">{suggestion.description}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div> */}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="when" className="border-none">
                <AccordionTrigger className="p-4 hover:no-underline [&[data-state=open]]:bg-accent rounded-xl">
                  <div className="flex flex-col items-start">
                    <div className="font-medium">When</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDateRange(selectedDates)}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ScrollArea className="h-[600px]">
                    <DatePicker
                      onSelect={(dates: SetStateAction<Date[] | undefined>) => {
                        setSelectedDates(dates);
                        setActiveSection("who");
                      }}
                      onClose={() => setActiveSection("who")}
                    />
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="who" className="border-none">
                <AccordionTrigger className="p-4 hover:no-underline [&[data-state=open]]:bg-accent rounded-xl">
                  <div className="flex flex-col items-start">
                    <div className="font-medium">Who</div>
                    <div className="text-sm text-muted-foreground">
                      {formatGuestCount()}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <GuestPicker
                    onSelect={(counts) => {
                      setGuestCounts(counts);
                      setActiveSection(undefined);
                    }}
                    onClose={() => setActiveSection(undefined)}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>

        <div className="border-t bg-background p-4 flex items-center justify-between">
          <Button
            variant="link"
            className="font-semibold underline"
            onClick={() => {
              setSearchQuery("");
              setSelectedDates(undefined);
              setGuestCounts({
                adults: 0,
                children: 0,
                infants: 0,
                pets: 0,
              });
            }}
          >
            Clear all
          </Button>
          <Button
            className="bg-primaryGreen hover:bg-brightGreen text-white py-3 px-6"
            onClick={() => {}}
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
