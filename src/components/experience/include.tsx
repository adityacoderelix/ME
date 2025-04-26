import { Circle } from "lucide-react";

const CircleCheck = () => (
  <div className="relative w-5 h-5">
    <Circle className="w-5 h-5 text-muted-foreground" />
    <svg
      className="absolute inset-0 w-3 h-3 m-auto text-muted-foreground"
      fill="none"
      strokeWidth="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function Include() {
  const leftColumnItems = [
    "Set Menu Lunch on boat",
    "Premium spinning rod and reel combos (Shimano/Penn)",
    "Variety pack of local-favorite lures and baits",
  ];

  const rightColumnItems = [
    "Tackle box stocked with: Hooks, Sinkers & weights, Bobbers and floats, Line cutters & pliers",
    "Safety Gear: Coast Guard-approved life jackets, First-aid kit",
  ];

  return (
    <div className="pt-6">
      <h2 className="text-xl font-semibold mb-1">Include</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Included in the price
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div className="space-y-4">
          {leftColumnItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CircleCheck />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {rightColumnItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CircleCheck />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
