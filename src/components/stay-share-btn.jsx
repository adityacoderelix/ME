"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShareButton({ icon, text, onClick, isSuccess }) {
  const [buttonText, setButtonText] = useState(text);
  
  useEffect(() => {
    if (text === 'Copy Link' && isSuccess) {
      setButtonText('Copied!');
      const timer = setTimeout(() => {
        setButtonText(text);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, text]);

  return (

    <button 
      onClick={onClick}
      className={`flex items-center justify-start gap-2 p-2 border-2 border-[#F1F3F4] rounded-md hover:bg-gray-100 transition-colors duration-200 w-full ${
        isSuccess ? 'bg-green-50 border-green-200' : ''
      }`}
    >
      <Image src={icon} width={5} height={5} alt="Icon" className="w-5 h-5" />
      <span className="text-sm">{buttonText}</span>
    </button>
  );
}