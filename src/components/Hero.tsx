"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function Hero() {
  const { setIsLookbookOpen } = useShop();

  return (
    <section className="relative w-full overflow-hidden bg-neutral-900">
      {/* Hero Visual Container */}
      <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] max-h-[85vh]">
        {/* Background Image: 3 stylish models matching the reference */}
        <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=85"
          alt="Milan Winter Haute Runway Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top filter brightness-[0.78] contrast-[1.05]"
        />

        {/* Ambient Dark Gradient Wash for Pristine Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/45" />

        {/* Text & Content Layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-700">
            {/* The 2-Line Iron Rule H1 */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.08] drop-shadow-md">
              IN THE RIGHT OUTFIT
              <br className="hidden sm:inline" /> ANYTHING IS POSSIBLE
            </h1>

            {/* Twin High-Contrast Pill Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 pt-2">
              <Link
                href="/#winter-collections"
                className="px-8 sm:px-10 py-3 sm:py-3.5 bg-white text-neutral-950 font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-full hover:bg-neutral-100 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg"
              >
                COLLECTIONS
              </Link>
              <Link
                href="/shop"
                className="px-8 sm:px-10 py-3 sm:py-3.5 bg-black/60 hover:bg-black text-white border border-white/30 hover:border-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-full hover:scale-[1.02] active:scale-95 backdrop-blur-sm transition-all duration-200 shadow-lg"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
