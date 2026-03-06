import type { Metadata } from "next";
import { useSession, signOut } from "next-auth/react"; 
import GuestNavBar from "@/components/GuestNavbar";
import Navbar from "../components/Navbar";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { auth } from "@/auth"; 

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Catpuccino",
  description: "Find your purr and sips",
};

//Auth placeholder 
async function getUser() {
  const isLoggedIn = false; 
  return isLoggedIn;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  const user = await getUser(); 
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${poppins.variable} antialiased flex flex-col min-h-screen`}>
          
          <SessionWrapper>
            {session? <Navbar user={session.user} />: <GuestNavBar />}
              <main className="flex-1" style={{ paddingTop: '72px' }}>
                {children}
              </main>
          </SessionWrapper>
          
      </body>
    </html>
  );
}
