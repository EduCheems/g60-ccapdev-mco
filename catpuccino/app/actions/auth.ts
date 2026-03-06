"use server";

import { signIn } from "@/auth"; 
import { AuthError } from "next-auth";

export async function loginAction(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
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