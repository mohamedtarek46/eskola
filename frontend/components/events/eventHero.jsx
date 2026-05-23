"use client";
import Image from "next/image";
export default function EventHero({ image }) {
  return (
    <div className="w-full h-87.5 md:h-125 overflow-hidden relative">
      <Image fill src={image} alt="event" className="z-1" priority/>
      <div className="absolute inset-0 bg-white z-0 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gray-300 rounded-full animate-spin" />
      </div>
    </div>
  );
}
