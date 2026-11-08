"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function FeaturedCollectionsBento() {
  const { applyPromo } = useShop();

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 uppercase">
            FEATURED COLLECTIONS
          </h2>
          <p className="text-xs sm:text-sm font-medium tracking-widest text-neutral-500 uppercase">
            TOP NEW COLLECTIONS WITH HARFA BRANDS EXPLOR NOW
          </p>
        </div>

        {/* 3-Column Gapless Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px] sm:auto-rows-[280px] grid-flow-dense">
          {/* Column 1 - Top: JEANS */}
          <Link
            href="/shop?category=men&sub=jeans"
            className="group relative rounded-3xl overflow-hidden bg-neutral-100 p-6 flex flex-col justify-end shadow-xs hover:shadow-md transition-all duration-300 row-span-1"
          >
            <Image
              src="https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80"
              alt="Jeans Collection"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-lg sm:text-xl font-extrabold tracking-wider text-white uppercase">
                JEANS
              </span>
              <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white transform group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Column 2 - Top (Span 2 Rows): HOODIE Feature Card */}
          <div className="group relative rounded-3xl overflow-hidden bg-neutral-100 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 md:row-span-2">
            <Image
              src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80"
              alt="Hoodie Special Editorial"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

            {/* Top Badge */}
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/25 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase rounded-full border border-white/20">
                <Tag className="w-3 h-3" />
                LIMITED ATELIER
              </span>
            </div>

            {/* Content & Action */}
            <div className="relative z-10 space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white uppercase">
                  HOODIE
                </h3>
                <p className="text-xs sm:text-sm font-medium tracking-wider text-neutral-200 uppercase max-w-xs">
                  OPEN WITH BUY AND APPLY CODE GET OFFERS
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  href="/product/milan-01"
                  className="px-6 py-2.5 bg-black hover:bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                >
                  DISCOVER
                </Link>
                <button
                  onClick={() => applyPromo("HARFA20")}
                  className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-xs border border-white/30 transition-colors"
                  title="Claim 20% discount"
                >
                  CODE: HARFA20
                </button>
              </div>
            </div>
          </div>

          {/* Column 3 - Top: BAGS */}
          <Link
            href="/shop?category=accessories&sub=bags"
            className="group relative rounded-3xl overflow-hidden bg-neutral-100 p-6 flex flex-col justify-end shadow-xs hover:shadow-md transition-all duration-300 row-span-1"
          >
            <Image
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
              alt="Bags Collection"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-lg sm:text-xl font-extrabold tracking-wider text-white uppercase">
                BAGS
              </span>
              <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white transform group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Column 1 - Bottom: T-SHIRTS */}
          <Link
            href="/shop?category=men&sub=t-shirts"
            className="group relative rounded-3xl overflow-hidden bg-neutral-100 p-6 flex flex-col justify-end shadow-xs hover:shadow-md transition-all duration-300 row-span-1"
          >
            <Image
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
              alt="T-Shirts Collection"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-lg sm:text-xl font-extrabold tracking-wider text-white uppercase">
                T-SHIRTS
              </span>
              <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white transform group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Column 3 - Bottom: JACKET */}
          <Link
            href="/shop?category=men&sub=jackets"
            className="group relative rounded-3xl overflow-hidden bg-neutral-100 p-6 flex flex-col justify-end shadow-xs hover:shadow-md transition-all duration-300 row-span-1"
          >
            <Image
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
              alt="Jacket Collection"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-lg sm:text-xl font-extrabold tracking-wider text-white uppercase">
                JACKET
              </span>
              <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white transform group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Full Width or Bottom Row - SNEAKERS */}
          <Link
            href="/shop?category=men&sub=footwear"
            className="group relative rounded-3xl overflow-hidden bg-neutral-100 p-6 flex flex-col justify-end shadow-xs hover:shadow-md transition-all duration-300 md:col-span-3 row-span-1"
          >
            <Image
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1600&q=80"
              alt="Sneakers Footwear Collection"
              fill
              sizes="100vw"
              className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-lg sm:text-2xl font-extrabold tracking-wider text-white uppercase">
                  SNEAKERS
                </span>
                <p className="text-xs text-neutral-300 font-medium tracking-wide">
                  Architectural luxury trainers and low-top runners
                </p>
              </div>
              <span className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2">
                <span>Explore Footwear</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
