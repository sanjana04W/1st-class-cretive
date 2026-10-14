"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  InboxIcon,
  Images,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  Tag,
  ShieldCheck,
} from "lucide-react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { adminSignOut } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
  { href: "/admin/inquiries", icon: <InboxIcon className="w-5 h-5" />, label: "Inquiries", badge: "new" },
  { href: "/admin/portfolio", icon: <Images className="w-5 h-5" />, label: "Portfolio" },
  { href: "/admin/testimonials", icon: <Star className="w-5 h-5" />, label: "Testimonials" },
  { href: "/admin/promotions", icon: <Tag className="w-5 h-5" />, label: "Promotions" },
  { href: "/admin/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" },
];

function AdminSidebar() {
  const { adminUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await adminSignOut();
    router.push("/admin/login");
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <Image src="/logo.png" alt="1st Class Creative" width={130} height={50} className="h-12 w-auto object-contain" />
        <p className="text-xs text-brand-gold font-semibold uppercase tracking-widest mt-2 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn("admin-nav-item", pathname?.startsWith(href) && href !== "/admin" ? "active" : "")}
          >
            {icon}
            <span className="flex-1">{label}</span>
            {pathname?.startsWith(href) && <ChevronRight className="w-4 h-4" />}
          </Link>
        ))}
      </nav>

      {/* User + Sign Out */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold font-heading text-sm">
            {adminUser?.name?.[0] ?? "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-brand-charcoal truncate">{adminUser?.name ?? "Admin"}</p>
            <p className="text-xs text-gray-400 capitalize">{adminUser?.role ?? "owner"}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="admin-nav-item w-full text-brand-rose hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
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
