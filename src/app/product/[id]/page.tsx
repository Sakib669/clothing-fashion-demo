import React from "react";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductDetailsClient from "./ProductDetailsClient";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.featured)
  ).slice(0, 4);

  return (
    <div className="bg-white min-h-screen">
      <ProductDetailsClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </div>
  );
}
