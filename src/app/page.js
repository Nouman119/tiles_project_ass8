"use client"; 

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Hero from "./components/Hero/Hero";
import MarqueeSection from "./components/Marquee/MarqueeSection";
import FeaturedTiles from './components/FeaturedTiles';
import Footer from './components/Footer/Footer';
import toast from 'react-hot-toast';

function LoginToastHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("login") === "success") {
      toast.success("Successfully logged in with Google!");
    }
  }, [searchParams]);

  return null;
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={null}>
        <LoginToastHandler />
      </Suspense>

      <Hero />
      <MarqueeSection /> 
      <FeaturedTiles />
      <Footer />
    </main>
  );
}