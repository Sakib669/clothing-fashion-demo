import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import SearchModal from "@/components/SearchModal";
import QuickViewModal from "@/components/QuickViewModal";
import LookbookModal from "@/components/LookbookModal";
import ToastContainer from "@/components/ToastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MILAN — Winter Collections & Haute Prêt-à-Porter",
  description:
    "Explore the Milan Atelier Winter Collections. Luxury loose-fit hoodies, cashmere beanies, selvedge denim, and architectural outerwear.",
  keywords: [
    "Milan fashion",
    "winter collection",
    "atelier",
    "luxury outerwear",
    "loose fit hoodie",
    "ready to wear",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
        <ShopProvider>
          <Header />
          <div className="grow">{children}</div>
          <Footer />

          {/* Global Drawers & Modals */}
          <CartDrawer />
          <WishlistDrawer />
          <SearchModal />
          <QuickViewModal />
          <LookbookModal />
          <ToastContainer />
        </ShopProvider>
      </body>
    </html>
  );
}
