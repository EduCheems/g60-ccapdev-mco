import type { Metadata } from "next";

import { Montserrat, Fredoka } from "next/font/google";
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const fredoka = Fredoka({
  subsets: ["latin"], 
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Catpuccino",
  description: "Find your purr and sips",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${fredoka.variable} antialiased`}>
          <Navbar/>

          <main>
            {children}
          </main>

          <Footer />
      </body>
    </html>
  );
}
