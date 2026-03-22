"use client";

import Link from 'next/link';
import Searchbar from './Searchbar'; 

import { IoAdd, IoHome, IoHelpCircle, IoMail, IoCompass} from 'react-icons/io5';
import { User } from "next-auth"; 
import { logoutUser } from "./AuthModal";

interface NavbarProps { 
  user?: User; 
}

export default function Navbar({user}: NavbarProps) {
  const avatarSrc =
    (user?.profilePicURL && String(user.profilePicURL).trim()) ||
    user?.image ||
    "/default-profile.svg";

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50 }} className="bg-[#5C3727] border-b border-white/10 py-3" >
      
      <div className="w-full max-w-[1200px]  mx-auto px-[120px] flex items-center justify-between">
        
        <div className="flex justify-start">
          <Link href="/home" className="block">
            <img src="/nav-logo-2.svg" alt="Catpuccino" className="h-12 w-12 hover:scale-105 transition-transform" />
          </Link>
        </div>

        <div className="flex items-center gap-8 text-[12px] font-medium uppercase tracking-widest text-white/90">
          
          <Link href="/home" className="flex items-center gap-1.5 hover:text-[#FFB87A] hover:font-bold transition-all">
            <IoHome className="text-lg mb-[2px]"/> Home 
          </Link>

          <Link href="/discover" className="flex items-center gap-1.5 hover:text-[#FFB87A] hover:font-bold transition-all">
             <IoCompass className="text-lg mb-[2px]"/> Discover
          </Link>

          <Link href="/about" className="flex items-center gap-1.5 hover:text-[#FFB87A] hover:font-bold transition-all">
            <IoHelpCircle className="text-lg mb-[2px]"/> About
          </Link>

          <Link href="/contact" className="flex items-center gap-1.5 hover:text-[#FFB87A] hover:font-bold transition-all">
            <IoMail className="text-lg mb-[2px]"/> Contact  
          </Link>

          <div className="flex items-center gap-4 ml-2">
            <Searchbar />
            
            <Link href="/post">
              <button className="w-10 h-10 bg-[#D26500] text-white rounded-lg flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-75">
                <IoAdd className="text-2xl stroke-[2px]" />
              </button>
            </Link>
            
            <Link href="/profile" className="w-10 h-10 bg-gray-400/50 rounded-full flex-shrink-0 block hover:ring-2 hover:ring-white/50 transition-all overflow-hidden">
               <img
                 key={avatarSrc}
                 src={avatarSrc}
                 alt="Profile"
                 className="w-full h-full object-cover"
                 referrerPolicy="no-referrer"
               />
            </Link>

            <button
              onClick={logoutUser}
              className="px-4 py-1.5 bg-[#E67716] text-white rounded-full border border-black text-[11px] font-bold uppercase tracking-wide hover:bg-[#D26500] hover:-translate-y-0.5 transition-all duration-150"
            >
              Log out
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}