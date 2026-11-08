"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingBag, Plus, Minus, Check, Star } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || quickViewProduct.sizes[0] || "M";
  const currentColor =
    selectedColor || quickViewProduct.colors[0]?.name || "Standard";
  const isWishlisted = isInWishlist(quickViewProduct.id);

  const images = quickViewProduct.galleryImages?.length
    ? quickViewProduct.galleryImages
    : [quickViewProduct.image];

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity, currentSize, currentColor);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-16 flex justify-center items-center">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 flex flex-col md:flex-row z-10 animate-in zoom-in-95 duration-200 max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-600 hover:text-black flex items-center justify-center shadow-xs transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Gallery Pedestal */}
        <div className="w-full md:w-1/2 bg-[#F3F4F6] p-6 flex flex-col justify-between items-center relative aspect-[4/5] md:aspect-auto">
          <div className="relative w-full h-full min-h-[260px] sm:min-h-[320px] flex items-center justify-center">
            <Image
              src={images[activeImageIndex] || quickViewProduct.image}
              alt={quickViewProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4 mix-blend-multiply"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 z-10 pt-4">
              {images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-neutral-900 ring-2 ring-neutral-900/20"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Purchase Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                {quickViewProduct.subCategory}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 uppercase tracking-tight">
                {quickViewProduct.name}
              </h3>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-neutral-900">
                  ${quickViewProduct.price.toFixed(2)}
                </span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="text-xs text-neutral-400 line-through font-mono">
                    ${quickViewProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{quickViewProduct.rating}</span>
                <span className="text-neutral-400">
                  ({quickViewProduct.reviewsCount})
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Color Swatches */}
            {quickViewProduct.colors.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Color: <span className="font-normal text-neutral-500">{currentColor}</span>
                </span>
                <div className="flex gap-2">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        currentColor === c.name
                          ? "ring-2 ring-neutral-900 ring-offset-2 scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {currentColor === c.name && (
                        <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {quickViewProduct.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Size
                  </span>
                  <span className="text-[11px] text-neutral-400">True to fit</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-10 py-1.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                        currentSize === s
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-neutral-200 rounded-full px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-neutral-500 hover:text-black"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-3 text-xs font-mono font-bold text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-neutral-500 hover:text-black"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-6 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded-full border transition-colors ${
                  isWishlisted
                    ? "border-rose-200 bg-rose-50 text-rose-600"
                    : "border-neutral-200 text-neutral-600 hover:text-black"
                }`}
                title="Save to Wishlist"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? "fill-rose-600 text-rose-600" : ""
                  }`}
                />
              </button>
            </div>

            <div className="text-center">
              <Link
                href={`/product/${quickViewProduct.id}`}
                onClick={() => setQuickViewProduct(null)}
                className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500 hover:text-neutral-900 underline"
              >
                View Full Product Details &amp; Care
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
