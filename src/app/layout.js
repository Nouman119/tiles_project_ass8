// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "react-hot-toast"; // Import Toaster for global notifications

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TileAura",
  description: "Inspire. Design. Live.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Global Toaster component so toast messages work across all pages */}
        <Toaster position="top-center" reverseOrder={false} />
        
        <Navbar /> {/* 2. Add Navbar above the children */}
        <main className="grow">{children}</main> {/* 3. Main content area */}
      </body>
    </html>
  );
}