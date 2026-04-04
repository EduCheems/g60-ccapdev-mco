
"use client"; 

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { IoHome, IoHelpCircle, IoMail, IoIdCard, IoCompass} from 'react-icons/io5';
import AuthModal, { logoutUser } from './AuthModal'; 

export default function GuestNavBar(){

    const { data: session } = useSession();
    const isLoggedIn = !!session;

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); 
    const [authView, setAuthView] = useState<'login' | 'signup'>('signup');

    return (
        <>
            <nav
                style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50 }}
                className="bg-[#5C3727] border-b border-white/10 py-3"
            >
                <div className="w-full max-w-[1200px] mx-auto px-[120px] flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex justify-start">
                        <Link href="/" className="block">
                            <img src="/nav-logo-2.svg" alt="Catpuccino" className="h-12 w-12 hover:scale-105 transition-transform" />
                        </Link>
                    </div>

                    {/* Nav Links */}
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

                        {!isLoggedIn && (
                          <>
                            {/* Sign in */}
                            <button
                                onClick={() => {
                                    setAuthView('login');
                                    setIsAuthModalOpen(true);
                                }}
                                className="flex items-center gap-1.5 ml-2 px-6 py-2 bg-[#E67716] text-white rounded-full border-[1.5px] border-[#3A1F11] font-bold
                                hover:bg-[#D26500] hover:-translate-y-0.5 transition-all duration-200 capitalize tracking-normal text-sml"
                            >
                                <IoIdCard className="text-lg mb-[2px] justify-center" /> Sign In
                            </button>

                            {/* Get started */}
                            <button
                                onClick={() => {
                                    setAuthView('signup');
                                    setIsAuthModalOpen(true);
                                }}
                                className="px-6 py-2 bg-[#EEB56E] text-[#5C3727] rounded-full border-[1.5px] border-[#3A1F11] font-bold
                                hover:bg-[#D26500] hover:-translate-y-0.5 transition-all duration-200 capitalize tracking-normal text-sml shadow-md"
                            >
                                Get started
                            </button>
                          </>
                        )}

                        {isLoggedIn && (
                          <button
                            onClick={logoutUser}
                            className="ml-2 px-6 py-2 bg-[#E67716] text-white rounded-full border-[1.5px] border-[#3A1F11] font-bold
                            hover:bg-[#D26500] hover:-translate-y-0.5 transition-all duration-200 capitalize tracking-normal text-sml"
                          >
                            Log out
                          </button>
                        )}
                    </div>
                </div>
            </nav>

            <AuthModal 
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialView={authView}
            />
        </>
    ); 
}