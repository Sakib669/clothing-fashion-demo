# clothing-fashion-demo

> Luxury Milan Haute Prêt-à-Porter & Winter Collections E-Commerce Storefront. Engineered with Next.js 16+, TypeScript, Tailwind CSS, pnpm, and full LocalStorage state synchronization.

## Features

- **Exact Milan Winter Atelier Design**: Pixel-accurate implementation of the reference layout with high-contrast typography, studio fashion photography, and clean Scandinavian-Italian minimalism.
- **AIDA & Anti-Slop Architecture**:
  - **Attention**: Ultra-wide 2-line clamp Hero (`IN THE RIGHT OUTFIT ANYTHING IS POSSIBLE`) with dual pill CTAs.
  - **Interest**: 4-column Winter Collections pedestal grid with taxes note and wishlist hearts, plus a gapless 3-column auto-dense Bento grid.
  - **Desire**: Paris runway boutique split narrative with red signature script overlay and panoramic *Wear to Winter* lookbook video modal.
  - **Action**: Audience portal cards (Men, Women, Kids), discount promo engine (`HARFA20`, `WINTER87`), and newsletter subscription.
- **Full Catalogue & Category Routing**:
  - `/shop` — Comprehensive catalog browse with price filters, subcategory tabs, and sorting.
  - `/shop/[category]` — Bespoke category hubs for Men, Women, Kids, Accessories, and Gifts.
  - `/product/[id]` — Dynamic product detail pages with multi-angle galleries, color swatches, size picker with size guide, accordions, and client reviews.
  - `/cart` & Slide-Over Bag Drawer — Quantity controls, promo code engine, and checkout simulator with confetti.
  - `/wishlist` & Slide-Over Wishlist Drawer — Saved favorites with 1-click move to bag.
  - `/account` — Atelier member profile with simulated order tracking.
- **LocalStorage State Sync**: Shopping bag, wishlist, promo codes, search queries, and newsletter subscription persist across reloads.
- **Responsive & Touch Optimized**: Fluid collapse across mobile, tablet, and desktop viewports with 44px minimum touch targets.

## Tech Stack

- **Framework**: Next.js 16.4.5 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm 12
- **Icons**: Lucide React
- **Animations & Effects**: GSAP, Canvas Confetti

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev -p 3010
```

Open [http://localhost:3010](http://localhost:3010) in your browser.

## Production Build

```bash
pnpm build
pnpm start -p 3010
```
