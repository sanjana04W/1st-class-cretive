"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Sparkles,
  Database,
  Package,
  Layers,
  Boxes,
  UserCheck,
  Truck,
  FileText,
  Star,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  ClipboardList,
} from "lucide-react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { adminSignOut } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard" },
  { href: "/admin/orders", icon: <ClipboardList className="w-4 h-4" />, label: "Orders", badge: "NEW" },
  { href: "/admin/inquiries", icon: <ShoppingBag className="w-4 h-4" />, label: "Inquiries" },
  { href: "/admin/customers", icon: <UserCheck className="w-4 h-4" />, label: "Customers" },
  { href: "/admin/portfolio", icon: <Sparkles className="w-4 h-4" />, label: "Collection Gallery", badge: "89" },
  { href: "/admin/products", icon: <Package className="w-4 h-4" />, label: "Products Catalog" },
  { href: "/admin/categories", icon: <Layers className="w-4 h-4" />, label: "Categories" },
  { href: "/admin/inventory", icon: <Boxes className="w-4 h-4" />, label: "Inventory" },
  { href: "/admin/promotions", icon: <Database className="w-4 h-4" />, label: "Promotions & Offers" },
  { href: "/admin/delivery", icon: <Truck className="w-4 h-4" />, label: "Delivery & COD" },
  { href: "/admin/testimonials", icon: <Star className="w-4 h-4" />, label: "Reviews & Feedback" },
  { href: "/admin/reports", icon: <BarChart3 className="w-4 h-4" />, label: "Reports & Analytics" },
  { href: "/admin/settings", icon: <Settings className="w-4 h-4" />, label: "Settings" },
];

function AdminSidebar() {
  const { adminUser, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#FAFAF8] border-r border-[#EFECE6] min-h-screen">
      {/* Logo & Header */}
      <div className="p-4 border-b border-[#EFECE6] flex items-center justify-between bg-white">
        <Link href="/" target="_blank" className="flex items-center gap-2 group">
          <div className="p-1 rounded-lg bg-brand-charcoal flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="1st Class Creative"
              width={90}
              height={32}
              className="h-8 w-auto object-contain brightness-150"
            />
          </div>
          <div className="leading-tight">
            <span className="block font-heading font-bold text-xs text-brand-charcoal group-hover:text-brand-gold transition-colors">
              1st Class Creative
            </span>
            <span className="text-[10px] text-gray-400">Craft Studio</span>
          </div>
        </Link>
        <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold-dark">
          Admin
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, icon, label, badge }) => {
          const isActive = pathname === href || (href !== "/admin/dashboard" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150",
                isActive
                  ? "bg-[#F5EEDC] text-[#9A7A2E] font-bold shadow-xs"
                  : "text-gray-600 hover:bg-[#F2EFE9] hover:text-brand-charcoal"
              )}
            >
              <span className={cn(isActive ? "text-[#9A7A2E]" : "text-gray-500")}>{icon}</span>
              <span className="flex-1 truncate">{label}</span>
              {badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {badge}
                </span>
              )}
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#9A7A2E]" />}
            </Link>
          );
        })}
      </nav>

      {/* User profile & Logout */}
      <div className="p-4 border-t border-[#EFECE6] bg-[#F7F5F0]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-brand-gold text-white font-bold flex items-center justify-center text-xs">
            {adminUser?.name?.[0] ?? "1"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-brand-charcoal truncate">{adminUser?.name ?? "1st Class Owner"}</p>
            <p className="text-[10px] text-gray-500 capitalize">{adminUser?.role ?? "Owner"}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-xs font-semibold text-rose-600 hover:text-rose-700 py-1.5 px-2 rounded-lg hover:bg-rose-50 w-full transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" /> Log Out
        </button>
      </div>
    </aside>
  );
}

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-10 h-10 text-brand-gold" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
          </svg>
          <p className="text-gray-400 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user && pathname !== "/admin/login") return null;

  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <AuthProvider>
      <AdminGuard>
        {isLoginPage ? (
          <>{children}</>
        ) : (
          <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        )}
      </AdminGuard>
    </AuthProvider>
  );
}
