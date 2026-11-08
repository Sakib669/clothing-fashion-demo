"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/types";

export default function WinterCollection() {
  const {
    isInWishlist,
    toggleWishlist,
    addToCart,
    setQuickViewProduct,
  } = useShop();

  const [visibleCount, setVisibleCount] = useState(8);

  const winterItems = PRODUCTS.slice(0, visibleCount);
  const hasMore = visibleCount < PRODUCTS.length;

  return (
    <section id="winter-collections" className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 uppercase">
            WINTER COLLECTIONS
          </h2>
          <p className="text-xs sm:text-sm font-medium tracking-widest text-neutral-500 uppercase">
            LET US LOVE WINTER FOR IT IS THE SPRING OF GENIUS
          </p>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {winterItems.map((product) => {
            const isWishlisted = isInWishlist(product.id);

            return (
              <div key={product.id} className="group flex flex-col">
                {/* Product Card Image Container */}
                <div className="relative aspect-[4/5] w-full rounded-2xl bg-[#F3F4F6] overflow-hidden flex items-center justify-center p-6 transition-all duration-300 hover:shadow-md">
                  {/* Product Image */}
                  <div className="relative w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-105">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain object-center mix-blend-multiply"
                    />
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isWishlisted
                        ? "bg-rose-50 text-rose-600 shadow-sm"
                        : "bg-white/80 hover:bg-white text-neutral-600 hover:text-black shadow-xs"
                    }`}
                    aria-label={`Save ${product.name} to wishlist`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? "fill-rose-600 text-rose-600" : ""
                      }`}
                    />
                  </button>

                  {/* Hover Quick Actions */}
                  <div className="absolute inset-x-4 bottom-4 z-10 flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="flex-1 py-2.5 px-3 bg-white/95 hover:bg-white text-neutral-900 text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Quick View
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="py-2.5 px-3 bg-neutral-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center transition-colors"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Product Metadata */}
                <div className="pt-4 flex flex-col justify-between grow">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/product/${product.id}`}
                      className="text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-wide hover:underline line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <div className="text-right shrink-0">
                      <div className="text-xs sm:text-sm font-bold text-neutral-900 font-mono">
                        ${product.price.toFixed(2)}
                      </div>
                      {product.originalPrice > product.price && (
                        <div className="text-[11px] text-neutral-400 line-through font-mono">
                          ${product.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-[10px] sm:text-[11px] font-medium tracking-wider text-neutral-400 uppercase mt-1">
                    MRP INCLUSIVE OF ALL TAXES
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Products Button */}
        {hasMore && (
          <div className="text-center mt-14 sm:mt-18">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 4, PRODUCTS.length))}
              className="px-9 py-3.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              LOAD MORE PRODUCTS
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
