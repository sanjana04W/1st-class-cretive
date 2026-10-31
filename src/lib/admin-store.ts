import { collectionItems } from "@/lib/portfolio-data";

export interface AdminProduct {
  id: string;
  title: string;
  brand: string;
  type: string;
  volume: string;
  sku: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: "active" | "inactive" | "out_of_stock";
  isFeatured: boolean;
  image: string;
}

export interface AdminOrder {
  id: string;
  orderRef: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  district: string;
  itemsCount: number;
  itemsDescription?: string;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "DISPATCHED" | "COMPLETED" | "CANCELLED";
  isVerified: boolean;
}

export interface AdminNotification {
  id: string;
  orderRef: string;
  date: string;
  customerName: string;
  amount: number;
  itemsCount: number;
  district: string;
  read: boolean;
}

export const CATEGORY_LABELS: Record<string, string> = {
  "resin-creations": "Resin Creations",
  "wedding-invitations": "Wedding Invitations",
  "cake-boxes": "Cake Boxes",
  "custom-frames": "Custom Frames",
  "keychains": "Resin Keychains",
  "gift-boxes": "Gift Boxes",
};

export const CATEGORY_TYPES: Record<string, string> = {
  "resin-creations": "Epoxy Art",
  "wedding-invitations": "Card Suite",
  "cake-boxes": "Cake Box",
  "custom-frames": "Memory Frame",
  "keychains": "Keychain",
  "gift-boxes": "Gift Box",
};

export const CATEGORY_PREFIXES: Record<string, string> = {
  "resin-creations": "RC",
  "wedding-invitations": "WI",
  "cake-boxes": "CB",
  "custom-frames": "CF",
  "keychains": "KC",
  "gift-boxes": "GB",
};

// Map all 89 website products from collectionItems
export const INITIAL_ADMIN_PRODUCTS: AdminProduct[] = collectionItems.map((item, idx) => {
  const cat = item.category || "resin-creations";
  const brand = CATEGORY_LABELS[cat] || "1st Class Creative";
  const type = CATEGORY_TYPES[cat] || "Handcrafted";
  const prefix = CATEGORY_PREFIXES[cat] || "FCC";
  const numStr = String(idx + 1).padStart(3, "0");
  const sku = `FCC-${prefix}-${numStr}`;

  // Deterministic realistic stock levels
  let stock = 12 + ((idx * 7) % 25);
  if (idx === 2) stock = 4; // Artisanal Wedding Cake Box #3
  if (idx === 3) stock = 3; // Personalized Memory Frame #4
  if (idx === 4) stock = 5; // Custom Alphabet Resin Keychain #5
  if (idx === 5) stock = 3; // Curated Keepsake Gift Box #6
  if (idx === 10) stock = 4;

  return {
    id: item.id,
    title: item.title,
    brand,
    type,
    volume: "Bespoke Custom",
    sku,
    price: item.price,
    originalPrice: item.originalPrice,
    stock,
    status: (item.inStock !== false ? "active" : "inactive") as "active" | "inactive",
    isFeatured: Boolean(item.featured || item.isBestSeller),
    image: item.src,
  };
});

export const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: "ord-1",
    orderRef: "LF-20261016-8622",
    date: "16 Oct 2026, 13:02",
    customerName: "wenuri",
    customerPhone: "0701442569",
    customerEmail: "wenuris2004@gmail.com",
    district: "Colombo",
    itemsCount: 2,
    itemsDescription: "Artisanal Wedding Cake Box #3 (x1), Personalized Memory Frame #4 (x1)",
    totalAmount: 16700,
    status: "PENDING",
    isVerified: true,
  },
  {
    id: "ord-2",
    orderRef: "LIL-2025-001",
    date: "16 Oct 2026, 10:58",
    customerName: "Anushka Senanayake",
    customerPhone: "0771234567",
    customerEmail: "anushka@example.lk",
    district: "Colombo",
    itemsCount: 1,
    itemsDescription: "Handcrafted Resin Creation #1 (x1)",
    totalAmount: 6150,
    status: "PENDING",
    isVerified: true,
  },
  {
    id: "ord-3",
    orderRef: "LIL-2025-002",
    date: "16 Oct 2026, 04:58",
    customerName: "Rohan De Silva",
    customerPhone: "0719876543",
    customerEmail: "rohan@example.lk",
    district: "Gampaha",
    itemsCount: 1,
    itemsDescription: "Custom Alphabet Resin Keychain #5 (x2)",
    totalAmount: 7600,
    status: "COMPLETED",
    isVerified: true,
  },
  {
    id: "ord-4",
    orderRef: "LIL-2025-003",
    date: "15 Oct 2026, 17:58",
    customerName: "Dilini Jayawardena",
    customerPhone: "0765432109",
    customerEmail: "dilini@example.lk",
    district: "Kandy",
    itemsCount: 1,
    itemsDescription: "Bespoke Wedding Invitation #2 (x50)",
    totalAmount: 8950,
    status: "COMPLETED",
    isVerified: true,
  },
];

export const INITIAL_STOCK_ALERTS = [
  {
    id: "stk-1",
    name: "Artisanal Wedding Cake Box #3",
    subtitle: "Cake Box • SKU: FCC-CB-003",
    left: 4,
    sku: "FCC-CB-003",
    size: "Standard Custom",
    stock: 4,
  },
  {
    id: "stk-2",
    name: "Personalized Memory Frame #4",
    subtitle: "Memory Frame • SKU: FCC-CF-004",
    left: 3,
    sku: "FCC-CF-004",
    size: "LED Display",
    stock: 3,
  },
  {
    id: "stk-3",
    name: "Custom Alphabet Resin Keychain #5",
    subtitle: "Keychain • SKU: FCC-KC-005",
    left: 5,
    sku: "FCC-KC-005",
    size: "Initial Letter",
    stock: 5,
  },
  {
    id: "stk-4",
    name: "Curated Keepsake Gift Box #6",
    subtitle: "Gift Box • SKU: FCC-GB-006",
    left: 3,
    sku: "FCC-GB-006",
    size: "Luxury Hamper",
    stock: 3,
  },
  {
    id: "stk-5",
    name: "Handcrafted Floral Resin Coaster Set",
    subtitle: "Resin Art • SKU: FCC-RC-011",
    left: 4,
    sku: "FCC-RC-011",
    size: "Set of 4",
    stock: 4,
  },
];

export const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "notif-1",
    orderRef: "LF-20261016-8622",
    date: "16 Oct, 13:02",
    customerName: "wenuri",
    amount: 16700,
    itemsCount: 2,
    district: "Colombo",
    read: false,
  },
  {
    id: "notif-2",
    orderRef: "LIL-2025-001",
    date: "16 Oct, 10:58",
    customerName: "Anushka Senanayake",
    amount: 6150,
    itemsCount: 1,
    district: "Colombo",
    read: false,
  },
];

const STORAGE_KEYS = {
  ORDERS: "admin_panel_orders_v3",
  PRODUCTS: "admin_panel_products_v3",
  NOTIFS: "admin_panel_notifications_v3",
  STOCK: "admin_panel_stock_v3",
};

export function getAdminOrders(): AdminOrder[] {
  if (typeof window === "undefined") return INITIAL_ADMIN_ORDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ADMIN_ORDERS));
      return INITIAL_ADMIN_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ADMIN_ORDERS;
  } catch {
    return INITIAL_ADMIN_ORDERS;
  }
}

export function mapAdminStatusToCustomer(
  adminStatus: AdminOrder["status"]
): "Pending" | "Confirmed" | "Processing" | "Dispatched" | "Delivered" | "Cancelled" {
  switch (adminStatus) {
    case "PENDING":
      return "Pending";
    case "CONFIRMED":
      return "Confirmed";
    case "PROCESSING":
      return "Processing";
    case "DISPATCHED":
      return "Dispatched";
    case "COMPLETED":
      return "Delivered";
    case "CANCELLED":
      return "Cancelled";
    default:
      return "Pending";
  }
}

export function mapCustomerStatusToAdmin(custStatus: string): AdminOrder["status"] {
  const upper = (custStatus || "").toUpperCase().trim();
  if (upper === "DELIVERED") return "COMPLETED";
  if (["PENDING", "CONFIRMED", "PROCESSING", "DISPATCHED", "COMPLETED", "CANCELLED"].includes(upper)) {
    return upper as AdminOrder["status"];
  }
  return "PENDING";
}

export function saveAdminOrders(orders: AdminOrder[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

  // 1. Sync to fcc_all_orders so website order registries stay aligned
  try {
    const rawAll = localStorage.getItem("fcc_all_orders");
    if (rawAll) {
      const allOrders = JSON.parse(rawAll);
      if (Array.isArray(allOrders)) {
        const orderStatusMap = new Map(
          orders.map((o) => [o.orderRef.toLowerCase().trim(), mapAdminStatusToCustomer(o.status)])
        );
        const updatedAll = allOrders.map((ao: any) => {
          const ref = (ao.orderNumber || ao.id || "").toLowerCase().trim();
          if (orderStatusMap.has(ref)) {
            return { ...ao, status: orderStatusMap.get(ref) };
          }
          return ao;
        });
        localStorage.setItem("fcc_all_orders", JSON.stringify(updatedAll));
      }
    }
  } catch (err) {
    console.warn("Could not sync to fcc_all_orders:", err);
  }

  // 2. Sync to fcc_users_db so customer profile orders update immediately
  try {
    const rawUsers = localStorage.getItem("fcc_users_db");
    if (rawUsers) {
      const usersDB = JSON.parse(rawUsers);
      const orderStatusMap = new Map(
        orders.map((o) => [o.orderRef.toLowerCase().trim(), mapAdminStatusToCustomer(o.status)])
      );
      let modified = false;

      for (const email of Object.keys(usersDB)) {
        const u = usersDB[email];
        if (u && Array.isArray(u.orders)) {
          u.orders = u.orders.map((uo: any) => {
            const ref = (uo.orderNumber || uo.id || "").toLowerCase().trim();
            if (orderStatusMap.has(ref)) {
              modified = true;
              return { ...uo, status: orderStatusMap.get(ref) };
            }
            return uo;
          });
        }
      }

      if (modified) {
        localStorage.setItem("fcc_users_db", JSON.stringify(usersDB));
      }
    }
  } catch (err) {
    console.warn("Could not sync to fcc_users_db:", err);
  }

  try {
    window.dispatchEvent(new CustomEvent("admin_orders_updated", { detail: orders }));
  } catch {}
}

export function markOrderNotificationRead(orderRef: string) {
  if (typeof window === "undefined") return;
  try {
    const notifs = getAdminNotifications();
    const updated = notifs.map(n => n.orderRef === orderRef ? { ...n, read: true } : n);
    saveAdminNotifications(updated);
    window.dispatchEvent(new CustomEvent("admin_notifications_updated", { detail: updated }));
  } catch {}
}

export function registerNewAdminOrder(order: {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  district: string;
  itemsCount: number;
  itemsDescription?: string;
  totalAmount: number;
}) {
  if (typeof window === "undefined") return;
  try {
    const newOrder: AdminOrder = {
      id: `ord-${Date.now()}`,
      orderRef: order.orderNumber,
      date: "Just now",
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerEmail: order.customerEmail,
      district: order.district,
      itemsCount: order.itemsCount,
      itemsDescription: order.itemsDescription,
      totalAmount: order.totalAmount,
      status: "PENDING",
      isVerified: true,
    };

    const orders = getAdminOrders();
    const updatedOrders = [newOrder, ...orders.filter((o) => o.orderRef !== newOrder.orderRef)];
    saveAdminOrders(updatedOrders);

    const newNotif: AdminNotification = {
      id: `notif-${Date.now()}`,
      orderRef: order.orderNumber,
      date: "Just now",
      customerName: order.customerName,
      amount: order.totalAmount,
      itemsCount: order.itemsCount,
      district: order.district,
      read: false,
    };
    const notifs = getAdminNotifications();
    const updatedNotifs = [newNotif, ...notifs.filter((n) => n.orderRef !== newNotif.orderRef)];
    saveAdminNotifications(updatedNotifs);

    window.dispatchEvent(new CustomEvent("admin_orders_updated", { detail: updatedOrders }));
    window.dispatchEvent(new CustomEvent("admin_notifications_updated", { detail: updatedNotifs }));
  } catch (err) {
    console.warn("Could not register new admin order:", err);
  }
}

export function getAdminProducts(): AdminProduct[] {
  if (typeof window === "undefined") return INITIAL_ADMIN_PRODUCTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_ADMIN_PRODUCTS));
      return INITIAL_ADMIN_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    // If it contains the old 8 dummy perfume items, automatically migrate to the full 89 website products
    if (!Array.isArray(parsed) || parsed.length < 20 || parsed[0]?.title?.includes("Club de Nuit")) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_ADMIN_PRODUCTS));
      return INITIAL_ADMIN_PRODUCTS;
    }
    return parsed;
  } catch {
    return INITIAL_ADMIN_PRODUCTS;
  }
}

export function saveAdminProducts(products: AdminProduct[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  try {
    window.dispatchEvent(new CustomEvent("admin_products_updated", { detail: products }));
  } catch {}
}

export function getAdminNotifications(): AdminNotification[] {
  if (typeof window === "undefined") return INITIAL_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return INITIAL_NOTIFICATIONS;
  }
}

export function saveAdminNotifications(notifs: AdminNotification[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(notifs));
  try {
    window.dispatchEvent(new CustomEvent("admin_notifications_updated", { detail: notifs }));
  } catch {}
}

// ─── Role-Based Access Control (RBAC) ───────────────────────────────────────

export type AdminRoleType = "Owner" | "Manager" | "Order Staff";

export interface RolePermissions {
  role: AdminRoleType;
  badgeLabel: string;
  allowedPaths: string[];
  canEditSettings: boolean;
  canManageUsers: boolean;
  canViewAuditLogs: boolean;
  canViewAnalytics: boolean;
  canManageStock: boolean;
  canManageOrders: boolean;
  canManageProducts: boolean;
  canManagePromotions: boolean;
}

export const ROLE_PERMISSIONS: Record<AdminRoleType, RolePermissions> = {
  Owner: {
    role: "Owner",
    badgeLabel: "OWNER (SUPER ADMIN)",
    allowedPaths: [
      "/admin/dashboard",
      "/admin/orders",
      "/admin/products",
      "/admin/featured",
      "/admin/categories",
      "/admin/inventory",
      "/admin/promotions",
      "/admin/reports",
      "/admin/testimonials",
      "/admin/delivery",
      "/admin/audit-logs",
      "/admin/customers",
      "/admin/inquiries",
      "/admin/settings",
    ],
    canEditSettings: true,
    canManageUsers: true,
    canViewAuditLogs: true,
    canViewAnalytics: true,
    canManageStock: true,
    canManageOrders: true,
    canManageProducts: true,
    canManagePromotions: true,
  },
  Manager: {
    role: "Manager",
    badgeLabel: "OPERATIONS MANAGER",
    allowedPaths: [
      "/admin/dashboard",
      "/admin/orders",
      "/admin/products",
      "/admin/featured",
      "/admin/categories",
      "/admin/inventory",
      "/admin/promotions",
      "/admin/reports",
      "/admin/testimonials",
      "/admin/delivery",
      "/admin/inquiries",
    ],
    canEditSettings: false,
    canManageUsers: false,
    canViewAuditLogs: false,
    canViewAnalytics: true,
    canManageStock: true,
    canManageOrders: true,
    canManageProducts: true,
    canManagePromotions: true,
  },
  "Order Staff": {
    role: "Order Staff",
    badgeLabel: "ORDER FULFILLMENT STAFF",
    allowedPaths: [
      "/admin/dashboard",
      "/admin/orders",
      "/admin/inventory",
      "/admin/inquiries",
    ],
    canEditSettings: false,
    canManageUsers: false,
    canViewAuditLogs: false,
    canViewAnalytics: false,
    canManageStock: true,
    canManageOrders: true,
    canManageProducts: false,
    canManagePromotions: false,
  },
};

const STORAGE_KEY_ROLE = "admin_active_test_role";

export function getActiveAdminRole(): AdminRoleType {
  if (typeof window === "undefined") return "Owner";
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ROLE) as AdminRoleType;
    if (saved && (saved === "Owner" || saved === "Manager" || saved === "Order Staff")) {
      return saved;
    }
    return "Owner";
  } catch {
    return "Owner";
  }
}

export function setActiveAdminRole(role: AdminRoleType) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_ROLE, role);
  try {
    window.dispatchEvent(new CustomEvent("admin_role_changed", { detail: role }));
  } catch {}
}

// ─── Master Data / Categories ────────────────────────────────────────────────
export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  order: number;
  parentId?: string | null;
  img?: string;
  description?: string;
  itemCount?: number;
}

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: "cat-1", name: "Resin Creations", slug: "resin-creations", order: 1, parentId: null, img: "/485184284_1103127648493148_4472142601649408182_n.jpg", description: "Coasters, ocean wave wall decor, floral resin slabs, customized trays", itemCount: 18 },
  { id: "cat-1-1", name: "Resin Coasters & Trays", slug: "resin-coasters-trays", order: 1, parentId: "cat-1", img: "/485184284_1103127648493148_4472142601649408182_n.jpg", description: "Ocean geode coasters, gold foil rim trays, floral drink coasters", itemCount: 8 },
  { id: "cat-1-2", name: "Resin Alphabet Keychains", slug: "resin-keychains", order: 2, parentId: "cat-1", img: "/542752181_1238639424941969_1583669488507158905_n.jpg", description: "Personalized alphabet letters, glitter pendants, hearts & custom names", itemCount: 26 },
  { id: "cat-1-3", name: "Resin Wall Art & Clocks", slug: "resin-wall-art-clocks", order: 3, parentId: "cat-1", img: "/529179520_1214465350692710_3362134301413191237_n.jpg", description: "Hand-poured resin wall clocks, ocean waves and geode canvas panels", itemCount: 6 },
  { id: "cat-1-4", name: "Resin Bookmarks & Charms", slug: "resin-bookmarks-charms", order: 4, parentId: "cat-1", img: "/626581418_1362772269195350_2007381266795301988_n.jpg", description: "Pressed flower bookmarks, tassel tags and pocket charms", itemCount: 7 },
  { id: "cat-2", name: "Wedding Stationery", slug: "wedding-stationery", order: 2, parentId: null, img: "/468396156_2478270609044241_1138043242894587302_n.jpg", description: "Custom romantic suites, envelopes, wax seals, floral stationery", itemCount: 14 },
  { id: "cat-2-1", name: "Wedding Invitations & Cards", slug: "wedding-invitations", order: 1, parentId: "cat-2", img: "/468396156_2478270609044241_1138043242894587302_n.jpg", description: "Luxury foil-pressed, laser-cut and calligraphy wedding invitations", itemCount: 14 },
  { id: "cat-2-2", name: "Wedding Cake Boxes", slug: "cake-boxes", order: 2, parentId: "cat-2", img: "/484074106_1098277412311505_6713907112004454121_n.jpg", description: "Embossed gold rose boxes, satin ribbons, wedding cake packaging", itemCount: 16 },
  { id: "cat-2-3", name: "Ring Dishes & Keepsakes", slug: "ring-dishes-keepsakes", order: 3, parentId: "cat-2", img: "/485184284_1103127648493148_4472142601649408182_n.jpg", description: "Personalized resin wedding ring platters and ceramic dishes", itemCount: 5 },
  { id: "cat-3", name: "Custom Frames", slug: "custom-frames", order: 3, parentId: null, img: "/529179520_1214465350692710_3362134301413191237_n.jpg", description: "Anniversary LED shadow boxes, memory frames with resin lettering", itemCount: 12 },
  { id: "cat-3-1", name: "Anniversary & Couple Frames", slug: "anniversary-couple-frames", order: 1, parentId: "cat-3", img: "/529179520_1214465350692710_3362134301413191237_n.jpg", description: "Custom date & photo frames, LED warm backlight memory displays", itemCount: 8 },
  { id: "cat-3-2", name: "Graduation & Birthday Frames", slug: "graduation-birthday-frames", order: 2, parentId: "cat-3", img: "/557802403_1265990468873531_7381377988699630798_n.jpg", description: "Milestone photo collage frames with handmade paper flowers", itemCount: 4 },
  { id: "cat-4", name: "Gift Boxes & Hampers", slug: "gifts", order: 4, parentId: null, img: "/logo.png", description: "Curated gift hampers for bridesmaids, groomsmen, and special milestones", itemCount: 9 },
  { id: "cat-4-1", name: "Bridesmaid & Bridal Hampers", slug: "bridal-hampers", order: 1, parentId: "cat-4", img: "/logo.png", description: "Custom luxury keepsake gift boxes with personalized robe tags", itemCount: 5 },
  { id: "cat-4-2", name: "Corporate & Event Favors", slug: "corporate-event-favors", order: 2, parentId: "cat-4", img: "/logo.png", description: "Bulk branded favor boxes and resin keepsake tokens", itemCount: 4 },
];

const STORAGE_KEY_CATEGORIES = "admin_categories";

export function getAdminCategories(): CategoryItem[] {
  if (typeof window === "undefined") return INITIAL_CATEGORIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (!raw) return INITIAL_CATEGORIES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CATEGORIES;
  } catch {
    return INITIAL_CATEGORIES;
  }
}

export function saveAdminCategories(cats: CategoryItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(cats));
  try {
    window.dispatchEvent(new CustomEvent("admin_categories_updated", { detail: cats }));
  } catch {}
}

// ─── Delivery & Courier Rates ───────────────────────────────────────────────
export interface DeliverySettings {
  codEnabled: boolean;
  bankTransferEnabled: boolean;
  colomboFee: number;
  outstationFee: number;
  freeShippingThreshold: number;
  courierPartner: string;
  processingDays: string;
}

export const DEFAULT_DELIVERY_SETTINGS: DeliverySettings = {
  codEnabled: true,
  bankTransferEnabled: true,
  colomboFee: 350,
  outstationFee: 450,
  freeShippingThreshold: 15000,
  courierPartner: "Pronto / Domex / PromptX",
  processingDays: "2–3",
};

const STORAGE_KEY_DELIVERY = "admin_delivery_settings";

export function getDeliverySettings(): DeliverySettings {
  if (typeof window === "undefined") return DEFAULT_DELIVERY_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DELIVERY);
    if (!raw) return DEFAULT_DELIVERY_SETTINGS;
    return { ...DEFAULT_DELIVERY_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_DELIVERY_SETTINGS;
  }
}

export function saveDeliverySettings(settings: DeliverySettings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_DELIVERY, JSON.stringify(settings));
  try {
    window.dispatchEvent(new CustomEvent("admin_delivery_updated", { detail: settings }));
  } catch {}
}

// ─── Promotions & Offers ────────────────────────────────────────────────────
export interface PromoCode {
  id: string;
  code: string;
  discountType: "percentage" | "fixed" | "shipping";
  discountValue: number;
  minOrder: number;
  description: string;
  isActive: boolean;
  usageCount: number;
}

export const DEFAULT_PROMOS: PromoCode[] = [
  {
    id: "promo-1",
    code: "CREATIVE10",
    discountType: "percentage",
    discountValue: 10,
    minOrder: 5000,
    description: "10% OFF on orders above LKR 5,000",
    isActive: true,
    usageCount: 14,
  },
  {
    id: "promo-2",
    code: "1STCLASS500",
    discountType: "fixed",
    discountValue: 500,
    minOrder: 10000,
    description: "LKR 500 OFF on orders above LKR 10,000",
    isActive: true,
    usageCount: 7,
  },
  {
    id: "promo-3",
    code: "FREESHIP",
    discountType: "shipping",
    discountValue: 0,
    minOrder: 15000,
    description: "Free Shipping on orders above LKR 15,000",
    isActive: false,
    usageCount: 3,
  },
  {
    id: "promo-4",
    code: "BESPOKE20",
    discountType: "percentage",
    discountValue: 20,
    minOrder: 8000,
    description: "20% OFF bespoke handcraft orders above LKR 8,000",
    isActive: true,
    usageCount: 5,
  },
];

const STORAGE_KEY_PROMOS = "admin_promo_codes";

export function loadPromos(): PromoCode[] {
  if (typeof window === "undefined") return DEFAULT_PROMOS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROMOS);
    return raw ? JSON.parse(raw) : DEFAULT_PROMOS;
  } catch {
    return DEFAULT_PROMOS;
  }
}

export function savePromos(promos: PromoCode[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_PROMOS, JSON.stringify(promos));
  try {
    window.dispatchEvent(new CustomEvent("admin_promotions_updated", { detail: promos }));
  } catch {}
}
