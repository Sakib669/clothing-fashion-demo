"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Product, CartItem } from "@/types";
import { PRODUCTS, PROMO_CODES } from "@/data/products";

interface ToastState {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface ShopContextType {
  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    size?: string,
    color?: string
  ) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedPromo: string | null;
  promoDiscountPercent: number;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  cartCount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Quick View & Lookbook
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isLookbookOpen: boolean;
  setIsLookbookOpen: (open: boolean) => void;

  // Newsletter
  isNewsletterSubscribed: boolean;
  subscribeNewsletter: (email: string) => boolean;

  // Toasts
  toasts: ToastState[];
  removeToast: (id: string) => void;
  showToast: (message: string, type?: "success" | "info" | "error") => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = "aura_milano_cart_v1";
const WISHLIST_STORAGE_KEY = "aura_milano_wishlist_v1";
const SEARCH_STORAGE_KEY = "aura_milano_recent_searches_v1";
const NEWSLETTER_STORAGE_KEY = "aura_milano_newsletter_v1";
const PROMO_STORAGE_KEY = "aura_milano_promo_v1";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(["milan-01", "milan-07"]); // default with heart highlights matching reference design!
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Loose fit hoodie",
    "Wool scarf",
    "Puffer jacket",
    "Chunky trainers",
  ]);
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);

  // UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Toast Helper
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: "success" | "info" | "error" = "success") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        removeToast(id);
      }, 3500);
    },
    [removeToast]
  );

  // Initial load from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      const savedPromo = localStorage.getItem(PROMO_STORAGE_KEY);
      if (savedPromo && PROMO_CODES[savedPromo.toUpperCase()]) {
        setAppliedPromo(savedPromo.toUpperCase());
      }

      const savedSearches = localStorage.getItem(SEARCH_STORAGE_KEY);
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }

      const savedNewsletter = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
      if (savedNewsletter === "true") {
        setIsNewsletterSubscribed(true);
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Error saving cart:", e);
    }
  }, [cart]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error("Error saving wishlist:", e);
    }
  }, [wishlist]);

  // Save Promo to LocalStorage
  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_STORAGE_KEY, appliedPromo);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Error saving promo:", e);
    }
  }, [appliedPromo]);

  // Save Searches to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        SEARCH_STORAGE_KEY,
        JSON.stringify(recentSearches.slice(0, 8))
      );
    } catch (e) {
      console.error("Error saving searches:", e);
    }
  }, [recentSearches]);

  // Cart operations
  const addToCart = useCallback(
    (
      product: Product,
      quantity = 1,
      size = product.sizes[0] || "M",
      color = product.colors[0]?.name || "Standard"
    ) => {
      setCart((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === size &&
            item.selectedColor === color
        );

        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }

        return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
      });

      showToast(`Added ${product.name} to your bag`);
    },
    [showToast]
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      setCart((prev) => {
        if (quantity <= 0) {
          return prev.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor === color
              )
          );
        }
        return prev.map((item) => {
          if (
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          ) {
            return { ...item, quantity };
          }
          return item;
        });
      });
    },
    []
  );

  const removeFromCart = useCallback(
    (productId: string, size: string, color: string) => {
      setCart((prev) =>
        prev.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor === color
            )
        )
      );
      showToast("Item removed from bag", "info");
    },
    [showToast]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    showToast("Shopping bag cleared", "info");
  }, [showToast]);

  // Wishlist operations
  const toggleWishlist = useCallback(
    (productId: string) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      setWishlist((prev) => {
        const exists = prev.includes(productId);
        if (exists) {
          showToast(`Removed from wishlist`, "info");
          return prev.filter((id) => id !== productId);
        } else {
          showToast(`Saved to wishlist`);
          return [...prev, productId];
        }
      });
    },
    [showToast]
  );

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  // Promo code operations
  const applyPromo = useCallback(
    (code: string): boolean => {
      const clean = code.trim().toUpperCase();
      if (PROMO_CODES[clean]) {
        setAppliedPromo(clean);
        showToast(
          `Promo code ${clean} applied: ${(PROMO_CODES[clean] * 100).toFixed(0)}% OFF!`
        );
        return true;
      } else {
        showToast("Invalid promo code. Try HARFA20 or WINTER87", "error");
        return false;
      }
    },
    [showToast]
  );

  const removePromo = useCallback(() => {
    setAppliedPromo(null);
    showToast("Promo code removed", "info");
  }, [showToast]);

  // Search history
  const addRecentSearch = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => [
      trimmed,
      ...prev.filter((q) => q.toLowerCase() !== trimmed.toLowerCase()),
    ]);
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  // Newsletter
  const subscribeNewsletter = useCallback(
    (email: string): boolean => {
      if (!email || !email.includes("@")) {
        showToast("Please enter a valid email address", "error");
        return false;
      }
      setIsNewsletterSubscribed(true);
      try {
        localStorage.setItem(NEWSLETTER_STORAGE_KEY, "true");
      } catch (e) {
        console.error("Error writing newsletter status:", e);
      }
      showToast("Thank you for subscribing! Your 20% discount code is HARFA20");
      return true;
    },
    [showToast]
  );

  // Computations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const promoDiscountPercent = appliedPromo
    ? PROMO_CODES[appliedPromo] || 0
    : 0;

  const discountAmount = subtotal * promoDiscountPercent;
  const shippingFee = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedPromo,
        promoDiscountPercent,
        applyPromo,
        removePromo,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        cartCount,

        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        isWishlistOpen,
        setIsWishlistOpen,

        isSearchOpen,
        setIsSearchOpen,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,

        quickViewProduct,
        setQuickViewProduct,
        isLookbookOpen,
        setIsLookbookOpen,

        isNewsletterSubscribed,
        subscribeNewsletter,

        toasts,
        removeToast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
