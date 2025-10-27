// "use client";

// export default function RecieptPage() {
//   return (
//     <div className="w-full space-y-6">
//       <div className="flex justify-between items-center flex-wrap gap-4">
//         <h1 className="text-2xl font-semibold font-bricolage text-absoluteDark">
//           Your reciept from Majestic Escape
//         </h1>
//         <div>logo</div>
//       </div>
//       <div className="grid grid-cols-2 gap-8">
//         <div className="border border-black p-16">
//           <div className="text-2xl text-gray-700">Parcem </div>
//           <div className="pt-8 pb-4 font-medium border-b-4">
//             1 night in Parcem
//           </div>
//           {/* <hr className="border-2" /> */}
//           <div className="grid grid-cols-[80%_20%] pt-4">
//             <div>
//               <div className="text-4l text-gray-700">
//                 Fri, April 25, 2025 - Sat, April 26, 2025
//               </div>
//               <div className="text-4l text-gray-700">Entire home</div>
//               <div className="py-2 text-gray-500">Hosted by A</div>
//             </div>
//             <div>
//               <div>hsguasu</div>
//             </div>
//           </div>
//           <div className="py-2 border-y-4 text-gray-500">Traveller: Ab</div>
//           <div className="py-4 font-medium">Cancellation Policy</div>
//           <div className=" text-gray-500">
//             Read more about the cancellation policy
//           </div>
//         </div>
//         <div>
//           <div className="border border-black p-16">
//             <div className="text-2xl text-gray-700">Price Breakdown </div>
//             <div className="flex pt-8 pb-4 justify-between font-medium text-gray-500">
//               <div>₹2500 x 1 night</div> <div>₹2500</div>
//             </div>
//             <div className="flex  pb-4 justify-between font-medium  text-gray-500">
//               <div>Majestic Escape service fees</div> <div>₹500</div>
//             </div>
//             <div className="flex  pb-4 justify-between font-medium border-b-4  text-gray-500 ">
//               <div>Taxes</div> <div>₹500</div>
//             </div>
//             <div className="flex  pt-4 justify-between font-medium  text-gray-500 ">
//               <div>Total (INR)</div> <div>₹3000</div>
//             </div>
//           </div>
//           <div className="border border-black p-16 mt-8">
//             <div className="text-2xl text-gray-700">Payment </div>
//             <div className="flex pt-8 pb-4 justify-between font-medium border-b-4">
//               <div className="text-lg text-gray-700">
//                 <div>UPI</div>
//                 <div className="font-extralight text-sm text-gray-500">
//                   April 7, 2025
//                 </div>
//               </div>{" "}
//               <div className="text-gray-700">₹3000</div>
//             </div>

//             <div className="flex  pt-4 justify-between font-medium   ">
//               <div>Amount Paid (INR)</div> <div>₹3000</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import Image from "next/image";
import React, { forwardRef } from "react";
import Image from "next/image";

const Invoice = () => {
  return (
    <div className="min-h-screen  flex justify-center py-10">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-md p-8">
        {/* Header */}
        <div className="border-b pb-4 mb-4 flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Your receipt from Majestic Escape
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Booking ID:{" "}
              <span className="font-medium text-gray-700">RC54F8Q3EA</span> ·
              April 7, 2025
            </p>
          </div>
          <Image
            width={200}
            height={100}
            src="/logo.svg"
            className="w-12 h-12"
            alt="Logo"
          />
        </div>

        {/* Property Info */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Parcem</h2>
          <p className="text-sm text-gray-500">1 night in Parcem</p>
          <p className="text-sm text-gray-500 mt-1">
            Fri, Apr 25, 2025 &nbsp;–&nbsp; Sat, Apr 26, 2025
          </p>
          <p className="text-sm text-gray-500">
            Entire home/apt · 1 bed · 1 guest
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Hosted by <span className="font-medium">Olesia Shtanko</span>
          </p>

          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Confirmation code:{" "}
              <span className="font-semibold">HM5ZA5R82N</span>
            </p>
            <div className="mt-2 flex gap-4 text-sm text-blue-600 underline">
              <a href="#">Go to itinerary</a>
              <a href="#">Go to listing</a>
            </div>
          </div>
        </div>

        {/* Traveler Info */}
        <div className="mb-6 border-t border-b py-4">
          <p className="text-sm text-gray-800">
            <span className="font-semibold">Traveler:</span> Deepam Lotlikar
          </p>
        </div>

        {/* Cancellation Policy */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 text-sm mb-1">
            Cancellation policy
          </h3>
          <p className="text-sm text-gray-600">
            Free cancellation before 1:00 PM on Apr 20. After that, the
            reservation is non-refundable. Cutoff times are based on the
            listing’s local time.
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">
            Price breakdown
          </h3>
          <div className="text-sm text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span>₹2,500.00 × 1 night</span>
              <span>₹2,500.00</span>
            </div>
            <div className="flex justify-between">
              <span>Majestic Escape service fee</span>
              <span>₹352.94</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹300.00</span>
            </div>
            <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
              <span>Total (INR)</span>
              <span>₹3,152.94</span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Payment</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p>UPI</p>
            <p>April 7, 2025, 2:29:26 PM GMT+5:30</p>
            <p className="font-medium">₹3,152.94</p>
            <div className="flex justify-between font-semibold border-t pt-2 mt-2">
              <span>Amount paid (INR)</span>
              <span>₹3,152.94</span>
            </div>
          </div>
        </div>

        {/* Taxes Info */}
        <div className="mb-6 text-sm text-gray-600">
          <p>Occupancy taxes include CGST (In - Goa), SGST (In - Goa).</p>
          <p className="mt-2">
            Majestic Escape Payments India Pvt. Ltd. is a limited payment
            collection agent of your Host. Upon payment of the total price to
            Majestic Escape Payments, your payment obligation to your host is
            satisfied.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t pt-4 text-xs text-gray-500">
          <p>
            Payment processed by Majestic Escape Payments India Pvt. Ltd.
            <br />
            c/o 4th floor, Statesman House, Barakhamba Road, Connaught Place,
            New Delhi - 110001
          </p>
          <p className="mt-2">
            Level 9, Spaze i-Tech Park, A1 Tower, Sector 49, Sohna Road,
            Gurugram, India - 122018
          </p>
          <p className="mt-2">
            <a href="" className="text-blue-600 underline">
              www.majesticescape.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
