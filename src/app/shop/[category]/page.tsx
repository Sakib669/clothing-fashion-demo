import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductCategory, Product } from "@/types";
import CategoryProductGrid from "./CategoryProductGrid";

export function generateStaticParams() {
  return [
    { category: "men" },
    { category: "women" },
    { category: "kids" },
    { category: "accessories" },
    { category: "gifts" },
  ];
}

const CATEGORY_META: Record<
  string,
  { title: string; subtitle: string; banner: string }
> = {
  men: {
    title: "MEN'S COLLECTION",
    subtitle: "TAILORED OVERSHIRTS, HEAVYWEIGHT HOODIES & SELVEDGE DENIM",
    banner:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=2000&q=85",
  },
  women: {
    title: "WOMEN'S ATELIER",
    subtitle: "CLOUD-LIKE ALPACA KNITWEAR, DOWN PUFFERS & TIMELESS SILHOUETTES",
    banner:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2000&q=85",
  },
  kids: {
    title: "KIDS EDIT",
    subtitle: "COMFORTABLE WEATHERPROOF LAYERS & WARMTH WITHOUT COMPROMISE",
    banner:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=2000&q=85",
  },
  accessories: {
    title: "FINE ACCESSORIES",
    subtitle: "HAND-KNOTTED LAMBSWOOL SCARVES, VEGETABLE-TANNED BAGS & BEANIES",
    banner:
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=2000&q=85",
  },
  gifts: {
    title: "CURATED GIFTS",
    subtitle: "EXCLUSIVE MILANO CAPSULES READY FOR SIGNATURE PRESENTATION",
    banner:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=85",
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = CATEGORY_META[category.toLowerCase()];

  if (!meta) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => {
    if (category.toLowerCase() === "gifts") {
      return p.category === "accessories" || p.price > 100;
    }
    return p.category === category.toLowerCase();
  });

  return (
    <div className="bg-white">
      {/* Category Hero Banner */}
      <div className="relative w-full h-[360px] sm:h-[440px] bg-neutral-900 overflow-hidden flex items-center justify-center">
        <Image
          src={meta.banner}
          alt={meta.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.72] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-bold tracking-widest text-neutral-300 uppercase">
            Milan Prêt-à-Porter
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            {meta.title}
          </h1>
          <p className="text-xs sm:text-sm font-medium tracking-widest text-neutral-200 uppercase max-w-xl mx-auto">
            {meta.subtitle}
          </p>
        </div>
      </div>

      {/* Interactive Products Grid Client Component */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <CategoryProductGrid
          products={categoryProducts}
          categoryTitle={meta.title}
        />
      </div>
    </div>
  );
}
