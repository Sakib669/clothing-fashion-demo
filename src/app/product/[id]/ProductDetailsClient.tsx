"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Star,
  ChevronDown,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  Share2,
} from "lucide-react";
import { Product } from "@/types";
import { useShop } from "@/context/ShopContext";
import confetti from "canvas-confetti";

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const {
    addToCart,
    isInWishlist,
    toggleWishlist,
    showToast,
    setQuickViewProduct,
  } = useShop();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || "Standard"
  );
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string>("details");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const images = product.galleryImages?.length
    ? product.galleryImages
    : [product.image];

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err) {
      // ignore
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard");
    }
  };

  const reviews = [
    {
      author: "Matteo R.",
      location: "Milan, Italy",
      rating: 5,
      date: "3 days ago",
      comment:
        "The heavyweight French Terry drape is astonishing. True architectural cut with clean hood posture. Better than mainline luxury houses.",
    },
    {
      author: "Camille D.",
      location: "Paris, France",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Flawless fabric density and pure minimalist finish. The tactile warmth in freezing weather is unmatched.",
    },
    {
      author: "Julian K.",
      location: "London, UK",
      rating: 4.8,
      date: "1 month ago",
      comment:
        "Fast dispatch, arrived in an exquisite gift box. Fits slightly oversized exactly as described.",
    },
  ];

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-black transition-colors">
            Milan
          </Link>
          <span>/</span>
          <Link
            href={`/shop/${product.category}`}
            className="hover:text-black transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-bold truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Gallery (Span 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage */}
            <div className="relative aspect-[4/5] w-full rounded-3xl bg-[#F3F4F6] overflow-hidden flex items-center justify-center p-8 shadow-sm">
              <Image
                src={images[activeImage] || product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain object-center mix-blend-multiply p-4"
              />

              {product.discountPercent && (
                <div className="absolute top-6 left-6 z-10 px-3.5 py-1.5 bg-neutral-900 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md">
                  {product.discountPercent}% OFF
                </div>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-6 right-6 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  isWishlisted
                    ? "bg-rose-50 text-rose-600 shadow-md"
                    : "bg-white/90 hover:bg-white text-neutral-600 hover:text-black shadow-sm"
                }`}
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? "fill-rose-600 text-rose-600" : ""
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Ribbon */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-28 rounded-2xl overflow-hidden bg-[#F3F4F6] p-2 border-2 transition-all shrink-0 ${
                      activeImage === idx
                        ? "border-neutral-900 ring-2 ring-neutral-900/20"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-contain mix-blend-multiply"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specification & Purchase (Span 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                  {product.subCategory}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 uppercase tracking-tight">
                {product.name}
              </h1>

              {/* Price & Rating Row */}
              <div className="flex items-baseline justify-between pt-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-neutral-400 line-through font-mono">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-400">
                    ({product.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              <p className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                MRP INCLUSIVE OF ALL TAXES • FREE GLOBAL SHIPPING
              </p>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold uppercase tracking-wider text-neutral-900">
                    Color: <span className="text-neutral-500 font-normal">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        selectedColor === c.name
                          ? "ring-2 ring-neutral-900 ring-offset-2 scale-110 shadow-sm"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold uppercase tracking-wider text-neutral-900">
                    Select Size
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-neutral-500 hover:text-black underline"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-12 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedSize === s
                          ? "bg-neutral-900 text-white shadow-sm"
                          : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-neutral-200 rounded-full px-3 py-2 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-neutral-500 hover:text-black"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-xs font-mono font-bold text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-neutral-500 hover:text-black"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-8 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>

              {/* Atelier Perks */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-neutral-500">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Complimentary Courier</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>30-Day Atelier Returns</span>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-neutral-100 divide-y divide-neutral-100 pt-2">
              {/* Details Accordion */}
              <div>
                <button
                  onClick={() =>
                    setOpenAccordion(
                      openAccordion === "details" ? "" : "details"
                    )
                  }
                  className="w-full py-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-neutral-900"
                >
                  <span>Materials &amp; Atelier Specifications</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === "details" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "details" && (
                  <div className="pb-4 text-xs text-neutral-600 space-y-2">
                    <ul className="list-disc pl-5 space-y-1.5">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Fit Accordion */}
              <div>
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "fit" ? "" : "fit")
                  }
                  className="w-full py-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-neutral-900"
                >
                  <span>Fit &amp; Sizing Architecture</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === "fit" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "fit" && (
                  <div className="pb-4 text-xs text-neutral-600 space-y-2 leading-relaxed">
                    Designed for a relaxed, drop-shoulder silhouette with structured posture. Fits true to size for an architectural drape. For a fitted tailored look, take one size down.
                  </div>
                )}
              </div>

              {/* Shipping Accordion */}
              <div>
                <button
                  onClick={() =>
                    setOpenAccordion(
                      openAccordion === "shipping" ? "" : "shipping"
                    )
                  }
                  className="w-full py-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-neutral-900"
                >
                  <span>Dispatch &amp; Global Returns</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "shipping" && (
                  <div className="pb-4 text-xs text-neutral-600 space-y-2 leading-relaxed">
                    Orders are packaged in signature embossed gift boxes in Milan and dispatched within 24 hours. Express air courier takes 2–4 business days worldwide.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-20 sm:mt-28 pt-12 border-t border-neutral-100">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-neutral-900">
                Atelier Client Testimonials
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-neutral-900">
                  {product.rating} Out of 5.0
                </span>
                <span className="text-neutral-400 text-xs">
                  • Based on {product.reviewsCount} verified purchases
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F9FAFB] border border-neutral-100 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 uppercase">
                        {rev.author}
                      </span>
                      <span className="text-[11px] text-neutral-400 ml-2">
                        {rev.location}
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-400">
                      {rev.date}
                    </span>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 sm:mt-28 pt-12 border-t border-neutral-100">
            <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-neutral-900">
                You May Also Admire
              </h2>
              <p className="text-xs text-neutral-500 uppercase tracking-widest">
                Curated companion silhouettes
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div key={p.id} className="group flex flex-col">
                  <div className="relative aspect-[4/5] rounded-2xl bg-[#F3F4F6] overflow-hidden flex items-center justify-center p-6">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="pt-3 flex justify-between items-start">
                    <Link
                      href={`/product/${p.id}`}
                      className="text-xs font-bold uppercase tracking-wide hover:underline truncate max-w-[180px]"
                    >
                      {p.name}
                    </Link>
                    <span className="text-xs font-bold font-mono">
                      ${p.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <h3 className="text-base font-bold uppercase tracking-tight text-neutral-900">
                Atelier Sizing Guide (CM)
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1 text-neutral-400 hover:text-black rounded-full"
              >
                ✕
              </button>
            </div>

            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 uppercase">
                  <th className="py-2">Size</th>
                  <th className="py-2">Chest</th>
                  <th className="py-2">Shoulder</th>
                  <th className="py-2">Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono">
                <tr>
                  <td className="py-2.5 font-bold">S</td>
                  <td className="py-2.5">118</td>
                  <td className="py-2.5">54</td>
                  <td className="py-2.5">69</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold">M</td>
                  <td className="py-2.5">124</td>
                  <td className="py-2.5">56</td>
                  <td className="py-2.5">71</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold">L</td>
                  <td className="py-2.5">130</td>
                  <td className="py-2.5">58</td>
                  <td className="py-2.5">73</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold">XL</td>
                  <td className="py-2.5">136</td>
                  <td className="py-2.5">60</td>
                  <td className="py-2.5">75</td>
                </tr>
              </tbody>
            </table>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
