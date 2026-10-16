"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  ChevronDown,
  X,
  Package,
  Phone,
  MapPin,
  Mail,
  Calendar,
  RefreshCw,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { readAllOrders, updateGlobalOrderStatus } from "@/context/CustomerProfileContext";
import type { UserOrderHistory } from "@/context/CustomerProfileContext";
import { formatLKR } from "@/lib/utils";

/* ─── Status badge config ─── */
const STATUS_CONFIG: Record<
  UserOrderHistory["status"],
  { label: string; color: string; icon: React.ReactNode }
> = {
  Pending:    { label: "Pending",    color: "bg-amber-50 text-amber-700 border-amber-300",    icon: <Clock className="w-3 h-3" /> },
  Confirmed:  { label: "Confirmed",  color: "bg-blue-50 text-blue-700 border-blue-300",        icon: <CheckCircle2 className="w-3 h-3" /> },
  Processing: { label: "Processing", color: "bg-purple-50 text-purple-700 border-purple-300",  icon: <RefreshCw className="w-3 h-3" /> },
  Dispatched: { label: "Dispatched", color: "bg-indigo-50 text-indigo-700 border-indigo-300",  icon: <Truck className="w-3 h-3" /> },
  Delivered:  { label: "Delivered",  color: "bg-green-50 text-green-700 border-green-300",     icon: <CheckCircle2 className="w-3 h-3" /> },
  Cancelled:  { label: "Cancelled",  color: "bg-red-50 text-red-700 border-red-300",           icon: <XCircle className="w-3 h-3" /> },
};

const ALL_STATUSES = Object.keys(STATUS_CONFIG) as UserOrderHistory["status"][];

function StatusBadge({ status }: { status: UserOrderHistory["status"] }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${cfg.color}`}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders]       = useState<UserOrderHistory[]>([]);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<UserOrderHistory | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  /* ── Load orders from localStorage ── */
  const loadOrders = () => setOrders(readAllOrders());

  useEffect(() => {
    loadOrders();
    // Refresh every 10s in case a new order comes in from another tab
    const interval = setInterval(loadOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  /* ── Filtering ── */
  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q) ||
      o.customerPhone.includes(q) ||
      o.district.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  /* ── Update order status ── */
  const handleStatusChange = (order: UserOrderHistory, newStatus: UserOrderHistory["status"]) => {
    setUpdatingId(order.id);
    updateGlobalOrderStatus(order.id, newStatus);
    setOrders((prev) => prev.map((o) => o.id === order.id ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === order.id) setSelectedOrder((o) => o ? { ...o, status: newStatus } : o);
    setTimeout(() => setUpdatingId(null), 400);
  };

  /* ── Summary counts ── */
  const counts = ALL_STATUSES.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 space-y-6">

      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#2C2C2C]">Orders</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {orders.length} total order{orders.length !== 1 ? "s" : ""} from customers
          </p>
        </div>
        <button
          onClick={loadOrders}
          className="flex items-center gap-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Status summary pills */}
      <div className="flex flex-wrap gap-2">
        {[{ label: "All", count: orders.length }, ...ALL_STATUSES.map((s) => ({ label: s, count: counts[s] }))].map(({ label, count }) => (
          <button
            key={label}
            onClick={() => setStatusFilter(label)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              statusFilter === label
                ? "bg-[#2C2C2C] text-white border-[#2C2C2C]"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, order #…"
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] bg-white"
        />
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Package className="w-7 h-7 text-gray-400" />
          </div>
          <p className="font-semibold text-gray-600 text-sm">No orders found</p>
          <p className="text-gray-400 text-xs mt-1">
            {search || statusFilter !== "All"
              ? "Try adjusting your search or filter."
              : "Orders placed by customers will appear here."}
          </p>
        </div>
      )}

      {/* Orders table */}
      {filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#EFECE6] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#FCFAF6] border-b border-[#EFECE6]">
                <tr>
                  {["Order #", "Customer", "Items", "Total", "District", "Placed At", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-bold text-gray-600 uppercase tracking-wider text-[10px] whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((order) => (
                  <tr
                    key={order.id}
                    className={`hover:bg-gray-50 transition-colors ${updatingId === order.id ? "opacity-60" : ""}`}
                  >
                    {/* Order number */}
                    <td className="px-4 py-3 font-bold text-[#2C2C2C] whitespace-nowrap">
                      {order.orderNumber}
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-[#2C2C2C]">{order.customerName}</p>
                        <p className="text-[10px] text-gray-400 truncate max-w-[140px]">{order.customerEmail}</p>
                        <p className="text-[10px] text-gray-400">{order.customerPhone}</p>
                      </div>
                    </td>

                    {/* Items thumbnails */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {order.items.slice(0, 3).map((item, i) => (
                          <div
                            key={i}
                            className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shrink-0"
                          >
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <span className="text-[10px] text-gray-400 font-semibold">+{order.items.length - 3}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                    </td>

                    {/* Total */}
                    <td className="px-4 py-3 font-bold text-[#9A7A2E] whitespace-nowrap">
                      {formatLKR(order.total)}
                    </td>

                    {/* District */}
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{order.district}</td>

                    {/* Placed at */}
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                      {order.date}
                    </td>

                    {/* Status dropdown */}
                    <td className="px-4 py-3">
                      <div className="relative group">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order, e.target.value as UserOrderHistory["status"])}
                          className="appearance-none pr-6 pl-2 py-1 rounded-lg border border-gray-200 text-[10px] font-bold bg-white focus:outline-none focus:border-[#C9A84C] cursor-pointer"
                        >
                          {ALL_STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                      </div>
                      <div className="mt-1">
                        <StatusBadge status={order.status} />
                      </div>
                    </td>

                    {/* View button */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#C9A84C] hover:bg-[#FCFAF6] text-gray-600 hover:text-[#9A7A2E] text-[10px] font-semibold transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Order Detail Modal ── */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="font-heading text-lg font-bold text-[#2C2C2C]">
                  Order {selectedOrder.orderNumber}
                </h2>
                <p className="text-[11px] text-gray-400 mt-0.5">Placed: {selectedOrder.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={selectedOrder.status} />
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Customer info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FCFAF6] border border-[#F0ECE1] space-y-2 text-xs">
                  <p className="font-bold text-[#2C2C2C] uppercase tracking-wider text-[10px]">Customer</p>
                  <p className="font-semibold text-[#2C2C2C]">{selectedOrder.customerName}</p>
                  <p className="flex items-center gap-1.5 text-gray-500"><Mail className="w-3 h-3" />{selectedOrder.customerEmail}</p>
                  <p className="flex items-center gap-1.5 text-gray-500"><Phone className="w-3 h-3" />{selectedOrder.customerPhone}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FCFAF6] border border-[#F0ECE1] space-y-2 text-xs">
                  <p className="font-bold text-[#2C2C2C] uppercase tracking-wider text-[10px]">Delivery Address</p>
                  <p className="flex items-start gap-1.5 text-gray-500">
                    <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                    <span>{selectedOrder.street}, {selectedOrder.city}, {selectedOrder.district}{selectedOrder.postalCode ? ` ${selectedOrder.postalCode}` : ""}</span>
                  </p>
                  {selectedOrder.notes && (
                    <p className="text-gray-400 italic">Note: {selectedOrder.notes}</p>
                  )}
                </div>
              </div>

              {/* Order items */}
              <div>
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-3">Items Ordered</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-200 shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#2C2C2C] truncate">{item.title}</p>
                        <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold text-[#9A7A2E] shrink-0">{formatLKR(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs border-t border-gray-100 pt-4">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatLKR(selectedOrder.subtotal ?? selectedOrder.total)}</span>
                </div>
                {selectedOrder.deliveryFee != null && (
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery ({selectedOrder.district})</span>
                    <span className="font-semibold">{formatLKR(selectedOrder.deliveryFee)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm pt-1">
                  <span>Total (COD)</span>
                  <span className="text-[#9A7A2E]">{formatLKR(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Status update */}
              <div className="pt-4 border-t border-gray-100">
                <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Update Order Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedOrder, s)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedOrder.status === s
                          ? "bg-[#2C2C2C] text-white border-[#2C2C2C]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#C9A84C] hover:text-[#9A7A2E]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
