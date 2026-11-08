"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, X, ArrowRight, Clock, Phone } from "lucide-react";

export default function EditorialStory() {
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  const flagshipStores = [
    {
      city: "Milan Flagship",
      address: "Via Montenapoleone 18, 20121 Milano, Italy",
      hours: "Mon – Sat: 10:00 – 19:30",
      phone: "+39 02 8846 1200",
    },
    {
      city: "Paris Atelier",
      address: "42 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
      hours: "Mon – Sat: 10:30 – 19:00",
      phone: "+33 1 42 68 55 00",
    },
    {
      city: "London Mayfair",
      address: "14 Old Bond Street, London W1S 4PP, UK",
      hours: "Mon – Sat: 10:00 – 18:30",
      phone: "+44 20 7493 8812",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Boutique rack with calligraphic accent */}
          <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-neutral-100 group shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
              alt="Harfa Collections Paris Atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark subtle overlay for text contrast */}
            <div className="absolute inset-0 bg-black/15 transition-opacity group-hover:bg-black/25" />

            {/* Hand-drawn red script overlay matching reference ("Harfa Collections") */}
            <div className="absolute top-5 left-5 sm:top-8 sm:left-8 select-none">
              <span
                className="text-2xl sm:text-4xl lg:text-5xl font-serif italic font-extrabold text-[#DC2626] tracking-wide drop-shadow-md inline-block transform -rotate-3"
                style={{
                  fontFamily: "Georgia, 'Playfair Display', serif",
                }}
              >
                Harfa
                <br />
                Collections
              </span>
            </div>
          </div>

          {/* Right: Editorial Narrative & Sales Metric */}
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8 lg:pl-6">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 uppercase leading-[1.15]">
                FIND YOUR PERFECT
                <br />
                LOOK AT HARFA STY
                <br />
                NEW ON PARIS
              </h2>

              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-lg">
                Crafted in limited seasonal ateliers, our latest Paris Runway Capsule blends structured Italian silhouettes with raw, tactile Scandinavian comfort. Each garment is cut from ethically sourced materials and tailored for the effortless cadence of modern urban life.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <div className="text-xs sm:text-sm font-bold tracking-widest text-neutral-900 uppercase">
                SALES AND DISCOUNT!
              </div>
              <div className="text-5xl sm:text-6xl font-extrabold font-mono text-neutral-950 tracking-tight">
                87%
              </div>
            </div>

            <div>
              <button
                onClick={() => setIsStoreModalOpen(true)}
                className="px-8 py-3.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                FIND THE STORE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Flagship Store Locator Modal */}
      {isStoreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-neutral-900" />
                <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
                  Flagship Showrooms
                </h3>
              </div>
              <button
                onClick={() => setIsStoreModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-black rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {flagshipStores.map((store) => (
                <div
                  key={store.city}
                  className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2"
                >
                  <h4 className="font-bold text-neutral-900 text-sm uppercase">
                    {store.city}
                  </h4>
                  <p className="text-xs text-neutral-600 flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-400" />
                    <span>{store.address}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {store.hours}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      {store.phone}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsStoreModalOpen(false)}
                className="px-6 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
