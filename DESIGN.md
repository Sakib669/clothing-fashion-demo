# Design System: AURA MILANO (Winter & Haute Prêt-à-Porter)

## 1. Visual Theme & Atmosphere
A restrained, gallery-airy luxury editorial fashion interface with confident typographic hierarchy and fluid spring-physics interactions. The atmosphere is crisp, tactile, and Scandinavian-Italian minimal — inspired by Milan Fashion Week and high-end atelier showrooms.
- **Density:** 4 (Daily App Balanced / Editorial Spacious)
- **Variance:** 7 (Offset Asymmetric Grid & Balanced Bento)
- **Motion:** 6 (Fluid GSAP & Spring Physics)

## 2. Color Palette & Roles
- **Canvas White** (`#FFFFFF` / `#FAFAFA`) — Primary canvas surface and pristine whitespace
- **Soft Stone Surface** (`#F3F4F6` / `#EFEFEF`) — Card containers, product pedestal backings, subtle hover fills
- **Charcoal Ink** (`#111827` / `#18181B`) — Primary text, buttons, high-contrast headings
- **Muted Cashmere** (`#71717A` / `#6B7280`) — Secondary text, captions, tax tags, strike-through prices
- **Whisper Border** (`rgba(229, 231, 235, 0.8)`) — Subtle dividers, 1px structural borders
- **Atelier Crimson** (`#DC2626` / `#E11D48`) — Functional accent for active wishlist hearts, editorial script signatures, and promotional callouts
- **Deep Slate Night** (`#0F172A`) — Footer background and hero contrast zones

## 3. Typography Rules
- **Display & Headlines:** `Geist Sans` — Track-tight (`tracking-tight` / `tracking-wider` on uppercase tags), controlled scale, weight-driven hierarchy
- **Body & Subtitles:** `Geist Sans` — Relaxed leading, maximum 65 characters per line
- **Editorial Script Accent:** Hand-drawn italic signature for studio branding overlay ("Harfa Collections" / "Atelier Milan")
- **Monospace/Numbers:** `Geist Mono` — Prices, SKU tags, quantities, discount percentage badges
- **Banned:** `Inter`, generic system serifs (`Times New Roman`, `Georgia`), neon glows.

## 4. Component Stylings
- **Buttons:** Tactile pill-shaped (`rounded-full`) buttons. Active click downscale (`active:scale-95`). Primary CTA uses solid Charcoal Ink with crisp white text. Secondary CTA uses translucent stone or crisp white fill with dark text.
- **Product Cards:** Generously rounded corners (`rounded-2xl`), soft light-neutral background (`#F3F4F6`), floating absolute wishlist heart button with instant animation and local storage sync.
- **Bento Grid:** Mathematically gapless interlocking grid (`grid-flow-dense`), full-bleed imagery with subtle scale-on-hover physics (`group-hover:scale-105 duration-700`).
- **Pills & Badges:** Minimalist uppercase text tags (`text-xs font-semibold tracking-wider`).
- **Cart & Wishlist Drawers:** Slide-over overlays with backdrop blur, item counters, real-time total computation, and local storage persistence.

## 5. Layout Principles
- **Grid-First Containment:** Max-width 1440px / 1600px container with consistent horizontal padding (`px-4 sm:px-8 lg:px-12`).
- **Hero Architecture:** Cinematic full-width visual banner with ultra-wide 2-line maximum H1 heading and twin pill CTAs.
- **Bento Collections Grid:** 3-column asymmetric layout (Denim & T-Shirts left, Featured Hero Hoodie & Sneakers center, Leather Bags & Outerwear right).
- **Mobile Responsiveness:** Clean vertical collapse below 768px with full touch support and zero horizontal overflow.

## 6. Motion & Interaction
- **GSAP & Spring Physics:** Smooth scroll-reveals, hover parallax, and fluid scale transitions.
- **Interactive Modals:** High-definition video lookbook preview modal, instant search overlay with keyboard navigation (`Cmd+K`), quick-view drawer.
- **State Persistence:** Local storage synchronization for shopping cart, saved wishlist items, active promo codes, and newsletter subscription status.

## 7. Anti-Patterns (Banned)
- No emojis anywhere in UI, code, or labels.
- No `Inter` or standard generic serifs.
- No AI purple or neon glows.
- No cheap meta-labels ("SECTION 01", "QUESTION 05").
- No empty cells or loose gaps in bento grids.
- No broken external image links.
- No copyright strikes: all product imagery, titles, and editorial narratives are original high-end studio assets with copyright-safe fashion photography.
