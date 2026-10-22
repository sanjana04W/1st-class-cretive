"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Shield,
  TrendingUp,
  ChevronDown,
  LogOut,
  ShoppingBag,
  MessageSquare,
  Check,
  X,
  Sparkles,
  Menu,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  AdminNotification,
  AdminRoleType,
  getActiveAdminRole,
  setActiveAdminRole,
  ROLE_PERMISSIONS,
  getAdminNotifications,
  saveAdminNotifications,
} from "@/lib/admin-store";

interface AdminTopbarProps {
  title?: string;
  onOpenMobileMenu?: () => void;
}

export default function AdminTopbar({ title, onOpenMobileMenu }: AdminTopbarProps) {
  const { adminUser, logout } = useAuth();
  const router = useRouter();

  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AdminRoleType>("Owner");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  useEffect(() => {
    setNotifications(getAdminNotifications());
    setSelectedRole(getActiveAdminRole());

    const handleUpdate = () => {
      setNotifications(getAdminNotifications());
    };
    const handleRoleUpdate = (e: any) => {
      setSelectedRole(e.detail || getActiveAdminRole());
    };

    window.addEventListener("admin_notifications_updated", handleUpdate);
    window.addEventListener("admin_role_changed", handleRoleUpdate);
    return () => {
      window.removeEventListener("admin_notifications_updated", handleUpdate);
      window.removeEventListener("admin_role_changed", handleRoleUpdate);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSelectRole = (role: AdminRoleType) => {
    setSelectedRole(role);
    setActiveAdminRole(role);
    setShowRoleDropdown(false);
  };

  // Once all notifications are read, remove them completely from the notification bar
  const handleMarkAllRead = () => {
    setNotifications([]);
    saveAdminNotifications([]);
  };

  const handleDismissNotif = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      saveAdminNotifications(updated);
      return updated;
    });
  };

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  const currentRoleConfig = ROLE_PERMISSIONS[selectedRole] || ROLE_PERMISSIONS["Owner"];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EFECE6] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-2xs">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-1.5 -ml-1 rounded-md text-gray-600 hover:bg-[#FAF7F0] hover:text-[#9A7A2E] transition-colors"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-5 h-5 text-brand-charcoal" />
          </button>
        )}
        <h1 className="font-heading text-base sm:text-lg font-bold text-brand-charcoal truncate">
          {title || "Dashboard"}
        </h1>
      </div>

      {/* Right: Controls & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Revenue badge - visible for roles that can view analytics */}
        {currentRoleConfig.canViewAnalytics && (
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold tracking-tight">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>LKR 16,550</span>
          </div>
        )}

        {/* Role Selector */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#FAF7F0] border border-[#E9DFCE] text-brand-charcoal hover:bg-[#F4EFE6] text-xs font-semibold transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-brand-gold-dark" />
            <span className="hidden sm:inline">ROLE: <strong className="text-brand-charcoal">{selectedRole}</strong></span>
            <span className="sm:hidden font-bold">{selectedRole}</span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-[#EFECE6] py-1 z-50 animate-fade-in text-xs">
              {(["Owner", "Manager", "Order Staff"] as AdminRoleType[]).map((role) => (
                <button
                  key={role}
                  onClick={() => handleSelectRole(role)}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#FAF7F0] ${
                    selectedRole === role ? "text-brand-gold-dark font-bold bg-[#FAF7F0]" : "text-gray-700"
                  }`}
                >
                  <span>{role}</span>
                  {selectedRole === role && <Check className="w-3.5 h-3.5 text-brand-gold-dark" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifPopover(!showNotifPopover)}
            className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Floating Notifications Popover */}
          {showNotifPopover && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#EFECE6] overflow-hidden z-50 animate-fade-in">
              {/* Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#FAF9F5]">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-brand-charcoal" />
                  <span className="font-heading font-bold text-sm text-brand-charcoal">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[11px] font-medium text-gray-500 hover:text-brand-charcoal flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> All read
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifPopover(false)}
                    className="p-1 rounded-md text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Notification Items List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 p-2 space-y-1">
                {notifications.length === 0 ? (
                  <div className="py-10 px-4 text-center space-y-2.5">
                    <div className="w-11 h-11 rounded-full bg-[#F4EFE6] text-[#9A7A2E] flex items-center justify-center mx-auto shadow-2xs">
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-xs text-brand-charcoal">All caught up!</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        All notifications have been read and cleared.
                      </p>
                    </div>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        const updated = notifications.map((x) =>
                          x.id === n.id ? { ...x, read: true } : x
                        );
                        setNotifications(updated);
                        saveAdminNotifications(updated);
                        setShowNotifPopover(false);
                        router.push(`/admin/orders?search=${encodeURIComponent(n.orderRef)}`);
                      }}
                      className={`p-3 rounded-xl flex items-start gap-3 transition-colors cursor-pointer ${
                        n.read ? "bg-white hover:bg-gray-50" : "bg-[#F9FAF8] hover:bg-[#F3F6F1] border-l-2 border-brand-gold"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-xs text-brand-charcoal truncate">
                            New Order: {n.orderRef}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDismissNotif(n.id);
                            }}
                            className="text-gray-400 hover:text-gray-600 p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5">{n.date}</p>
                        <p className="text-xs font-semibold text-gray-800 mt-1">{n.customerName}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5 tabular-nums">
                          LKR {n.amount.toLocaleString()} • {n.itemsCount} item(s) • {n.district}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Popover Footer */}
              <div className="p-3 border-t border-gray-100 bg-[#FAF9F5] flex items-center justify-around text-xs font-semibold text-brand-charcoal">
                <Link
                  href="/admin/orders"
                  onClick={() => setShowNotifPopover(false)}
                  className="flex items-center gap-1.5 hover:text-brand-gold-dark transition-colors py-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-brand-gold-dark" />
                  <span>View Orders</span>
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/admin/inquiries"
                  onClick={() => setShowNotifPopover(false)}
                  className="flex items-center gap-1.5 hover:text-brand-gold-dark transition-colors py-1"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-brand-gold-dark" />
                  <span>View Messages</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-[#9A7A2E] text-white font-black flex items-center justify-center text-[11px] tracking-tight shadow-xs select-none">
            {selectedRole === "Owner" ? "1st" : selectedRole === "Manager" ? "M" : "S"}
          </div>
          <div className="hidden md:block leading-tight text-left">
            <span className="block text-xs font-bold text-brand-charcoal truncate">
              {selectedRole === "Owner" ? (adminUser?.name || "1st Class Owner") : selectedRole === "Manager" ? "Operations Manager" : "Order Staff"}
            </span>
            <span className="block text-[9px] font-bold tracking-wider text-[#9A7A2E] uppercase">
              {currentRoleConfig.badgeLabel}
            </span>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
