"use client";

import { useState, useEffect } from "react";
import { useCustomerProfile } from "@/context/CustomerProfileContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Package, MapPin, Phone, Mail, Clock, CheckCircle2, ShoppingBag, LogOut, Edit3 } from "lucide-react";
import { formatLKR } from "@/lib/utils";
import toast from "react-hot-toast";
import { getAdminOrders, mapAdminStatusToCustomer } from "@/lib/admin-store";

const SRI_LANKA_DISTRICTS = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Moneragala", "Ratnapura", "Kegalle"
];

export default function ProfilePage() {
  const router = useRouter();
  const { profile, updateProfile, isLoggedIn, loginAsDemo, logoutCustomer } = useCustomerProfile();

  const [activeTab, setActiveTab] = useState<"orders" | "details">("orders");
  const [isEditing, setIsEditing] = useState(false);
  const [adminOrders, setAdminOrders] = useState(() =>
    typeof window !== "undefined" ? getAdminOrders() : []
  );

  useEffect(() => {
    const handleUpdate = () => {
      setAdminOrders(getAdminOrders());
    };
    window.addEventListener("admin_orders_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("admin_orders_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Form states
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [street, setStreet] = useState(profile.address?.street || "");
  const [city, setCity] = useState(profile.address?.city || "");
  const [district, setDistrict] = useState(profile.address?.district || "Colombo");
  const [postalCode, setPostalCode] = useState(profile.address?.postalCode || "");
  const [notes, setNotes] = useState(profile.notes || "");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      email,
      address: { street, city, district, postalCode },
      notes,
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logoutCustomer();
    router.push("/");
  };

  // ── Guard: not logged in ──
  if (!isLoggedIn) {
    return (
      <div className="pt-32 pb-20 bg-[#FBF9F5] min-h-screen flex items-center justify-center">
        <div className="text-center space-y-5 max-w-sm px-4">
          <div className="w-16 h-16 rounded-full bg-[#F5EEDC] flex items-center justify-center mx-auto">
            <User className="w-8 h-8 text-[#9A7A2E]" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-brand-charcoal">My Account</h2>
          <p className="text-gray-500 text-sm">
            Sign in to view your orders, manage your profile, and track deliveries.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/login?redirect=profile"
              className="w-full py-3.5 rounded-xl bg-[#C9A84C] hover:bg-[#B3933B] text-white text-xs font-bold text-center shadow-xs transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register?redirect=profile"
              className="w-full py-3.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold text-center transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-[#FBF9F5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFECE6] shadow-xs flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full bg-[#F5EEDC] border-2 border-[#C9A84C]/40 flex items-center justify-center text-[#9A7A2E] text-2xl font-bold font-heading shrink-0 shadow-xs">
              {profile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2.5 justify-center sm:justify-start">
                <h1 className="font-heading text-2xl font-bold text-brand-charcoal">
                  {profile.name}
                </h1>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                  Verified Customer
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-3 justify-center sm:justify-start flex-wrap">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gray-400" /> {profile.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-gray-400" /> {profile.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> {profile.address.city}, {profile.address.district}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                setActiveTab("details");
              }}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? "Close Editor" : "Edit Profile"}</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#EFECE6] pb-3">
          <button
            onClick={() => {
              setActiveTab("orders");
              setIsEditing(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#C9A84C] text-white shadow-xs"
                : "text-gray-600 hover:text-brand-charcoal hover:bg-white"
            }`}
          >
            My Orders ({profile.orders.length})
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "details"
                ? "bg-[#C9A84C] text-white shadow-xs"
                : "text-gray-600 hover:text-brand-charcoal hover:bg-white"
            }`}
          >
            Delivery Address & Details
          </button>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {profile.orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#EFECE6] shadow-xs space-y-3">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="font-heading text-lg font-bold text-brand-charcoal">
                  No orders yet
                </h3>
                <p className="text-xs text-gray-400">
                  When you place an order with Cash on Delivery, it will appear here.
                </p>
                <Link
                  href="/portfolio"
                  className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-[#C9A84C] text-white text-xs font-semibold"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              profile.orders.map((ord) => {
                const matchedAdmin = adminOrders.find(
                  (a) =>
                    a.orderRef.toLowerCase().trim() === (ord.orderNumber || "").toLowerCase().trim()
                );
                const currentStatus = matchedAdmin
                  ? mapAdminStatusToCustomer(matchedAdmin.status)
                  : ord.status;

                const getStatusBadge = (st: string) => {
                  const s = (st || "").toLowerCase();
                  if (s === "confirmed") {
                    return "bg-blue-50 text-blue-700 border border-blue-200";
                  }
                  if (s === "processing") {
                    return "bg-indigo-50 text-indigo-700 border border-indigo-200";
                  }
                  if (s === "dispatched") {
                    return "bg-purple-50 text-purple-700 border border-purple-200";
                  }
                  if (s === "delivered" || s === "completed") {
                    return "bg-emerald-50 text-emerald-700 border border-emerald-200";
                  }
                  if (s === "cancelled") {
                    return "bg-rose-50 text-rose-700 border border-rose-200";
                  }
                  return "bg-amber-50 text-amber-800 border border-amber-200";
                };

                return (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl p-6 border border-[#EFECE6] shadow-xs space-y-4 hover:border-[#C9A84C]/50 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
                    <div>
                      <span className="font-heading text-base font-bold text-brand-charcoal">
                        {ord.orderNumber}
                      </span>
                      <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> Placed on {ord.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusBadge(
                          currentStatus
                        )}`}
                      >
                        {currentStatus}
                      </span>
                      <span className="font-heading font-bold text-sm text-[#9A7A2E]">
                        {formatLKR(ord.total)}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ord.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50/70 border border-gray-100"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-brand-charcoal truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            Qty: {item.quantity} × {formatLKR(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>Payment: <strong className="text-brand-charcoal">{ord.paymentMethod}</strong></span>
                    <a
                      href={`https://wa.me/94740388788?text=Hello%2C%20I%20am%20inquiring%20about%20my%20order%20${ord.orderNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9A7A2E] font-semibold hover:underline"
                    >
                      Track on WhatsApp →
                    </a>
                  </div>
                </div>
              );
            })
            )}
          </div>
        )}

        {/* Tab 2: Details & Address */}
        {activeTab === "details" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFECE6] shadow-xs">
            <h2 className="font-heading text-lg font-bold text-brand-charcoal mb-4">
              Saved Contact & Delivery Address
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-semibold text-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#C9A84C]"
                  />
                </div>
                <div>
                  <label className="block mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#C9A84C]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#C9A84C]"
                />
              </div>

              <div>
                <label className="block mb-1.5">Street Address</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#C9A84C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5">City / Town</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#C9A84C]"
                  />
                </div>
                <div>
                  <label className="block mb-1.5">District</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:border-[#C9A84C]"
                  >
                    {SRI_LANKA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Postal Code</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#C9A84C]"
                />
              </div>

              <div>
                <label className="block mb-1.5">Delivery Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special instructions for our delivery courier…"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#C9A84C]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C9A84C] hover:bg-[#B3933B] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
