"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function LookbookBanner() {
  const { setIsLookbookOpen } = useShop();

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Panoramic Rounded Outer Container */}
        <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden bg-neutral-900 shadow-md group">
          {/* Winter Models Image */}
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2000&q=85"
            alt="Wear to Winter Runway Presentation"
            fill
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.88] contrast-[1.05] transform transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

          {/* Top-Left Editorial Label */}
          <div className="absolute top-8 left-8 sm:top-10 sm:left-10 z-10 space-y-1">
            <h3 className="text-sm sm:text-base lg:text-lg font-bold tracking-widest text-white uppercase drop-shadow-sm">
              WEAR TO WINTER
            </h3>
            <p className="text-[10px] sm:text-xs font-medium tracking-widest text-neutral-300 uppercase">
              LET US LOVE WINTER FOR IT IS THE SPRING
            </p>
          </div>

          {/* Center Interactive Video Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={() => setIsLookbookOpen(true)}
              className="relative group/play flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/40 hover:bg-black/70 border border-white/40 text-white backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Play Winter Runway Film"
            >
              <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-60" />
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
            </button>
          </div>

          {/* Bottom-Right "SHOP NOW" Action Pill */}
          <div className="absolute bottom-8 right-8 sm:bottom-10 sm:right-10 z-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-black/80 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/20 backdrop-blur-md shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
