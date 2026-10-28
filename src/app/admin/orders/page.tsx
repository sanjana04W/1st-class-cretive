"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Download,
  Eye,
  MessageCircle,
  CheckCircle2,
  Clock,
  X,
  Phone,
  MapPin,
  Calendar,
  Truck,
  ExternalLink,
} from "lucide-react";
import {
  AdminOrder,
  getAdminOrders,
  saveAdminOrders,
  markOrderNotificationRead,
  INITIAL_ADMIN_ORDERS,
} from "@/lib/admin-store";
import toast from "react-hot-toast";

type FilterTab = "All" | "Pending" | "Confirmed" | "Processing" | "Dispatched" | "Completed" | "Cancelled";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectOrder, setInspectOrder] = useState<AdminOrder | null>(null);

  useEffect(() => {
    // Load persisted admin orders
    const stored = getAdminOrders();

    // Also check for any orders placed through the public checkout
    try {
      const publicOrdersRaw =
        localStorage.getItem("fcc_all_orders") ||
        localStorage.getItem("1stclass_customer_orders");
      if (publicOrdersRaw) {
        const publicOrders = JSON.parse(publicOrdersRaw);
        if (Array.isArray(publicOrders) && publicOrders.length > 0) {
          const mapped: AdminOrder[] = publicOrders.map((po: any) => ({
            id: po.id || `ord-${po.orderNumber}`,
            orderRef: po.orderNumber || "LF-ORD",
            date: po.date || "Just now",
            customerName: po.customerName || "Customer",
            customerPhone: po.customerPhone || "0770000000",
            customerEmail: po.customerEmail,
            district: po.district || "Colombo",
            itemsCount: po.items?.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0) || 1,
            itemsDescription: po.items?.map((i: any) => `${i.title} (x${i.quantity || 1})`).join(", "),
            totalAmount: po.total || 0,
            status: (po.status?.toUpperCase() as any) || "PENDING",
            isVerified: true,
          }));

          // Merge without duplicates by orderRef
          const existingRefs = new Set(stored.map((o) => o.orderRef));
          const newOrders = mapped.filter((o) => !existingRefs.has(o.orderRef));
          const combined = [...newOrders, ...stored];
          setOrders(combined);
          saveAdminOrders(combined);
          return;
        }
      }
    } catch {
      // fallback to stored
    }

    setOrders(stored);

    // Read URL search query param if opened from topbar notification
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get("search");
      if (searchParam) {
        setSearchQuery(searchParam);
        const match = stored.find(
          (o) => o.orderRef.toLowerCase() === searchParam.toLowerCase()
        );
        if (match) {
          setInspectOrder(match);
          markOrderNotificationRead(match.orderRef);
        }
      }
    }
  }, []);

  const handleInspectOrder = (order: AdminOrder) => {
    setInspectOrder(order);
    markOrderNotificationRead(order.orderRef);
  };

  const handleUpdateStatus = (orderId: string, newStatus: AdminOrder["status"]) => {
    const target = orders.find((o) => o.id === orderId);
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    saveAdminOrders(updated);
    if (inspectOrder && inspectOrder.id === orderId) {
      setInspectOrder({ ...inspectOrder, status: newStatus });
    }
    if (target) {
      markOrderNotificationRead(target.orderRef);
    }
    toast.success(`Order status updated to ${newStatus}`);
  };

  const handleExportCSV = () => {
    const headers = ["Order Ref", "Date", "Customer Name", "Phone", "District", "Items Count", "Total Amount (LKR)", "Status", "Verified"];
    const rows = orders.map((o) => [
      o.orderRef,
      `"${o.date}"`,
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      `"${o.district}"`,
      o.itemsCount,
      o.totalAmount,
      o.status,
      o.isVerified ? "Yes" : "No",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Orders CSV exported successfully!");
  };

  const handleWhatsApp = (order: AdminOrder) => {
    let cleanPhone = order.customerPhone.replace(/\D/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "94" + cleanPhone.slice(1);
    } else if (!cleanPhone.startsWith("94")) {
      cleanPhone = "94" + cleanPhone;
    }
    const message = encodeURIComponent(
      `Hello ${order.customerName},\nThis is 1st Class Creative regarding your order *${order.orderRef}* totaling LKR ${order.totalAmount.toLocaleString()} (Cash on Delivery).\nStatus: ${order.status}.\nThank you for choosing 1st Class Creative!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
  };

  // Filter calculations
  const counts = {
    All: orders.length,
    Pending: orders.filter((o) => o.status === "PENDING").length,
    Confirmed: orders.filter((o) => o.status === "CONFIRMED").length,
    Processing: orders.filter((o) => o.status === "PROCESSING").length,
    Dispatched: orders.filter((o) => o.status === "DISPATCHED").length,
    Completed: orders.filter((o) => o.status === "COMPLETED").length,
    Cancelled: orders.filter((o) => o.status === "CANCELLED").length,
  };

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === "All" ? true : order.status.toUpperCase() === activeTab.toUpperCase();

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      order.orderRef.toLowerCase().includes(q) ||
      order.customerName.toLowerCase().includes(q) ||
      order.customerPhone.includes(q) ||
      order.district.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Card matching Image 2 */}
      <div className="bg-white rounded-2xl border border-[#E9DFCE] p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF3E0] border border-[#DEC47F] flex items-center justify-center shrink-0 text-[#9A7A2E]">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-heading font-serif text-2xl font-bold text-brand-charcoal">
              Order Management System
            </h1>
            <p className="text-xs text-gray-500 mt-1 max-w-2xl leading-relaxed">
              Manage Sri Lanka COD orders, verify payments, update delivery status, and trigger WhatsApp notifications.
            </p>
          </div>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-[#DEC47F] bg-white text-xs font-bold text-[#8C6D27] hover:bg-[#FAF5E8] transition-colors shrink-0 shadow-2xs"
        >
          <Download className="w-4 h-4" />
          <span>Export Orders to CSV</span>
        </button>
      </div>

      {/* Tabs & Search Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Pills matching Image 2 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {(["All", "Pending", "Confirmed", "Processing", "Dispatched", "Completed", "Cancelled"] as FilterTab[]).map(
            (tab) => {
              const isActive = activeTab === tab;
              const count = counts[tab];

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? "bg-[#9A7A2E] text-white shadow-2xs"
                      : "bg-white text-gray-600 border border-[#EFECE6] hover:bg-[#FAF8F5] hover:text-brand-charcoal"
                  }`}
                >
                  {tab} {count > 0 && <span className="ml-1 opacity-90">{count}</span>}
                </button>
              );
            }
          )}
        </div>

        {/* Search Input matching Image 2 */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, Name, Phone..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-[#EFECE6] bg-white text-xs focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal placeholder-gray-400"
          />
        </div>
      </div>

      {/* Orders Table matching Image 2 */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EFECE6] bg-[#FAF9F5] text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">ORDER REF</th>
                <th className="py-3.5 px-5">CUSTOMER DETAILS</th>
                <th className="py-3.5 px-5">DISTRICT</th>
                <th className="py-3.5 px-5">ITEMS COUNT</th>
                <th className="py-3.5 px-5">TOTAL AMOUNT</th>
                <th className="py-3.5 px-5 text-center">ORDER STATUS</th>
                <th className="py-3.5 px-5 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6] text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 text-xs font-semibold">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF9F5] transition-colors">
                    {/* Order Ref & Verification badge */}
                    <td className="py-4 px-5">
                      <p className="font-bold text-brand-charcoal text-xs">{order.orderRef}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{order.date}</p>
                      {order.isVerified && (
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                          ✓ Verified
                        </span>
                      )}
                    </td>

                    {/* Customer details */}
                    <td className="py-4 px-5">
                      <p className="font-bold text-brand-charcoal">{order.customerName}</p>
                      <p className="text-gray-500 font-mono text-[11px] mt-0.5">{order.customerPhone}</p>
                    </td>

                    {/* District */}
                    <td className="py-4 px-5 font-semibold text-gray-700">
                      {order.district}
                    </td>

                    {/* Items count */}
                    <td className="py-4 px-5 text-gray-600 tabular-nums">
                      {order.itemsCount} item(s)
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-5 font-bold font-heading tabular-nums text-brand-charcoal text-sm">
                      LKR {order.totalAmount.toLocaleString()}
                    </td>

                    {/* Order Status matching Image 2 rounded pills */}
                    <td className="py-4 px-5 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          order.status === "PENDING"
                            ? "bg-amber-50 text-amber-700 border border-amber-300"
                            : order.status === "COMPLETED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                            : order.status === "CANCELLED"
                            ? "bg-rose-50 text-rose-700 border border-rose-300"
                            : "bg-blue-50 text-blue-700 border border-blue-300"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Actions: WhatsApp & Inspect */}
                    <td className="py-4 px-5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* WhatsApp icon button */}
                        <button
                          onClick={() => handleWhatsApp(order)}
                          className="w-8 h-8 rounded-full border border-emerald-200 text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition-colors shadow-2xs"
                          title="Contact via WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>

                        {/* Inspect button matching Image 2 */}
                        <button
                          onClick={() => handleInspectOrder(order)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#DEC47F] text-[#8C6D27] hover:bg-[#FAF5E8] text-xs font-semibold transition-colors shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Order Modal */}
      {inspectOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#EFECE6] shadow-2xl overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#FAF9F5]">
              <div>
                <h3 className="font-heading font-serif text-lg font-bold text-brand-charcoal">
                  Order Details: {inspectOrder.orderRef}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{inspectOrder.date}</p>
              </div>
              <button
                onClick={() => setInspectOrder(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF9F5] border border-gray-100">
                <div>
                  <span className="text-gray-400 block text-[10px] font-bold uppercase">Customer</span>
                  <span className="font-bold text-brand-charcoal text-sm">{inspectOrder.customerName}</span>
                  <span className="text-gray-500 block font-mono mt-0.5">{inspectOrder.customerPhone}</span>
                  {inspectOrder.customerEmail && (
                    <span className="text-gray-500 block text-[11px] truncate">{inspectOrder.customerEmail}</span>
                  )}
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] font-bold uppercase">Delivery Area</span>
                  <span className="font-semibold text-gray-700 block mt-0.5">{inspectOrder.district} (Sri Lanka)</span>
                  <span className="text-emerald-700 font-bold block mt-1">Cash on Delivery (COD)</span>
                </div>
              </div>

              {inspectOrder.itemsDescription && (
                <div className="p-4 rounded-2xl border border-gray-100">
                  <span className="text-gray-400 block text-[10px] font-bold uppercase mb-1">Items Summary</span>
                  <p className="font-medium text-gray-700">{inspectOrder.itemsDescription}</p>
                </div>
              )}

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF5E8] border border-[#DEC47F]/40">
                <span className="font-bold text-gray-700">Total Order Amount</span>
                <span className="font-heading text-lg font-bold tabular-nums text-[#8C6D27]">
                  LKR {inspectOrder.totalAmount.toLocaleString()}
                </span>
              </div>

              {/* Status Update Options */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Update Order Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["PENDING", "CONFIRMED", "PROCESSING", "DISPATCHED", "COMPLETED", "CANCELLED"] as AdminOrder["status"][]).map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(inspectOrder.id, st)}
                        className={`py-2 px-1 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition-colors ${
                          inspectOrder.status === st
                            ? "bg-[#9A7A2E] text-white border-[#9A7A2E]"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-[#FAF9F5] flex justify-end gap-2">
              <button
                onClick={() => handleWhatsApp(inspectOrder)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Message on WhatsApp</span>
              </button>
              <button
                onClick={() => setInspectOrder(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
