"use server";

import { signIn } from "@/auth"; 
import { AuthError } from "next-auth";

export async function loginAction(email: string, password: string, rememberMe: boolean) {
  try {
    await signIn("credentials", {
      email,
      password,
      rememberMe: rememberMe.toString(), 
      redirect: false, 
    });
    
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      const customMessage = error.cause?.err?.message || error.cause?.message;
      return { error: customMessage || "CredentialsSignin" };
    }
    
    throw error;
  }
}