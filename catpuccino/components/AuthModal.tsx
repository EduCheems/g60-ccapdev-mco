"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

//social brand icons 
import { BsFacebook } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6"; 
import { FcGoogle } from "react-icons/fc"; 
import { HiOutlineMail } from "react-icons/hi";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'signup'}) => {
  
  const [mounted, setMounted] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(initialView === 'login'); 

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoginMode(initialView === 'login');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialView]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div style={{
      position: 'fixed', top: '72px', left: 0, right: 0, bottom: 0,
      zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      
      {/* Blur bg*/}
      <div 
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)',
          zIndex: 1 
        }}
        onClick={onClose}
      />

      {/* Dialogue */}
      <div 
        style={{ position: 'relative', zIndex: 50 }} 
        className="w-[90%] max-w-[520px] bg-[#FEF6EA] rounded-[20px] border border-black px-8 py-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col items-center"
      >
        
        {/* Close */}
        <button 
          onClick={onClose} 
          className="top-6 right-8 text-4xl text-[#855225] hover:text-[#855225] transition-colors leading-none"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[#855225] text-center mt-4 mb-8">
          {isLoginMode? "Welcome back!" : "Join Catpuccino"}
        </h2>
        
        {/* signin/signup options */}
        <div className="w-full max-w-[340px] flex flex-col gap-4">

          <button className="flex items-center w-full bg-[#FBF3DE] border border-black rounded-full py-3 px-6  shadow-[inset_4px_4px_1px_rgba(133_82_37_/_0.2)] hover:bg-[#855225]/10 transition-all">
            <FcGoogle className="text-[#855225] text-xl" />
            <span className="flex-1 text-center font-medium text-[#855225] text-[12px]">
              {isLoginMode ? 'Sign in' : 'Sign up'} with Google
            </span>
          </button>

          <button className="flex items-center w-full bg-[#FBF3DE] border border-black rounded-full py-3 px-6  shadow-[inset_4px_4px_1px_rgba(133_82_37_/_0.2)] hover:bg-[#855225]/10 transition-all">
            <BsFacebook className="text-[#1976D2] text-xl" />
            <span className="flex-1 text-center font-medium text-[#855225] text-[12px]">
              {isLoginMode ? 'Sign in' : 'Sign up'} with Facebook
            </span>
          </button>

          <button className="flex items-center w-full bg-[#FBF3DE] border border-black rounded-full py-3 px-6  shadow-[inset_4px_4px_1px_rgba(133_82_37_/_0.2)] hover:bg-[#855225]/10 transition-all">
            <HiOutlineMail className="text-[#855225] text-xl" />
            <span className="flex-1 text-center font-medium text-[#855225] text-[12px]">
              {isLoginMode ? 'Sign in' : 'Sign up'} with Email
            </span>
          </button>
        </div>

        <p className="mt-8 text-center text-[#D26500] text-[12px] font-medium">
          {isLoginMode? "Don't have an account? ": "Already have an account?"}
          <span 
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-[#D26500] font-black cursor-pointer hover:underline"
          >
            {isLoginMode ? " Sign up" : " Sign in"}
          </span>
        </p>
      </div>
    </div>,
    document.body
  );
};

export default AuthModal;