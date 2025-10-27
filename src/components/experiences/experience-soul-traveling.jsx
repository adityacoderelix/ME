import Heading from "@/components/ui/heading";
import SubHeading from "@/components/ui/sub-heading";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ExperienceCard from "./experience-card";

const experiences = [
  {
    id: 1,
    title: "Cruise Experience",
    location: "Panaji, North Goa, Goa",
    price: "1800",
    images: [
      "/images/activities/nirvana-cruise.jpg",
      "/images/activities/nirvana-cruise1.jpeg",
    ],
  },
  {
    id: 2,
    title: "3-Deck Dine Cruise",
    location: "Malvan Lake, Goa",
    price: "1200",
    images: [
      "/images/activities/swastik1.jpg",
      "/images/activities/swastik2.jpeg",
      "/images/activities/swastik3.jpg",
    ],
  },
  {
    id: 3,
    title: "VIP Luxury Dinner Cruise Goa",
    location: "Mhadei River, Goa",
    price: "2500",
    images: [
      "/images/activities/vip-luxury1.jpeg",
      "/images/activities/vip-luxury2.jpg",
      "/images/activities/vip-luxury3.jpg",
    ],
  },
  {
    id: 4,
    title: "Dinner & Party Boat Cruise",
    location: "Calangute Beach, Goa",
    price: "1099",
    images: [
      "/images/activities/lexicon1.jpg",
      "/images/activities/lexicon2.jpg",
      "/images/activities/lexicon3.jpg",
    ],
  },
  {
    id: 5,
    title: "Dolphin Trip",
    location: "Spike's River, Goa",
    price: "300",
    images: ["/images/activities/dolphin-trip.png"],
  },
];

const activities = [
  {
    icon: "/images/activities/paragliding1.svg",
    label: "Paragliding",
  },
  {
    icon: "/images/activities/parasailing1.svg",
    label: "Parasailing",
  },
  {
    icon: "/images/activities/riverrafting1.svg",
    label: "River Rafting",
  },
  {
    icon: "/images/activities/cycling1.svg",
    label: "Cycling",
  },
  {
    icon: "/images/activities/hotairballoon1.svg",
    label: "Hot air balloon",
  },
  {
    icon: "/images/activities/paragliding1.svg",
    label: "Paragliding",
  },
  {
    icon: "/images/activities/parasailing1.svg",
    label: "Parasailing",
  },
  {
    icon: "/images/activities/cycling1.svg",
    label: "Cycling",
  },
  {
    icon: "/images/activities/hot air balloon.svg",
    label: "Hot air balloon",
  },

  {
    icon: "/images/activities/paragliding1.svg",
    label: "Paragliding",
  },
  {
    icon: "/images/activities/parasailing1.svg",
    label: "Parasailing",
  },
];

export default function ExperienceSoulTraveling() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [includeTaxes, setIncludeTaxes] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 8);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll);
      // Check initial scroll state
      checkScroll();

      // Check again after content loads (for images)
      window.addEventListener("load", checkScroll);

      return () => {
        scrollContainer.removeEventListener("scroll", checkScroll);
        window.removeEventListener("load", checkScroll);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section>
      <Heading text="Exciting Experiences in Goa" />
      <SubHeading className="text-left" text="Live Goa, not just visit" />

      <div className="flex flex-col rounded-full sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8">
        <div className="w-full relative max-w-[850px]">
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-hidden  px-2 py-2 max-w-[850px]"
          >
            {activities.map((type, index) => (
              <div key={index} className="text-center flex-shrink-0">
                <div className="w-[78px] h-[68px] bg-[#F7F7F7] rounded-lg flex items-center justify-center mb-2">
                  <Image
                    width={78}
                    height={78}
                    src={type.icon}
                    alt={type.label}
                    className="w-[78px] h-[68px] rounded-full object-contain opacity-75"
                  />
                </div>
              </div>
            ))}
          </div>
          {activities.length > 6 && (
            <>
              {canScrollLeft && (
                <button
                  onClick={scrollLeft}
                  className="absolute flex justify-center items-center -translate-y-1/2 -left-6 top-1/2 bg-white h-9 rounded-full shadow w-9 border border-gray "
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 text-gray" />
                </button>
              )}
              {canScrollRight && (
                <button
                  onClick={scrollRight}
                  className="absolute flex justify-center items-center -translate-y-1/2 -right-6 top-1/2 bg-white h-9 rounded-full shadow w-9 border border-gray "
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 text-gray" />
                </button>
              )}
            </>
          )}
        </div>
        <div className="flex flex-row items-center gap-4">
          {/* <div className="h-11 flex items-center px-6 gap-4 border-2 border-brightGreen rounded-full">
    <button
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${includeTaxes ? 'bg-brightGreen justify-end' : 'bg-solidGray justify-start border-brightGreen'
        }`}
      onClick={() => setIncludeTaxes(!includeTaxes)}
      aria-label={includeTaxes ? "Exclude taxes" : "Include taxes"}
    >
      <div className="bg-white w-4 h-4 rounded-full shadow-md" />
    </button>
    <span className="text-sm text-[#666666] font-medium whitespace-nowrap">
      {includeTaxes ? "Including Taxes" : "Excluding Taxes"}
    </span>
  </div> */}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayedExperiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            experience={experience}
            includeTaxes={includeTaxes}
          />
        ))}
      </div>

      {!showAll && experiences.length > 8 && (
        <div className="flex justify-center mt-12">
          <button
            className="bg-[#4E7B39] hover:bg-[#3d612d] text-white px-12 py-3 rounded-full transition-colors duration-300"
            onClick={() => setShowAll(true)}
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
}
