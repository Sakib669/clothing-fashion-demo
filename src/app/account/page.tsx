"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Package, MapPin, Heart, Shield, Clock, CheckCircle2 } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function AccountPage() {
  const { wishlistCount, cartCount } = useShop();
  const [activeTab, setActiveTab] = useState<"orders" | "address" | "preferences">("orders");

  const simulatedOrders = [
    {
      id: "MLN-2025-8841",
      date: "November 4, 2025",
      status: "In Transit from Milan",
      total: 271.04,
      items: ["Loose Fit Hoodie (Onyx Black, L)", "Rib-Knit Hat (Cream White)"],
    },
    {
      id: "MLN-2025-7612",
      date: "October 18, 2025",
      status: "Delivered",
      total: 150.05,
      items: ["Relaxed Fit Cor Jacket (Deep Obsidian, M)"],
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-white min-h-[70vh]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-neutral-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xl uppercase font-mono">
              AM
            </div>
            <div>
              <h1 className="text-2xl font-extrabold uppercase tracking-tight text-neutral-900">
                Atelier Member
              </h1>
              <p className="text-xs text-neutral-500 font-mono">
                milano.member@harfa-atelier.com • VIP Tier
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/wishlist"
              className="px-4 py-2 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-700 hover:text-black flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Wishlist ({wishlistCount})</span>
            </Link>
            <Link
              href="/cart"
              className="px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-black flex items-center gap-1.5"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Bag ({cartCount})</span>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-neutral-100 my-6">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative ${
              activeTab === "orders"
                ? "text-neutral-900 border-b-2 border-neutral-900"
                : "text-neutral-400 hover:text-neutral-700"
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab("address")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative ${
              activeTab === "address"
                ? "text-neutral-900 border-b-2 border-neutral-900"
                : "text-neutral-400 hover:text-neutral-700"
            }`}
          >
            Dispatch Addresses
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative ${
              activeTab === "preferences"
                ? "text-neutral-900 border-b-2 border-neutral-900"
                : "text-neutral-400 hover:text-neutral-700"
            }`}
          >
            Atelier Preferences
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {simulatedOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-[#F9FAFB] border border-neutral-100 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200/60 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-neutral-900">
                      {order.id}
                    </span>
                    <span className="text-xs text-neutral-400 ml-2">
                      Placed on {order.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{order.status}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-xs text-neutral-700 font-medium">
                        • {item}
                      </p>
                    ))}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">
                      Total Billed
                    </span>
                    <span className="font-mono font-extrabold text-sm text-neutral-900">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "address" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-neutral-200 space-y-3 relative">
              <span className="px-2.5 py-1 bg-neutral-900 text-white text-[10px] font-bold uppercase rounded-md">
                Default Primary
              </span>
              <h3 className="text-sm font-bold text-neutral-900 uppercase">
                Milan Atelier Residence
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Via Della Spiga 12, Piano 4
                <br />
                20121 Milano (MI), Italy
                <br />
                Phone: +39 340 551 9283
              </p>
            </div>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="max-w-xl p-6 rounded-3xl bg-[#F9FAFB] border border-neutral-100 space-y-4 text-xs text-neutral-700">
            <h3 className="text-sm font-bold text-neutral-900 uppercase">
              Curated Style Profile
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-neutral-200/60">
                <span>Default Silhouette Size</span>
                <span className="font-bold font-mono">Medium (Drop Shoulder)</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-neutral-200/60">
                <span>Runway Lookbook Notifications</span>
                <span className="text-emerald-600 font-bold">Active</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Currency</span>
                <span className="font-bold font-mono">USD ($)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
