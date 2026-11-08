"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AudiencePortals() {
  const portals = [
    {
      title: "MEN",
      href: "/shop/men",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      description: "Tailored overshirts, minimal hoodies & heavy denim",
    },
    {
      title: "WOMEN",
      href: "/shop/women",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      description: "Alpaca knitwear, structural outerwear & relaxed silhouettes",
    },
    {
      title: "KIDS",
      href: "/shop/kids",
      image:
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
      description: "Warm weather parkas, fleece layers & everyday essentials",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {portals.map((portal) => (
            <div
              key={portal.title}
              className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Image
                src={portal.image}
                alt={`${portal.title} Collection`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top filter brightness-[0.92] contrast-[1.05] transform transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Ambient Bottom Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute inset-x-6 sm:inset-x-8 bottom-6 sm:bottom-8 z-10 space-y-3">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-white uppercase drop-shadow-sm">
                    {portal.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-medium line-clamp-1 mt-0.5">
                    {portal.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={portal.href}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200"
                  >
                    <span>SHOP NOW</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
