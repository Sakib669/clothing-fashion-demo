"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS } from "@/data/products";

export default function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  } = useShop();

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input and handle keyboard shortcut Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectSearch = (term: string) => {
    setQuery(term);
    addRecentSearch(term);
  };

  const quickPills = [
    "Hoodie",
    "Puffer Jacket",
    "Wool Scarf",
    "Rib-Knit Hat",
    "Chunky Trainers",
    "Selvedge Denim",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-20 flex justify-center">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 flex flex-col z-10 my-auto animate-in zoom-in-95 duration-200 max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-neutral-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                addRecentSearch(query.trim());
              }
            }}
            placeholder="Search fashion atelier, styles, fabrics (e.g. Hoodie, Cashmere)..."
            className="w-full text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-hidden"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-neutral-400 hover:text-black rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-neutral-400 bg-neutral-100 rounded-md">
              ESC
            </kbd>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* If searching */}
          {query.trim() ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Products ({filteredProducts.length})
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-neutral-500 text-xs sm:text-sm">
                  No matching garments found for &quot;{query}&quot;. Try exploring &quot;Hoodie&quot; or &quot;Jacket&quot;.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.id}`}
                      onClick={() => {
                        addRecentSearch(query);
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all"
                    >
                      <div className="relative w-14 h-16 rounded-xl bg-neutral-100 overflow-hidden shrink-0">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-contain p-1 mix-blend-multiply"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-neutral-900 uppercase truncate">
                          {p.name}
                        </h4>
                        <p className="text-[11px] text-neutral-500 truncate">
                          {p.subCategory}
                        </p>
                        <span className="text-xs font-mono font-bold text-neutral-900">
                          ${p.price.toFixed(2)}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Quick Tags */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Trending Collections
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickPills.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSelectSearch(tag)}
                      className="px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="space-y-2.5 pt-4 border-t border-neutral-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Recent Searches
                    </span>
                    <button
                      onClick={clearRecentSearches}
                      className="text-[11px] text-neutral-400 hover:text-neutral-700 underline"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSelectSearch(term)}
                        className="w-full flex items-center justify-between py-2 px-3 rounded-xl hover:bg-neutral-50 text-left text-xs text-neutral-700"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{term}</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-neutral-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
