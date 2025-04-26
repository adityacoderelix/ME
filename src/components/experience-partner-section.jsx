/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge"

export function ExperiencePartnerSection() {
  return (
    <div className="w-full bg-offWhite  border-y border h-[200px] relative overflow-hidden ">
      {/* Background Image */}
  
      
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-offWhite"/>
      
      <div className="absolute inset-0 flex justify-center items-center mx-auto">
        <div className="container  px-4 flex justify-between items-center mx-auto">
          {/* Logo and Text Content */}
          <div className="flex items-center space-x-6 mx-auto">
            {/* Logo Placeholder */}
           
            <img src="/images/soul-travelling.jpg"
            alt="Soul travlling"
            className="w-32 h-auto rounded-full"/>

            {/* Text Content */}
            <div className="text-absoluteDark">
              <h2 className="text-3xl font-bold mb-2">Soul Travelling</h2>
              <p className="text-lg font-semibold mb-2">Your Trusted Partner in Experience Hosting</p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-primary"
                
                >7+ Years</Badge>
                <p className="text-sm">of Trust & Excellence in the Industry</p>
              </div>
            </div>
          </div>
          
         
        </div>
      </div>
    </div>
  )
}

