"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { signIn, signOut } from "next-auth/react"; //New ver: For actual backend frontend auth process 
import { signIn as googleSignIn } from "next-auth/react";
import { loginAction } from "@/app/actions/auth";

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
  const [showEmailForm, setShowEmailForm] = useState(false); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (isLoginMode) {
      try {
      
      const res = await loginAction(email, password);

      console.log("Raw NextAuth Error:", res?.error);

      // In NextAuth v5, if there's an error, res.error will be a string
      if (res?.error) {
          if (res.error === "GoogleAccount") {
            alert("This account was created via Google. Please sign in with Google.");
          } else if (res.error === "UserNotFound") {
            alert("User not found. Please sign up!");
          } else if (res.error === "InvalidPassword") {
            alert("Incorrect password. Please try again.");
          } else {
            alert(`Login failed: ${res.error}`);
          }
      } else {
        // Success!
        window.location.href = "/profile";
      }
    } catch (err: any) {
      // Fallback in case the signIn function throws directly
      alert("An unexpected error occurred. Please try again.");
    }
    } else {
      try {
         const rest = await fetch ("/api/auth/register", {
          method: "POST", 
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            username: email.split('@')[0],
            email, 
            password
          }), 
          
          }); 

          if (rest.ok) {
            await signIn("credentials", {email, password, callbackUrl: "/profile"}); 
          } else {
            const data = await rest.json(); 
            alert(data.message);
          }
      } catch (err){
        console.error("Signup error", err);
      }
    }
  };

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

          <button 
            onClick={() => googleSignIn("google", { callbackUrl: "/profile" })}
            className="flex items-center w-full bg-[#FBF3DE] border border-black rounded-full py-3 px-6  shadow-[inset_4px_4px_1px_rgba(133_82_37_/_0.2)] hover:bg-[#855225]/10 transition-all"
          >
            <FcGoogle className="text-[#855225] text-xl" />
            <span className="flex-1 text-center font-medium text-[#855225] text-[12px]">
              {isLoginMode ? 'Sign in' : 'Sign up'} with Google
            </span>
          </button>

      {showEmailForm ? (
        
        <div className="w-full max-w-[340px] flex flex-col items-center"> 

            <p className="text-[#855225] text-[14px] font-bold mb-4 uppercase tracking-wide">
              {isLoginMode ? 'Sign in via Email' : 'Sign up via Email'}
            </p>

            <form onSubmit={handleEmailAuth} className="w-full max-w-[340px] flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Email" 
              className="text-[#855225] text-[12px] font-medium w-full bg-[#FBF3DE] border border-black rounded-full py-2 px-4 outline-none shadow-[inset_4px_4px_1px_rgba(133_82_37_/_0.2)]"
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="text-[#855225] text-[12px] w-full bg-[#FBF3DE] border border-black rounded-full py-2 px-4 outline-none shadow-[inset_4px_4px_1px_rgba(133_82_37_/_0.2)]"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button type="submit" className="bg-[#855225] text-white rounded-full py-2 font-bold hover:opacity-90">
              {isLoginMode ? "Login" : "Create Account"}
            </button>

            <button 
              type="button" 
              onClick={() => setShowEmailForm(false)} 
              className="text-[#855225] text-xs underline"
            >
              Back to social login
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setShowEmailForm(true)}
          className="flex items-center w-full bg-[#FBF3DE] border border-black rounded-full py-3 px-6  shadow-[inset_4px_4px_1px_rgba(133_82_37_/_0.2)] hover:bg-[#855225]/10 transition-all"
        >
        <HiOutlineMail className="text-[#855225] text-xl" />
          <span className="flex-1 text-center font-medium text-[#855225] text-[12px]">              
            {isLoginMode ? 'Sign in' : 'Sign up'} with Email 
          </span>
        </button>
      )}

          
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

export async function logoutUser() {
  try {
    await signOut({ callbackUrl: "/" });
  } catch (err) {
    console.error("Logout error", err);
  }
}

export default AuthModal;