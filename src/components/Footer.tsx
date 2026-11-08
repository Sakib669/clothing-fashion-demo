"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function Footer() {
  const { isNewsletterSubscribed, subscribeNewsletter } = useShop();
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeNewsletter(emailInput)) {
      setEmailInput("");
    }
  };

  return (
    <footer className="w-full bg-white border-t border-neutral-100 pt-16 sm:pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16">
          {/* Left Side: Brand & Newsletter (Span 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 uppercase font-sans inline-block"
            >
              MILAN
            </Link>

            <p className="text-xs sm:text-sm text-neutral-500 font-medium tracking-wide uppercase leading-relaxed max-w-md">
              GET NEWSLETTER UPDATE FOR UPCOMING PRODUCTS AND BEST OFFERS AND DISCOUNT FOR ALL ITEMS
            </p>

            {/* Newsletter Form */}
            {isNewsletterSubscribed ? (
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-semibold text-neutral-800 uppercase tracking-wide">
                  You are subscribed to exclusive Milan atelier releases.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md items-stretch sm:items-center gap-3 sm:gap-2 pt-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="YOUR EMAIL"
                  required
                  className="grow px-4 py-3 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 border-b border-neutral-300 focus:border-neutral-900 focus:outline-hidden transition-colors bg-transparent uppercase tracking-wider font-mono"
                />
                <button
                  type="submit"
                  className="px-7 py-3 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:scale-[1.02] active:scale-95 transition-all shrink-0 text-center"
                >
                  SUBMIT
                </button>
              </form>
            )}
          </div>

          {/* Right Side: Navigation Links (Span 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* PRODUCT Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold tracking-widest text-neutral-900 uppercase">
                PRODUCT
              </h4>
              <ul className="space-y-2.5 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <li>
                  <Link href="/shop?category=men&sub=t-shirts" className="hover:text-neutral-950 transition-colors">
                    T-SHIRT
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=men&sub=hoodies" className="hover:text-neutral-950 transition-colors">
                    HOODIE
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=men&sub=jackets" className="hover:text-neutral-950 transition-colors">
                    JACKET
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=men&sub=jeans" className="hover:text-neutral-950 transition-colors">
                    JEANS
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=accessories&sub=bags" className="hover:text-neutral-950 transition-colors">
                    HAND BAGS
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=men&sub=footwear" className="hover:text-neutral-950 transition-colors">
                    SNEAKERS
                  </Link>
                </li>
              </ul>
            </div>

            {/* CATEGORIES Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold tracking-widest text-neutral-900 uppercase">
                CATEGORIES
              </h4>
              <ul className="space-y-2.5 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <li>
                  <Link href="/shop/men" className="hover:text-neutral-950 transition-colors">
                    MEN
                  </Link>
                </li>
                <li>
                  <Link href="/shop/women" className="hover:text-neutral-950 transition-colors">
                    WOMEN
                  </Link>
                </li>
                <li>
                  <Link href="/shop/kids" className="hover:text-neutral-950 transition-colors">
                    KIDS
                  </Link>
                </li>
                <li>
                  <Link href="/shop/gifts" className="hover:text-neutral-950 transition-colors">
                    GIFT COLLECTION
                  </Link>
                </li>
                <li>
                  <Link href="/shop?filter=new" className="hover:text-neutral-950 transition-colors">
                    NEW ARRIVALS
                  </Link>
                </li>
              </ul>
            </div>

            {/* HELP Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold tracking-widest text-neutral-900 uppercase">
                HELP
              </h4>
              <ul className="space-y-2.5 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <li>
                  <Link href="/contact" className="hover:text-neutral-950 transition-colors">
                    CUSTOMER SERVICE
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-neutral-950 transition-colors">
                    MY MFW
                  </Link>
                </li>
                <li>
                  <Link href="/stores" className="hover:text-neutral-950 transition-colors">
                    FIND A STORE
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="hover:text-neutral-950 transition-colors">
                    LEGAL & PRIVACY
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-neutral-950 transition-colors">
                    CONTACT
                  </Link>
                </li>
                <li>
                  <Link href="/cookie" className="hover:text-neutral-950 transition-colors">
                    COOKIE NOTICE
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          <p>© 2025 MILAN ALLRIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span>MILANO ATELIER</span>
            <span>•</span>
            <span>PARIS RUNWAY</span>
            <span>•</span>
            <span>GLOBAL DISPATCH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
