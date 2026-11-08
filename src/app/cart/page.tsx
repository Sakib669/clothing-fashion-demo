"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ShieldCheck,
  Check,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";
import confetti from "canvas-confetti";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedPromo,
    promoDiscountPercent,
    applyPromo,
    removePromo,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    cartCount,
  } = useShop();

  const [promoInput, setPromoInput] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromo(promoInput)) {
      setPromoInput("");
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }, 1500);
  };

  return (
    <div className="py-12 sm:py-16 bg-white min-h-[70vh]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 uppercase">
            SHOPPING BAG ({cartCount})
          </h1>
          <p className="text-xs sm:text-sm font-medium tracking-widest text-neutral-500 uppercase">
            REVIEW YOUR ATELIER SELECTIONS BEFORE GLOBAL DISPATCH
          </p>
        </div>

        {orderComplete ? (
          <div className="text-center py-20 space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-neutral-900">
                Order Confirmed
              </h2>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Thank you for your order. Your garments are being individually wrapped in signature tissue and boxed in our Milan atelier.
              </p>
            </div>
            <Link
              href="/"
              onClick={() => {
                setOrderComplete(false);
                clearCart();
              }}
              className="inline-block px-8 py-3.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md"
            >
              Return to Ateliers
            </Link>
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-24 space-y-5 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <ShoppingBag className="w-10 h-10 stroke-1" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-neutral-900 uppercase">
                Your bag is empty
              </h2>
              <p className="text-xs text-neutral-500">
                Discover pieces from our Winter Collections and Paris Capsule.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Items Column (Span 8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="divide-y divide-neutral-100 border-y border-neutral-100">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-28 h-32 rounded-2xl bg-[#F3F4F6] overflow-hidden shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain p-3 mix-blend-multiply"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                        {item.product.subCategory}
                      </span>
                      <Link
                        href={`/product/${item.product.id}`}
                        className="text-base font-bold text-neutral-900 uppercase hover:underline block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-neutral-500">
                        Size: <span className="font-semibold text-neutral-900">{item.selectedSize}</span> • Color: <span className="font-semibold text-neutral-900">{item.selectedColor}</span>
                      </p>
                      <div className="text-xs font-mono font-bold text-neutral-900 sm:hidden pt-2">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-neutral-200 rounded-full px-2 py-1">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                        className="p-1 text-neutral-500 hover:text-black"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                        className="p-1 text-neutral-500 hover:text-black"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price Column */}
                    <div className="hidden sm:block text-right font-mono font-bold text-sm text-neutral-900 w-24">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeFromCart(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                      className="text-neutral-400 hover:text-rose-600 transition-colors p-2"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-neutral-500 hover:text-rose-600 uppercase underline"
                >
                  Clear Bag
                </button>
                <Link
                  href="/shop"
                  className="text-xs font-semibold text-neutral-900 hover:underline uppercase"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Summary Column (Span 4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-[#F9FAFB] rounded-3xl p-6 sm:p-8 border border-neutral-100 space-y-6">
                <h2 className="text-base font-extrabold uppercase tracking-tight text-neutral-900">
                  Order Summary
                </h2>

                {/* Promo Input */}
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-800 uppercase">
                        Code {appliedPromo} ({(promoDiscountPercent * 100).toFixed(0)}% OFF)
                      </span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-xs text-neutral-500 hover:text-neutral-900 underline uppercase"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="PROMO CODE (e.g. HARFA20)"
                      className="grow px-3 py-2 text-xs uppercase font-mono tracking-wider bg-white border border-neutral-200 rounded-xl focus:border-black focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase rounded-xl"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Calculations */}
                <div className="space-y-2.5 text-xs border-y border-neutral-200 py-4">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-neutral-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount</span>
                      <span className="font-mono">
                        -${discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping Courier</span>
                    <span className="font-mono font-bold text-neutral-900">
                      {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-neutral-900 pt-2 border-t border-neutral-200">
                    <span>Total Amount</span>
                    <span className="font-mono">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleSimulateCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span>Securing Order...</span>
                  ) : (
                    <>
                      <span>Complete Atelier Purchase</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-bit Encrypted Luxury Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
