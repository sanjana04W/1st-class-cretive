"use client";

import { useState, useEffect } from "react";
import {
  collectionItems as staticCollectionItems,
  featuredItems as staticFeaturedItems,
  type CollectionItem,
  type CollectionCategory,
} from "@/lib/portfolio-data";
import {
  AdminProduct,
  getAdminProducts,
  saveAdminProducts,
} from "@/lib/admin-store";

// Map category label back to CollectionCategory slug
const LABEL_TO_CAT_MAP: Record<string, CollectionCategory> = {
  "Resin Creations": "resin-creations",
  "Wedding Invitations": "wedding-invitations",
  "Cake Boxes": "cake-boxes",
  "Custom Frames": "custom-frames",
  "Resin Keychains": "keychains",
  "Keychains": "keychains",
  "Gift Boxes": "gift-boxes",
};

/**
 * Transforms an AdminProduct into a public CollectionItem for the website
 */
export function adminProductToCollectionItem(adminProd: AdminProduct): CollectionItem {
  // Find matching static item if available to retain descriptions/tags
  const existing = staticCollectionItems.find((s) => s.id === adminProd.id);

  const category: CollectionCategory =
    LABEL_TO_CAT_MAP[adminProd.brand] ||
    existing?.category ||
    "resin-creations";

  const slug =
    existing?.slug ||
    `${adminProd.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${adminProd.id}`;

  return {
    id: adminProd.id,
    src: adminProd.image,
    alt: `${adminProd.title} by 1st Class Creative`,
    category,
    title: adminProd.title,
    slug,
    price: adminProd.price,
    originalPrice: adminProd.originalPrice,
    featured: adminProd.isFeatured,
    isBestSeller: existing?.isBestSeller ?? adminProd.isFeatured,
    inStock: adminProd.status !== "inactive" && adminProd.stock > 0,
    stock: adminProd.stock,
    tags: existing?.tags || [adminProd.brand, adminProd.type, "Handcrafted"],
    leadTime: existing?.leadTime || "ships in 2-3 days",
    description:
      existing?.description ||
      `${adminProd.title} handcrafted with premium materials by 1st Class Creative craft studio.`,
  };
}

/**
 * Reads all active products from admin store, converted to CollectionItems
 */
export function getLiveCollectionItems(): CollectionItem[] {
  if (typeof window === "undefined") return staticCollectionItems;

  const adminProducts = getAdminProducts();
  if (!adminProducts || adminProducts.length === 0) {
    return staticCollectionItems;
  }

  // Filter out products marked as inactive by admin
  return adminProducts
    .filter((p) => p.status !== "inactive")
    .map(adminProductToCollectionItem);
}

/**
 * Hook to provide real-time reactive products to any storefront page.
 * Reacts immediately to changes in admin panel via localStorage and custom events.
 */
export function useLiveProducts() {
  const [products, setProducts] = useState<CollectionItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        return getLiveCollectionItems();
      } catch {
        return staticCollectionItems;
      }
    }
    return staticCollectionItems;
  });
  const [isLoaded, setIsLoaded] = useState(() => typeof window !== "undefined");

  const syncProducts = () => {
    try {
      const live = getLiveCollectionItems();
      setProducts(live);
      setIsLoaded(true);
    } catch {
      setProducts(staticCollectionItems);
    }
  };

  useEffect(() => {
    syncProducts();

    // Listen to local storage changes across tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key && e.key.includes("admin_panel_products")) {
        syncProducts();
      }
    };

    // Listen to in-app custom event when admin edits or adds a product in the same tab
    const handleCustom = () => syncProducts();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("admin_products_updated", handleCustom);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("admin_products_updated", handleCustom);
    };
  }, []);

  const featured = products.filter((p) => p.featured || p.isBestSeller);

  return {
    products,
    featured,
    isLoaded,
    syncProducts,
  };
}
