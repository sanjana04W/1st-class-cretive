"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Star,
  Sliders,
  Boxes,
  Tag,
  BarChart2,
  Clock,
  Users,
  MessageSquare,
  Settings,
  Shield,
  ExternalLink,
  LogOut,
  ChevronRight,
  Truck,
  Quote,
  X,
  Menu,
} from "lucide-react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { cn } from "@/lib/utils";
import {
  AdminRoleType,
  getActiveAdminRole,
  ROLE_PERMISSIONS,
  getAdminOrders,
} from "@/lib/admin-store";

const NAV_ITEMS = [
  {
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/admin/orders",
    icon: ShoppingBag,
    label: "Order Management",
  },
  {
    href: "/admin/products",
    icon: Package,
    label: "Product Catalog",
  },
  {
    href: "/admin/featured",
    icon: Star,
    label: "Featured Products",
  },
  {
    href: "/admin/categories",
    icon: Sliders,
    label: "Master Data",
  },
  {
    href: "/admin/inventory",
    icon: Boxes,
    label: "Stock & Inventory",
  },
  {
    href: "/admin/promotions",
    icon: Tag,
    label: "Promotions & Offers",
  },
  {
    href: "/admin/reports",
    icon: BarChart2,
    label: "Analytics",
  },
  {
    href: "/admin/testimonials",
    icon: Quote,
    label: "Testimonials",
  },
  {
    href: "/admin/delivery",
    icon: Truck,
    label: "Delivery & Shipping",
  },
  {
    href: "/admin/audit-logs",
    icon: Clock,
    label: "Audit Logs",
  },
  {
    href: "/admin/customers",
    icon: Users,
    label: "User Management",
  },
  {
    href: "/admin/inquiries",
    icon: MessageSquare,
    label: "Messages",
  },
  {
    href: "/admin/settings",
    icon: Settings,
    label: "System Settings",
  },
];

interface AdminSidebarProps {
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

function AdminSidebar({ isMobile, onCloseMobile }: AdminSidebarProps) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<AdminRoleType>("Owner");
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);

  useEffect(() => {
    setRole(getActiveAdminRole());
    const handleRoleChanged = (e: any) => {
      setRole(e.detail || getActiveAdminRole());
    };
    window.addEventListener("admin_role_changed", handleRoleChanged);
    return () => window.removeEventListener("admin_role_changed", handleRoleChanged);
  }, []);

  // Sync real-time pending orders count
  useEffect(() => {
    const syncCount = () => {
      try {
        const orders = getAdminOrders();
        const pending = orders.filter((o) => o.status === "PENDING").length;
        setPendingOrdersCount(pending);
      } catch (e) {
        console.warn("Could not sync pending order count:", e);
      }
    };

    syncCount();
    window.addEventListener("admin_orders_updated", syncCount);
    return () => window.removeEventListener("admin_orders_updated", syncCount);
  }, []);

  const handleSignOut = async () => {
    await logout();
    router.push("/admin/login");
  };

  const roleConfig = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS["Owner"];
  const visibleNavItems = NAV_ITEMS.filter((item) => roleConfig.allowedPaths.includes(item.href));

  return (
    <aside className="w-64 bg-white border-r border-[#EFECE6] flex flex-col h-full shrink-0 select-none">
      {/* Brand & Logo Header - Prominently Displayed */}
      <div className="p-4 border-b border-[#EFECE6] bg-white flex items-center justify-between">
        <Link
          href="/admin/dashboard"
          onClick={onCloseMobile}
          className="flex items-center gap-3 group min-w-0"
        >
          <div className="flex items-center justify-center shrink-0">
            <Image
              src="/logo.png"
              alt="1st Class Creative"
              width={140}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>
          <div className="leading-tight min-w-0">
            <h2 className="font-heading font-black text-xs tracking-wider text-brand-charcoal uppercase truncate">
              1st Class
            </h2>
            <h3 className="font-heading font-black text-xs tracking-wider text-brand-charcoal uppercase -mt-0.5 truncate">
              Creative
            </h3>
            <p className="text-[9px] font-bold tracking-wider text-[#9A7A2E] uppercase mt-0.5">
              Operations Panel
            </p>
          </div>
        </Link>
        {isMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Section (Internally scrollable so sidebar stays docked) */}
      <div className="flex-1 px-3 py-4 overflow-y-auto space-y-6">
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <p className="text-[11px] font-bold tracking-wider text-[#A78335] uppercase">
              NAVIGATION
            </p>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#FAF7F0] text-[#9A7A2E] border border-[#E9DFCE] uppercase">
              {role}
            </span>
          </div>
          <nav className="space-y-1">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" && pathname?.startsWith(item.href));

              // Show dynamic badge for Order Management only when there are real pending orders
              const badgeCount =
                item.href === "/admin/orders"
                  ? pendingOrdersCount > 0
                    ? String(pendingOrdersCount)
                    : null
                  : null;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 relative",
                    isActive
                      ? "bg-[#FAF3E0] text-[#8C6D27] border border-[#DEC47F] shadow-2xs font-bold"
                      : "text-gray-600 hover:bg-[#FAF8F5] hover:text-brand-charcoal border border-transparent"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0",
                      isActive ? "text-[#8C6D27]" : "text-gray-400 group-hover:text-gray-600"
                    )}
                  />
                  <span className="flex-1 truncate">{item.label}</span>
                  {badgeCount && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#B88928] text-white text-[10px] font-bold flex items-center justify-center shrink-0 min-w-5">
                      {badgeCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer matching Active Role */}
      <div className="p-3 border-t border-[#EFECE6] space-y-2 bg-[#FAF9F5]">
        {/* Role access badge */}
        <div
          className={cn(
            "flex items-center justify-center gap-2 px-3 py-2 rounded-xl border text-[11px] font-bold uppercase tracking-wider shadow-2xs",
            role === "Owner"
              ? "bg-white border-[#E9DFCE] text-brand-charcoal"
              : role === "Manager"
              ? "bg-[#FAF7F0] border-[#DEC47F] text-[#8C6D27]"
              : "bg-blue-50/50 border-blue-200 text-blue-700"
          )}
        >
          <Shield className="w-3.5 h-3.5 text-brand-gold-dark" />
          <span className="truncate">{role === "Owner" ? "FULL OWNER ACCESS" : `${role.toUpperCase()} ACCESS`}</span>
        </div>

        {/* Visit online store */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#EFECE6] text-xs font-semibold text-gray-700 hover:text-brand-charcoal hover:bg-gray-50 transition-colors shadow-2xs"
        >
          <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
          <span>Visit Online Store</span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl bg-rose-50 border border-rose-100 text-xs font-bold text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<AdminRoleType>("Owner");

  useEffect(() => {
    setRole(getActiveAdminRole());
    const handleRoleChanged = (e: any) => {
      setRole(e.detail || getActiveAdminRole());
    };
    window.addEventListener("admin_role_changed", handleRoleChanged);
    return () => window.removeEventListener("admin_role_changed", handleRoleChanged);
  }, []);

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.replace("/admin/login");
      return;
    }

    // Role-based route guard
    if (pathname && pathname !== "/admin/login" && pathname !== "/admin/dashboard") {
      const roleConfig = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS["Owner"];
      const isAllowed = roleConfig.allowedPaths.some(
        (p) => pathname === p || pathname.startsWith(p + "/")
      );
      if (!isAllowed) {
        router.replace("/admin/dashboard");
      }
    }
  }, [user, loading, pathname, router, role]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF9F5]">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-8 h-8 text-[#9A7A2E]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
          </svg>
          <p className="text-gray-500 text-xs font-semibold">Loading Control Panel…</p>
        </div>
      </div>
    );
  }

  if (!user && pathname !== "/admin/login") return null;

  // Render role restricted message if accessing forbidden route
  if (pathname && pathname !== "/admin/login") {
    const roleConfig = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS["Owner"];
    const isAllowed = roleConfig.allowedPaths.some(
      (p) => pathname === p || pathname.startsWith(p + "/")
    );
    if (!isAllowed) {
      return (
        <div className="p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto shadow-2xs">
            <Shield className="w-7 h-7 text-[#9A7A2E]" />
          </div>
          <h2 className="font-heading font-serif text-2xl font-bold text-brand-charcoal">
            Restricted Section
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Your current role (<strong className="text-brand-charcoal">{role}</strong>) does not have access permissions for this section. Full administrative access is reserved for the <strong>Owner</strong>.
          </p>
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="px-5 py-2 rounded-xl bg-[#9A7A2E] text-white text-xs font-bold hover:bg-[#856722] transition-colors shadow-2xs"
          >
            Return to Dashboard
          </button>
        </div>
      );
    }
  }

  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Derive topbar title from path
  const getPageTitle = () => {
    if (pathname.includes("/orders")) return "Order Management";
    if (pathname.includes("/products")) return "Product Catalog";
    if (pathname.includes("/featured")) return "Featured Products";
    if (pathname.includes("/categories")) return "Master Data";
    if (pathname.includes("/inventory")) return "Inventory Management";
    if (pathname.includes("/promotions")) return "Promotions & Offers";
    if (pathname.includes("/reports")) return "Analytics";
    if (pathname.includes("/testimonials")) return "Testimonials";
    if (pathname.includes("/delivery")) return "Delivery & Shipping";
    if (pathname.includes("/audit-logs")) return "Audit Logs";
    if (pathname.includes("/customers") || pathname.includes("/users")) return "User Management";
    if (pathname.includes("/inquiries") || pathname.includes("/messages")) return "Messages";
    if (pathname.includes("/settings")) return "System Settings";
    return "Dashboard";
  };

  return (
    <AuthProvider>
      <AdminGuard>
        {isLoginPage ? (
          <>{children}</>
        ) : (
          <div className="flex h-screen overflow-hidden bg-[#FBF9F5] text-brand-charcoal font-body antialiased">
            {/* Desktop Fixed Left Navigation (never scrolls with page content) */}
            <div className="hidden md:flex h-screen shrink-0">
              <AdminSidebar />
            </div>

            {/* Mobile Drawer Off-Canvas Sidebar */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-50 md:hidden flex">
                {/* Dark Backdrop */}
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
                  onClick={() => setMobileMenuOpen(false)}
                />
                {/* Sliding Navigation Drawer */}
                <div className="relative z-50 w-72 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col animate-fade-in">
                  <AdminSidebar isMobile onCloseMobile={() => setMobileMenuOpen(false)} />
                </div>
              </div>
            )}

            {/* Main Content Area (Scrolls independently) */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
              <AdminTopbar
                title={getPageTitle()}
                onOpenMobileMenu={() => setMobileMenuOpen(true)}
              />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        )}
      </AdminGuard>
    </AuthProvider>
  );
}
