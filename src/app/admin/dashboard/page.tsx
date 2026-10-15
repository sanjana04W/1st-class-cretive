"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock,
  DollarSign,
  AlertCircle,
  Package,
  Plus,
  ExternalLink,
  ChevronRight,
  Eye,
  CheckCircle,
  Truck,
  MessageCircle,
} from "lucide-react";
import { getInquiries, updateInquiryStatus } from "@/lib/firestore";
import type { Inquiry } from "@/types";
import { cn, formatLKR } from "@/lib/utils";
import toast from "react-hot-toast";

// Seed sample orders for 1st Class Creative matching the provided design
const defaultOrders = [
  {
    id: "FCC-00017",
    customer: "Kaveesha Sanhinda",
    phone: "077 671 1121",
    item: "1× Resin Floral Coaster & Frame Set",
    total: 3450,
    status: "Pending",
    date: "Today, 10:24 AM",
  },
  {
    id: "FCC-00015",
    customer: "Nimasha Fernando",
    phone: "077 482 9102",
    item: "1× Glitter Letter Keychains (Pack of 5)",
    total: 2250,
    status: "Pending",
    date: "Today, 09:15 AM",
  },
  {
    id: "FCC-00014",
    customer: "Chamika Dilshan",
    phone: "077 812 2331",
    item: "50× Peach Blossom Wedding Invitations",
    total: 18500,
    status: "Pending",
    date: "Yesterday",
  },
  {
    id: "FCC-00013",
    customer: "Tharushi Perera",
    phone: "071 902 4432",
    item: "1× Ivory Embossed Wedding Cake Box",
    total: 2800,
    status: "Pending",
    date: "Yesterday",
  },
  {
    id: "FCC-00012",
    customer: "Hasitha Senanayake",
    phone: "076 230 4910",
    item: "1× Custom Wedding Memory Frame with Lights",
    total: 4850,
    status: "Pending",
    date: "13 Oct 2026",
  },
  {
    id: "FCC-00011",
    customer: "Sachini Gamage",
    phone: "075 410 8291",
    item: "2× Personalised Initial Resin Keychains",
    total: 1600,
    status: "Pending",
    date: "12 Oct 2026",
  },
];

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [orders, setOrders] = useState(defaultOrders);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal for creating custom order
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [newCustomer, setNewCustomer] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    getInquiries()
      .then((data) => {
        setInquiries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer || !newItem) {
      toast.error("Please enter customer name and item description");
      return;
    }
    const orderNum = `FCC-${Math.floor(10000 + Math.random() * 90000)}`;
    const newEntry = {
      id: orderNum,
      customer: newCustomer,
      phone: newPhone || "074 038 8788",
      item: newItem,
      total: Number(newAmount) || 2500,
      status: "Pending",
      date: "Just now",
    };
    setOrders([newEntry, ...orders]);
    setShowNewOrder(false);
    setNewCustomer("");
    setNewPhone("");
    setNewItem("");
    setNewAmount("");
    toast.success(`Order ${orderNum} created successfully!`);
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder?.id === id) {
      setSelectedOrder((prev: any) => ({ ...prev, status: newStatus }));
    }
    toast.success(`Order ${id} marked as ${newStatus}`);
  };

  const pendingOrders = orders.filter((o) => o.status === "Pending");
  const totalRevenue = orders
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + o.total, 38500);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-[#FBF9F5] min-h-screen">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-brand-charcoal">
            Store Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back to 1st Class Creative Craft Studio Admin.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/inquiries"
            className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-brand-charcoal hover:bg-gray-50 transition-colors shadow-xs"
          >
            All Orders
          </Link>
          <button
            onClick={() => setShowNewOrder(true)}
            className="btn-primary !py-2 !px-4 text-xs font-semibold shadow-xs"
          >
            <Plus className="w-4 h-4" /> New Order
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Today's Orders */}
        <div className="bg-white rounded-2xl p-5 border border-[#EFECE6] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              Today's Orders
            </span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-brand-charcoal">
              {orders.filter((o) => o.date.includes("Today")).length}
            </p>
            <p className="text-xs text-gray-400 mt-1">Received today</p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs text-[#9A7A2E] font-semibold mt-4 flex items-center justify-end gap-1 hover:underline"
          >
            View <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* This Month's Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-[#EFECE6] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              This Month's Revenue
            </span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-brand-charcoal">
              {formatLKR(totalRevenue)}
            </p>
            <p className="text-xs text-gray-400 mt-1">Completed orders & deposits</p>
          </div>
          <Link
            href="/admin/reports"
            className="text-xs text-[#9A7A2E] font-semibold mt-4 flex items-center justify-end gap-1 hover:underline"
          >
            View <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pending Orders Highlight Card */}
        <div className="bg-[#FFFBF0] rounded-2xl p-5 border-2 border-[#E8C97A] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Pending Orders
            </span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-[#9A7A2E]">
              {pendingOrders.length}
            </p>
            <p className="text-xs text-amber-800 mt-1">Awaiting verification</p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs text-[#9A7A2E] font-bold mt-4 flex items-center justify-end gap-1 hover:underline"
          >
            View <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Low Stock Items */}
        <div className="bg-white rounded-2xl p-5 border border-[#EFECE6] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              Low Stock Items
            </span>
            <Package className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-brand-charcoal">0</p>
            <p className="text-xs text-gray-400 mt-1">Needs restocking</p>
          </div>
          <Link
            href="/admin/inventory"
            className="text-xs text-[#9A7A2E] font-semibold mt-4 flex items-center justify-end gap-1 hover:underline"
          >
            View <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Action Required: Pending Orders Banner & Grid (Matches Flamira Screenshot) */}
      <div className="bg-[#FFFDF7] rounded-3xl p-6 border border-[#F0E6D2] shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="font-heading text-lg font-bold text-brand-charcoal">
              Action Required: Pending Orders ({pendingOrders.length})
            </h2>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-semibold text-[#9A7A2E] hover:underline flex items-center gap-1"
          >
            View all {pendingOrders.length} pending orders →
          </Link>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingOrders.slice(0, 6).map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-4 border border-[#ECE6D8] hover:border-brand-gold hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-brand-charcoal">
                    {order.id}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {order.status}
                  </span>
                </div>
                <p className="text-sm font-bold text-brand-charcoal">
                  {order.customer}
                </p>
                <p className="text-xs text-gray-400 mb-2">{order.phone}</p>
                <p className="text-xs text-gray-600 line-clamp-1">{order.item}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="font-bold text-sm text-[#9A7A2E]">
                  {formatLKR(order.total)}
                </span>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-xs font-semibold text-gray-600 hover:text-brand-gold flex items-center gap-1"
                >
                  Open Details <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Customer Orders Table */}
      <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-brand-charcoal">
            Recent Customer Orders
          </h2>
          <Link
            href="/admin/inquiries"
            className="text-xs font-semibold text-[#9A7A2E] hover:underline"
          >
            View all orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF9F6] uppercase text-gray-400 font-semibold text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5">Order #</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Items</th>
                <th className="px-6 py-3.5">Total</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-brand-charcoal">
                    {o.id}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-brand-charcoal">{o.customer}</p>
                    <p className="text-[10px] text-gray-400">{o.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                    {o.item}
                  </td>
                  <td className="px-6 py-4 font-bold text-brand-charcoal">
                    {formatLKR(o.total)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                        o.status === "Pending"
                          ? "bg-amber-100 text-amber-800"
                          : o.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      )}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{o.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-brand-charcoal hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-brand-charcoal text-sm"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-base font-bold text-brand-charcoal">
                {selectedOrder.id}
              </span>
              <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {selectedOrder.status}
              </span>
            </div>

            <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-2xl">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Customer</p>
                <p className="font-bold text-brand-charcoal">{selectedOrder.customer}</p>
                <p className="text-xs text-gray-500">{selectedOrder.phone}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Order Items</p>
                <p className="text-xs text-gray-700">{selectedOrder.item}</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-500">Amount Due / Total</span>
                <span className="font-heading text-lg font-bold text-[#9A7A2E]">
                  {formatLKR(selectedOrder.total)}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <a
                href={`https://wa.me/+94${selectedOrder.phone.replace(/[^0-9]/g, "").slice(-9)}?text=Hello%20${encodeURIComponent(selectedOrder.customer)}%2C%20this%20is%201st%20Class%20Creative%20regarding%20your%20order%20${selectedOrder.id}!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Reply on WhatsApp
              </a>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, "Processing")}
                  className="py-2 px-3 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Mark Processing
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, "Completed")}
                  className="py-2 px-3 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Mark Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Order Modal */}
      {showNewOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowNewOrder(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-brand-charcoal text-sm"
            >
              ✕
            </button>
            <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
              Create New Order
            </h3>
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
                  placeholder="e.g. Kaveesha Sanhinda"
                  className="form-input text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="07X XXX XXXX"
                  className="form-input text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Item / Order Description *
                </label>
                <input
                  type="text"
                  required
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="e.g. 1× Floral Resin Coaster Set"
                  className="form-input text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Total Amount (LKR)
                </label>
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="e.g. 2500"
                  className="form-input text-xs"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="btn-primary w-full justify-center text-xs">
                  Save Order
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewOrder(false)}
                  className="btn-secondary w-full justify-center text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
