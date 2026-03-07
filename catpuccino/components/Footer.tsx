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
    <footer className="w-full bg-[#FBF3DE] relative flex flex-col pt-16">
      <div className="relative w-full flex flex-col items-center overflow-hidden">
        
        <div className="w-full z-20 flex justify-center">
          <img
            src="/footer-upper.svg"
            alt="Catpuccino Logo"
            className="w-[750px] md:w-[900px] h-auto"
          />
        </div>

        <div className="relative z-50 flex flex-col items-center gap-5 pt-8 pb-26">
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
            <SocialIcon Icon={FaInstagram} />
            <SocialIcon Icon={FaFacebook} />
            <SocialIcon Icon={FaTwitter} />
            <SocialIcon Icon={FaGithub} />
          </div>
        </div>

        <div className="w-full flex justify-center pointer-events-none">
          <img
            src="/footer-bottom.svg"
            alt="Cat at computer"
            className="w-full h-auto block z-10 -mt-[100px] scale-110 origin-top"
          />
        </div>
      </div>

      <div className="w-full bg-[#5C3727] flex flex-col items-center py-10 relative z-30 -mt-5 pt-8">
        
        <button
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-2 text-white/80 hover:text-white transition-all -mt-[260px]"
        >
          <div className="w-full flex justify-center pointer-events-none">
            <img
              src="/back-to-top.svg"
              alt="Back to top"
              className="w-[360px] h-auto drop-shadow-md"
            />
          </div>
        </button>

        <p className="mt-4 mb-5 text-[15px] font-bold uppercase tracking-[0.2em] text-white/60 text-center px-4">
          Catpuccino 2026 | All rights reserved ©
        </p>
      </div>
      
    </footer>
  );
}

const SocialIcon = ({ Icon }: { Icon: any }) => (
  <a href="#" className="group transition-all hover:scale-125 pointer-events-auto">
    <Icon size={30} className="text-[#5C3727] group-hover:text-[#E5781E] transition-colors" />
  </a>
);