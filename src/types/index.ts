import { Timestamp } from "firebase/firestore";

// ─── Product / Portfolio ───────────────────────────────────────────────────

export type ProductCategory =
  | "resin-creations"
  | "wedding-invitations"
  | "cake-boxes"
  | "gift-boxes"
  | "custom-frames"
  | "keychains"
  | "all";

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  images: string[];         // URLs (local /public or Firebase Storage)
  price?: number;           // LKR – optional (quote-based items omit this)
  priceLabel?: string;      // e.g. "Starting from LKR 1,500"
  featured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  inStock: boolean;
  tags: string[];
  altText: string;
  status: "active" | "draft" | "archived";
  displayOrder: number;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

// ─── Inquiry / Lead ────────────────────────────────────────────────────────

export type InquiryStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "booked"
  | "completed"
  | "closed";

export type InquiryType =
  | "resin-creation"
  | "wedding-invitation"
  | "cake-box"
  | "custom-order"
  | "general";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  message: string;
  source: string;           // e.g. "website", "facebook", "instagram"
  status: InquiryStatus;
  assignedTo?: string;
  followUpDate?: Timestamp | Date;
  notes?: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

// ─── Promotion / Offer ─────────────────────────────────────────────────────

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  applicableProducts: string[];   // product IDs, empty = site-wide
  isActive: boolean;
  bannerImage?: string;
  startDate: Timestamp | Date;
  endDate: Timestamp | Date;
  createdAt: Timestamp | Date;
}

// ─── Admin User ───────────────────────────────────────────────────────────

export type AdminRole = "owner" | "staff";

export interface AdminUser {
  uid: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: Timestamp | Date;
}

// ─── Testimonial ──────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  rating: number;           // 1-5
  text: string;
  productCategory?: ProductCategory;
  isVisible: boolean;
  createdAt: Timestamp | Date;
}

// ─── Contact Form ─────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  message: string;
}
