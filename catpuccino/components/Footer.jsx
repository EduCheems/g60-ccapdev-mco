"use client";
import { FaInstagram, FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#FBF3DE] relative flex flex-col">
      <div className="relative w-full flex flex-col items-center overflow-hidden">
        <div className="w-full h-[500px] pt-16 z-20 flex justify-center">
          <img
            src="/footer-upper.svg"
            alt="Catpuccino Logo"
            className="w-[400px] h-[500px]"
          />
        </div>

        {/* Email and Social Links */}
        <div className="relative z-50 flex flex-col items-center gap-5">
        <a
            href="mailto:catpuccino_reviews@gmail.com"
            className="flex items-center gap-2 group cursor-pointer"
        >
            <IoMail className="text-[#5F3A28] group-hover:text-[#E5781E] transition-colors size-4" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5C3727] group-hover:text-[#E5781E] transition-colors">
            catpuccino_reviews@gmail.com
            </p>
        </a>

        <div className="flex gap-8">
            <a href="#" className="group transition-all hover:scale-125">
            <FaInstagram
                size={30}
                className="text-[#5C3727] group-hover:text-[#E5781E] transition-colors"
            />
            </a>
            <a href="#" className="group transition-all hover:scale-125">
            <FaFacebook
                size={30}
                className="text-[#5C3727] group-hover:text-[#E5781E] transition-colors"
            />
            </a>
            <a href="#" className="group transition-all hover:scale-125">
            <FaTwitter
                size={30}
                className="text-[#5C3727] group-hover:text-[#E5781E] transition-colors"
            />
            </a>
            <a href="#" className="group transition-all hover:scale-125">
            <FaGithub
                size={30}
                className="text-[#5C3727] group-hover:text-[#E5781E] transition-colors"
            />
            </a>
        </div>
        </div>


        {/* Container for the desk and the floating button */}
        <div className="relative w-full flex justify-center mt-[-580px]">
          <img
            src="/footer-bottom.svg"
            alt="Cat at computer"
            className="w-full h-auto block z-10 scale-110 origin-top pointer-events-none"
          />

          {/* The Back to Top Button positioned "on" the desk */}
          <button
            onClick={scrollToTop}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 
               flex flex-col items-center gap-1 cursor-pointer 
               hover:scale-110 transition-transform active:scale-95"
          >
            <img
              src="/back-to-top.svg"
              alt="Back to top"
              className="w-[120px] h-auto drop-shadow-lg"
            />
            <p className="text-[10px] font-black text-[#5C3727] opacity-0 group-hover:opacity-100 transition-opacity tracking-tighter">
              CLICK TO SCROLL UP
            </p>
          </button>
        </div>                        

        
      </div>

      <div className="w-full bg-[#5C3727] flex flex-col items-center py-10 relative z-30 -mt-5 pt-8">
        <p className="mt-2 mb-5 text-[15px] font-bold uppercase tracking-[0.2em] text-white/60">
          Catpuccino 2026 | All rights reserved ©
        </p>
      </div>
    </footer>
  );
}

const SocialIcon = ({ Icon }) => (
  <a href="#" className="group transition-all hover:scale-125">
    <Icon size={30} className="text-[#5C3727] group-hover:text-[#E5781E] transition-colors" />
  </a>
);
