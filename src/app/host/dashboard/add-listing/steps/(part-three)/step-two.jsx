import { useState } from "react";
import { TextReveal } from "@/components/text-reveal";

export function SetPricing({ updateFormData, formData }) {
  const [basePrice, setBasePrice] = useState(formData?.basePrice || "");

  const handleChange = (e) => {
    updateFormData({
      basePrice: e.target.value,
    });
  };

  return (
    <div className="space-y-8 max-w-3xl flex flex-col items-center justify-center mx-auto ">
          <TextReveal>

        

      <h3 className="text-xl md:text-2xl font-bricolage text-absoluteDark font-semibold">
        Let's set the pricing{" "}
      </h3>
      </TextReveal>
      <TextReveal>
      <div>
        <h3 className="text-stone text-lg  mb-2">Set your price (per night)</h3>
        <div className="flex items-center  space-x-2">
          <span className="text-4xl mr-2 font-medium">₹</span>
          <input
            id="basePrice"
            type="number"
            value={basePrice}
            onChange={(e) => {
              setBasePrice(e.target.value);
              handleChange(e);
            }}
            placeholder="Base price / night"
            className="max-w-[300px] border border-gray-300 px-8 focus:ring-primaryGreen focus:ouline-none mt-4 rounded-md ouline-none text-xl py-4 text-absoluteDark no-spinner"
          />
        </div>
      </div>
      </TextReveal>
    </div>
  );
}
