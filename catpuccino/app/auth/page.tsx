"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import("@/components/AuthModal"), {
  ssr: false, 
  loading: () => <p>Loading...</p> // I'll change this later wait
}); 

export default function AuthPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#FBF3DE] relative flex flex-col justify-center px-[140px]">
      
      <div className="relative flex flex-col items-start max-fit">
        <h2 className="text-[#D26500] font-poppins text-2xl font-black mb-1">Bobcat says</h2>  
        
        <div className="flex flex-col items-start">
          <h1 className="text-[#855225] font-poppins font-black text-[81px] leading-tight uppercase">
            “FIND YOUR SIPS”
          </h1>
          <h1 className="text-[#855225] font-poppins font-black text-[81px] leading-tight uppercase">
            AND PURRS
          </h1>
        </div>
      </div>

      <div className="w-[300px] ml-10 pl-10 bg-[#D26500] text-[#FBF3DE] px-8 py-3 rounded-full font-black text-2xl shadow-lg transform rotate-[-4deg] self-start mt-4">
          With catpuccino!
      </div>

      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-[300px] mt-12 bg-[#855225] text-[#FBF3DE] px-10 py-4 rounded-full font-black text-xl uppercase hover:bg-[#6d431e] transition-all shadow-[0_8px_0_rgb(80,48,22)] active:shadow-none active:translate-y-1"
      >
        Get Started
      </button>

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
    </div>
  );
}
