export type ProductCategory = "men" | "women" | "kids" | "accessories" | "gifts";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subCategory: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages: string[];
  description: string;
  details: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  inStock: boolean;
  isNewArrival?: boolean;
  featured?: boolean;
  discountPercent?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface PromoCode {
  code: string;
  discountPercentage: number;
  description: string;
}
