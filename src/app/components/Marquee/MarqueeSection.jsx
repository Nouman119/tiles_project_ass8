import React from 'react';
import Marquee from 'react-fast-marquee';

const MarqueeSection = () => {
  const items = [
    "✨ New Arrivals: Calacatta Oro Marble",
    "|",
    "Weekly Feature: Modern Geometric Patterns",
    "|",
    "Join the Community: Share Your Space & Get Featured!"
  ];

  return (
    <div className="w-full bg-[#1a1a1a] py-5 overflow-hidden">
      <Marquee gradient={false} speed={50}>
        <div className="flex gap-8 px-4">
          {items.map((item, index) => (
            <span key={index} className="text-orange-300 font-medium whitespace-nowrap text-sm md:text-base">
              {item}
            </span>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeSection;