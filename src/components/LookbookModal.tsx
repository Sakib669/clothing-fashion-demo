"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Volume2, VolumeX, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS } from "@/data/products";

export default function LookbookModal() {
  const { isLookbookOpen, setIsLookbookOpen, addToCart } = useShop();
  const [isMuted, setIsMuted] = useState(true);
  const [activeLook, setActiveLook] = useState(0);

  if (!isLookbookOpen) return null;

  const runwayLooks = [
    {
      title: "Look 01: The Heavyweight Monolith",
      subtitle: "French Terry Loose Fit Hoodie & Japanese Selvedge Denim",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
      featuredProductId: "milan-01",
    },
    {
      title: "Look 02: Milanese Sub-Zero Tailoring",
      subtitle: "Wide-Wale Corduroy Cor Jacket & Fisherman Cashmere Beanie",
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
      featuredProductId: "milan-03",
    },
    {
      title: "Look 03: Paris Runway Minimal",
      subtitle: "Packable Down Puffer JK & Sculpted Platform Chunky Trainers",
      image:
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=80",
      featuredProductId: "milan-08",
    },
  ];

  const currentLook = runwayLooks[activeLook];
  const featuredProduct = PRODUCTS.find(
    (p) => p.id === currentLook.featuredProductId
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Dark Cinematic Backdrop */}
      <div
        onClick={() => setIsLookbookOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      {/* Main Modal Card */}
      <div className="relative w-full max-w-5xl bg-neutral-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 flex flex-col lg:flex-row max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setIsLookbookOpen(false)}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video / Visual Stage */}
        <div className="relative w-full lg:w-2/3 h-[380px] sm:h-[460px] lg:h-auto min-h-[400px] bg-black overflow-hidden flex items-end">
          <Image
            src={currentLook.image}
            alt={currentLook.title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover object-center filter brightness-[0.85] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Controls Bar */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              RUNWAY STREAM
            </span>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
              title={isMuted ? "Unmute soundtrack" : "Mute soundtrack"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Look Selector Pills */}
          <div className="relative z-20 p-6 sm:p-8 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                {currentLook.title}
              </h4>
              <p className="text-xs text-neutral-300 font-medium">
                {currentLook.subtitle}
              </p>
            </div>

            <div className="flex gap-2">
              {runwayLooks.map((look, idx) => (
                <button
                  key={look.title}
                  onClick={() => setActiveLook(idx)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                    activeLook === idx
                      ? "bg-white text-black"
                      : "bg-white/20 hover:bg-white/30 text-white border border-white/20"
                  }`}
                >
                  Look 0{idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Shop The Runway Piece */}
        <div className="w-full lg:w-1/3 p-6 sm:p-8 bg-neutral-900 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Shop The Runway Look</span>
            </div>

            {featuredProduct && (
              <div className="space-y-4">
                <div className="relative aspect-square w-full rounded-2xl bg-neutral-800 overflow-hidden flex items-center justify-center p-4">
                  <Image
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    fill
                    className="object-contain p-2 mix-blend-screen"
                  />
                </div>

                <div className="space-y-1">
                  <h5 className="text-sm font-bold text-white uppercase tracking-wider">
                    {featuredProduct.name}
                  </h5>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold font-mono text-white">
                      ${featuredProduct.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono line-through">
                      ${featuredProduct.originalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                  {featuredProduct.description}
                </p>
              </div>
            )}
          </div>

          {featuredProduct && (
            <div className="space-y-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  addToCart(featuredProduct);
                  setIsLookbookOpen(false);
                }}
                className="w-full py-3 px-6 bg-white hover:bg-neutral-100 text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Runway Piece to Bag</span>
              </button>

              <Link
                href={`/product/${featuredProduct.id}`}
                onClick={() => setIsLookbookOpen(false)}
                className="w-full py-2.5 text-center text-xs font-semibold text-neutral-400 hover:text-white uppercase tracking-wider block"
              >
                Inspect Piece Specifications
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
