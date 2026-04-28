export interface Product {
  id: number | string;
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category?: string;
  subcategory?: string;
  image?: string;
  images?: string[];
  description?: string;
  stock?: number;
  tags?: string[];
  ingredients?: string[];
  suitableSkinTypes?: string[];
  certification?: string[];
  verified?: boolean;
  salesCount?: number;
  sales?: number;
  specs?: { name: string; options: string[] }[];
  isCertified?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  suitableSkin?: { oily: number; dry: number; combo: number; sensitive: number; acne: number };
  certificationInfo?: {
    origin: string;
    authDate: string;
    score: number;
    quality: number;
    value: number;
    service: number;
    checkItems: string[];
  };
  merchant?: {
    id: string;
    name: string;
    isVerified: boolean;
    followers?: number;
    products?: number;
  };
  effects?: string[];
  howToUse?: string[];
  targetAudience?: string[];
  highlights?: { title: string; desc: string; icon: string }[];
  specifications?: { name: string; value: string }[];
  scenes?: string[];
}

export interface ProductDetail extends Omit<Product, 'reviews'> {
  reviewsCount: number;
  details: {
    effect: string;
    howToUse: string;
    precautions: string;
  };
  variants?: {
    color?: string;
    size?: string;
    stock: number;
  }[];
  reviewList: Review[];
  relatedProducts: Product[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  productCount: number;
  description?: string;
}

export interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
}

export interface Review {
  id: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  content: string;
  images?: string[];
  date: string;
  skinType?: string;
  helpful?: number;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  skinType?: string;
  preferences?: string[];
  createdAt?: string;
}

export interface UserProfile extends User {
  favorites: number[];
  orders: Order[];
  reviews: Review[];
  points: number;
  level: number;
}

export interface Order {
  id: string;
  products: { productId: number; quantity: number }[];
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
}

export interface CartItem {
  productId: number | string;
  quantity: number;
  variant?: string;
}