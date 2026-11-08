"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS } from "@/data/products";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useShop();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-12 sm:py-16 bg-white min-h-[70vh]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[11px] font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-rose-600" />
            <span>Saved Silhouettes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 uppercase">
            MY WISHLIST ({wishlistCount})
          </h1>
          <p className="text-xs sm:text-sm font-medium tracking-widest text-neutral-500 uppercase">
            RESERVED PIECES SYNCHRONIZED ACROSS YOUR ATELIER SESSION
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-24 space-y-5 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <Heart className="w-10 h-10 stroke-1" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-neutral-900 uppercase">
                Your wishlist is empty
              </h2>
              <p className="text-xs text-neutral-500">
                You haven&apos;t saved any atelier pieces yet. Tap the heart icon on any product to save it here.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => addToCart(p));
                }}
                className="px-6 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Bag</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col border border-neutral-100 rounded-3xl p-4 bg-white shadow-xs hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[4/5] rounded-2xl bg-[#F3F4F6] overflow-hidden flex items-center justify-center p-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shadow-xs hover:scale-105 transition-transform"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-4 flex flex-col justify-between grow space-y-4">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                        {product.subCategory}
                      </span>
                      <Link
                        href={`/product/${product.id}`}
                        className="text-sm font-bold text-neutral-900 uppercase tracking-wide hover:underline line-clamp-1 block"
                      >
                        {product.name}
                      </Link>
                      <div className="font-mono font-bold text-sm text-neutral-900 mt-1">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product);
                        toggleWishlist(product.id);
                      }}
                      className="w-full py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
