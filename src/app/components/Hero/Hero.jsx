'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const Hero = () => {
  const heroImages = [
    '/images/hero.webp',
    '/images/hero2.webp',
    '/images/hero3.webp',
    '/images/hero4.webp',
    '/images/hero5.webp',
  ];

  return (
    <section className="relative w-full h-125 md:h-150 lg:h-175 flex items-center overflow-hidden">

      <div className="absolute inset-0 z-0 w-full h-full">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect={'fade'}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="w-full h-full"
        >
          {heroImages.map((imgSrc, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${imgSrc}')` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

      
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none"></div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-left text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Discover Your Perfect <span className="text-orange-500">Aesthetic</span>
          </h1>

          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Explore a curated collection of premium tiles designed to elevate every space.
          </p>
          <Link href="/all-tiles">
            <button className="bg-orange-700 hover:bg-orange-800 text-white px-8 py-3 rounded-md transition duration-300 cursor-pointer">
              Browse Now →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;