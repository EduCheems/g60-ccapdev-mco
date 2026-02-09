import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${poppins.variable} antialiased`}>
          <Navbar/>
          <main>
            {children}
          </main>

      </body>
    </html>
  );
}
