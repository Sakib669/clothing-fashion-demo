"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, Heart, Eye, ShoppingBag, Check } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { ProductCategory, Product } from "@/types";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as ProductCategory | null;
  const subParam = searchParams.get("sub");

  const { isInWishlist, toggleWishlist, addToCart, setQuickViewProduct } =
    useShop();

  const [activeCategory, setActiveCategory] = useState<string>(
    categoryParam || "all"
  );
  const [activeSub, setActiveSub] = useState<string>(subParam || "all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(300);

  const categories = [
    { label: "All Garments", value: "all" },
    { label: "Men's", value: "men" },
    { label: "Women's", value: "women" },
    { label: "Kid's", value: "kids" },
    { label: "Accessories", value: "accessories" },
    { label: "Gifts", value: "gifts" },
  ];

  const subCategories = useMemo(() => {
    const list = new Set<string>();
    PRODUCTS.forEach((p) => {
      if (activeCategory === "all" || p.category === activeCategory) {
        list.add(p.subCategory);
      }
    });
    return ["all", ...Array.from(list)];
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat =
        activeCategory === "all" || p.category === activeCategory;
      const matchSub = activeSub === "all" || p.subCategory === activeSub;
      const matchPrice = p.price <= maxPrice;
      return matchCat && matchSub && matchPrice;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [activeCategory, activeSub, maxPrice, sortBy]);

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 uppercase">
            ATELIER CATALOGUE
          </h1>
          <p className="text-xs sm:text-sm font-medium tracking-widest text-neutral-500 uppercase">
            METICULOUS ITALIAN SILHOUETTES &amp; WINTER PRÊT-À-PORTER
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-4 no-scrollbar border-b border-neutral-100">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value);
                setActiveSub("all");
              }}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCategory === cat.value
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Subcategories & Controls */}
        <div className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-100 mb-8">
          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0">
            {subCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSub(sub)}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeSub === sub
                    ? "bg-neutral-200 text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                {sub === "all" ? "All Subcategories" : sub}
              </button>
            ))}
          </div>

          {/* Sort & Price Filter Controls */}
          <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 font-mono">
                Under ${maxPrice}
              </span>
              <input
                type="range"
                min="50"
                max="300"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-neutral-900 cursor-pointer"
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold uppercase tracking-wider bg-neutral-100 py-2 px-3 rounded-xl border border-neutral-200 focus:outline-hidden"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex justify-between items-center text-xs text-neutral-400 uppercase tracking-widest font-mono">
          <span>{filteredProducts.length} Garments Available</span>
          <span>Milan Haute Standards</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <p className="text-sm text-neutral-500">
              No pieces match your selected filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveSub("all");
                setMaxPrice(300);
              }}
              className="px-6 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => {
              const isWishlisted = isInWishlist(product.id);

              return (
                <div key={product.id} className="group flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] w-full rounded-2xl bg-[#F3F4F6] overflow-hidden flex items-center justify-center p-6 transition-all duration-300 hover:shadow-md">
                    <div className="relative w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-105">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain object-center mix-blend-multiply"
                      />
                    </div>

                    {/* Wishlist Button */}
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
                      aria-label="Wishlist toggle"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted ? "fill-rose-600 text-rose-600" : ""
                        }`}
                      />
                    </button>

                    {/* Hover Actions */}
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

                  {/* Metadata */}
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
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
