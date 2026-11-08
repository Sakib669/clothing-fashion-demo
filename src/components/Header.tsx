"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function Header() {
  const pathname = usePathname();
  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
  } = useShop();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Men's", href: "/shop/men" },
    { label: "woman's", href: "/shop/women" },
    { label: "Kid's", href: "/shop/kids" },
    { label: "Accessories", href: "/shop/accessories" },
    { label: "Gifts", href: "/shop/gifts" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs py-3.5"
            : "bg-white py-4 sm:py-5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 uppercase font-sans hover:opacity-90 transition-opacity"
          >
            MILAN
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-10">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === "/shop/men" && pathname === "/");
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm tracking-wide transition-all duration-200 relative py-1 ${
                    isActive
                      ? "text-neutral-900 font-semibold"
                      : "text-neutral-600 hover:text-neutral-900 font-normal"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-100"
              aria-label="Search collection"
              title="Search (Cmd + K)"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-100 relative"
              aria-label="Saved Wishlist"
              title="Saved items"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-rose-600 rounded-full ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-100 relative"
              aria-label="Shopping Bag"
              title="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-neutral-900 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account Trigger */}
            <Link
              href="/account"
              className="p-2 text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-100 hidden sm:inline-flex"
              aria-label="User Account"
              title="My Account"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-800 hover:text-black transition-colors rounded-lg md:hidden hover:bg-neutral-100"
              aria-label="Open mobile navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-100 bg-white/98 backdrop-blur-lg px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-neutral-800 hover:text-neutral-950 py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-neutral-700 hover:text-black"
              >
                <User className="w-4 h-4" />
                <span>My Account</span>
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsWishlistOpen(true);
                }}
                className="flex items-center gap-2 text-sm text-neutral-700 hover:text-black"
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist ({wishlistCount})</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
