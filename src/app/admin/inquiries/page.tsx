"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  PackageCheck,
  Send,
  Eye,
} from "lucide-react";
import { formatLKR, cn } from "@/lib/utils";
import toast from "react-hot-toast";

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Ready to Dispatch"
  | "Dispatched"
  | "Delivered"
  | "Completed"
  | "Cancelled"
  | "Failed Delivery";

interface OrderItem {
  id: string;
  orderNumber: string;
  orderIdString: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  itemsCount: number;
  itemDescription: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: "CASH ON DELIVERY" | "BANK TRANSFER";
  paymentStatus: "Payment Pending on Delivery" | "Paid";
  courier: string;
  status: OrderStatus;
  date: string;
}

const mockOrdersData: OrderItem[] = [
  {
    id: "ord-1",
    orderNumber: "FLM-00017",
    orderIdString: "D9acwHMBF1hMnv8rISxT",
    customerName: "Kaveesha sanhinda",
    phone: "+94776711121",
    whatsapp: "0776711121",
    email: "kaveeshasanhinda2003@gmail.com",
    address: "38/A, Galloluwa, Minuwangoda, Gampaha 11100",
    itemsCount: 1,
    itemDescription: "Handcrafted Floral Resin Coaster Set (Ocean Wave)",
    subtotal: 800,
    deliveryFee: 350,
    total: 1150,
    paymentMethod: "CASH ON DELIVERY",
    paymentStatus: "Payment Pending on Delivery",
    courier: "Pronto Delivery - Tracking Pending",
    status: "Pending",
    date: "Oct 12, 2026, 01:30 PM",
  },
  {
    id: "ord-2",
    orderNumber: "FLM-00016",
    orderIdString: "K8mxbv91LpQq23aRtZ",
    customerName: "Kaveesha sanhinda",
    phone: "+94776711121",
    whatsapp: "0776711121",
    email: "kaveeshasanhinda2003@gmail.com",
    address: "38/A, Galloluwa, Minuwangoda, Gampaha 11100",
    itemsCount: 1,
    itemDescription: "Personalized Glitter Letter Charm Keychain (Letter K)",
    subtotal: 800,
    deliveryFee: 350,
    total: 1150,
    paymentMethod: "CASH ON DELIVERY",
    paymentStatus: "Paid",
    courier: "PromptX Courier - DELIVERED",
    status: "Completed",
    date: "Oct 2, 2026, 12:03 PM",
  },
  {
    id: "ord-3",
    orderNumber: "FLM-00015",
    orderIdString: "R3tzXpW701MnAbQ82v",
    customerName: "Kaveesha sanhinda",
    phone: "+94776711121",
    whatsapp: "0776711121",
    email: "kaveeshasanhinda2003@gmail.com",
    address: "38/A, Galloluwa, Minuwangoda, Gampaha 11100",
    itemsCount: 1,
    itemDescription: "Rose Petal Resin Bookmark & Keychain Set",
    subtotal: 560,
    deliveryFee: 350,
    total: 910,
    paymentMethod: "CASH ON DELIVERY",
    paymentStatus: "Payment Pending on Delivery",
    courier: "No courier assigned yet.",
    status: "Pending",
    date: "Oct 1, 2026, 04:00 PM",
  },
  {
    id: "ord-4",
    orderNumber: "FLM-00014",
    orderIdString: "B4q9Lk30MnVw98xZ1C",
    customerName: "Chamika Dilshan",
    phone: "0778122331",
    whatsapp: "0778122331",
    email: "chamika.dilshan@gmail.com",
    address: "14/2, Temple Road, Kiribathgoda, Kelaniya",
    itemsCount: 1,
    itemDescription: "Golden Rose Embossed Cake Box Sample",
    subtotal: 560,
    deliveryFee: 350,
    total: 910,
    paymentMethod: "CASH ON DELIVERY",
    paymentStatus: "Payment Pending on Delivery",
    courier: "No courier assigned yet.",
    status: "Pending",
    date: "Sep 30, 2026, 05:52 PM",
  },
  {
    id: "ord-5",
    orderNumber: "FLM-00013",
    orderIdString: "L9p1Xz78AaQw34mK0B",
    customerName: "Kaveesha sanhinda",
    phone: "+94776711121",
    whatsapp: "0776711121",
    email: "kaveeshasanhinda2003@gmail.com",
    address: "38/A, Galloluwa, Minuwangoda, Gampaha 11100",
    itemsCount: 1,
    itemDescription: "Resin Flower Bud Decorative Keepsake",
    subtotal: 560,
    deliveryFee: 350,
    total: 910,
    paymentMethod: "CASH ON DELIVERY",
    paymentStatus: "Payment Pending on Delivery",
    courier: "No courier assigned yet.",
    status: "Pending",
    date: "Sep 30, 2026, 12:51 PM",
  },
  {
    id: "ord-6",
    orderNumber: "FLM-00012",
    orderIdString: "X5m8Nk22PpQw19zR4T",
    customerName: "Chamika Dilshan",
    phone: "0778122331",
    whatsapp: "0778122331",
    email: "chamika.dilshan@gmail.com",
    address: "14/2, Temple Road, Kiribathgoda, Kelaniya",
    itemsCount: 1,
    itemDescription: "Peach Petal Floral Wax & Resin Keepsake Tag",
    subtotal: 600,
    deliveryFee: 350,
    total: 950,
    paymentMethod: "CASH ON DELIVERY",
    paymentStatus: "Payment Pending on Delivery",
    courier: "No courier assigned yet.",
    status: "Pending",
    date: "Sep 28, 2026, 07:06 PM",
  },
  {
    id: "ord-7",
    orderNumber: "FLM-00011",
    orderIdString: "Z9c1Mm44LlKq88xV2W",
    customerName: "Chamika Dilshan",
    phone: "0778122331",
    whatsapp: "0778122331",
    email: "chamika.dilshan@gmail.com",
    address: "14/2, Temple Road, Kiribathgoda, Kelaniya",
    itemsCount: 3,
    itemDescription: "2× Resin Flower Birthday Greeting Card, 1× Single Bloom Resin Disc",
    subtotal: 1450,
    deliveryFee: 350,
    total: 1800,
    paymentMethod: "CASH ON DELIVERY",
    paymentStatus: "Payment Pending on Delivery",
    courier: "No courier assigned yet.",
    status: "Pending",
    date: "Sep 28, 2026, 06:59 PM",
  },
  {
    id: "ord-8",
    orderNumber: "FLM-00010",
    orderIdString: "H2k7Pp33XzQw55aB8N",
    customerName: "Nimasha Fernando",
    phone: "0774829102",
    whatsapp: "0774829102",
    email: "nimasha.f@gmail.com",
    address: "88, Peradeniya Road, Kandy",
    itemsCount: 1,
    itemDescription: "Custom Anniversary Photo Shadow Frame with Fairy Lights",
    subtotal: 4500,
    deliveryFee: 450,
    total: 4950,
    paymentMethod: "CASH ON DELIVERY",
    paymentStatus: "Paid",
    courier: "Domex Courier - DELIVERED",
    status: "Completed",
    date: "Sep 25, 2026, 11:20 AM",
  },
  {
    id: "ord-9",
    orderNumber: "FLM-00009",
    orderIdString: "Q4v9Xx11MnAa77zK3P",
    customerName: "Tharushi Perera",
    phone: "0719024432",
    whatsapp: "0719024432",
    email: "tharushi.p@outlook.com",
    address: "22/1, Beach Road, Negombo",
    itemsCount: 50,
    itemDescription: "50× Peach Blossom Handcrafted Wedding Invitations",
    subtotal: 17500,
    deliveryFee: 450,
    total: 17950,
    paymentMethod: "BANK TRANSFER",
    paymentStatus: "Paid",
    courier: "PromptX Express",
    status: "Confirmed",
    date: "Sep 24, 2026, 03:15 PM",
  },
  {
    id: "ord-10",
    orderNumber: "FLM-00008",
    orderIdString: "W8m2Zz99PpKq11aR5T",
    customerName: "Hasitha Senanayake",
    phone: "0762304910",
    whatsapp: "0762304910",
    email: "hasitha.sena@gmail.com",
    address: "105/B, Circular Road, Kurunegala",
    itemsCount: 1,
    itemDescription: "Ocean Resin Coasters (Set of 4) in Wooden Gift Box",
    subtotal: 3200,
    deliveryFee: 450,
    total: 3650,
    paymentMethod: "CASH ON DELIVERY",
    paymentStatus: "Payment Pending on Delivery",
    courier: "Domex Courier",
    status: "Ready to Dispatch",
    date: "Sep 22, 2026, 09:45 AM",
  },
  {
    id: "ord-11",
    orderNumber: "FLM-00007",
    orderIdString: "J1n5Bb66XxMm88aQ9V",
    customerName: "Sachini Gamage",
    phone: "0754108291",
    whatsapp: "0754108291",
    email: "sachini.g@gmail.com",
    address: "44, Galle Road, Kalutara",
    itemsCount: 2,
    itemDescription: "2× Custom Name Resin Keychains with Floral Inclusions",
    subtotal: 1200,
    deliveryFee: 350,
    total: 1550,
    paymentMethod: "CASH ON DELIVERY",
    paymentStatus: "Payment Pending on Delivery",
    courier: "Pronto Courier",
    status: "Dispatched",
    date: "Sep 20, 2026, 02:30 PM",
  },
  {
    id: "ord-12",
    orderNumber: "FLM-00006",
    orderIdString: "Y7x3Pp22MnKq44zB1R",
    customerName: "Dilani Peiris",
    phone: "0785192301",
    whatsapp: "0785192301",
    email: "dilani.p@gmail.com",
    address: "19, Station Road, Moratuwa",
    itemsCount: 1,
    itemDescription: "Special Resin Love Infinity Photo Frame",
    subtotal: 4200,
    deliveryFee: 350,
    total: 4550,
    paymentMethod: "CASH ON DELIVERY",
    paymentStatus: "Payment Pending on Delivery",
    courier: "Pending Confirmation",
    status: "Processing",
    date: "Sep 18, 2026, 10:15 AM",
  },
];

const ALL_STATUS_TABS: { label: string; count: (orders: OrderItem[]) => number }[] = [
  { label: "All", count: (o) => o.length },
  { label: "Pending", count: (o) => o.filter((x) => x.status === "Pending").length },
  { label: "Confirmed", count: (o) => o.filter((x) => x.status === "Confirmed").length },
  { label: "Processing", count: (o) => o.filter((x) => x.status === "Processing").length },
  { label: "Ready to Dispatch", count: (o) => o.filter((x) => x.status === "Ready to Dispatch").length },
  { label: "Dispatched", count: (o) => o.filter((x) => x.status === "Dispatched").length },
  { label: "Delivered", count: (o) => o.filter((x) => x.status === "Delivered").length },
  { label: "Completed", count: (o) => o.filter((x) => x.status === "Completed").length },
  { label: "Cancelled", count: (o) => o.filter((x) => x.status === "Cancelled").length },
  { label: "Failed Delivery", count: (o) => o.filter((x) => x.status === "Failed Delivery").length },
];

export default function AdminInquiriesOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>(mockOrdersData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>("ord-1");
  const [editingStatus, setEditingStatus] = useState<Record<string, OrderStatus>>({});

  const pendingCount = orders.filter((o) => o.status === "Pending").length;

  const handleStatusSelect = (orderId: string, newStatus: OrderStatus) => {
    setEditingStatus((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const handleSaveStatus = (orderId: string) => {
    const nextStatus = editingStatus[orderId];
    if (!nextStatus) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
    toast.success(`Order status updated to "${nextStatus}"`);
  };

  const filtered = orders.filter((o) => {
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      o.orderNumber.toLowerCase().includes(q) ||
      o.orderIdString.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      o.email.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 bg-[#FBF9F5] min-h-screen">
      {/* Top Title Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-brand-charcoal">
            Orders Management
          </h1>
          <p className="text-gray-500 text-xs mt-1">
            {orders.length} total orders ({pendingCount} pending confirmation)
          </p>
        </div>

        {/* Attention badge matching Flamira screenshot */}
        {pendingCount > 0 && (
          <div className="bg-[#FFF8E7] border border-[#F3DEAB] text-[#9A7A2E] px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-xs">
            <AlertCircle className="w-4 h-4 text-[#C9A84C]" />
            <span>{pendingCount} Pending Orders Need Attention</span>
          </div>
        )}
      </div>

      {/* Status Filter Tabs (Matching Flamira Design) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide text-xs">
        {ALL_STATUS_TABS.map(({ label, count }) => {
          const num = count(orders);
          const isActive = statusFilter === label;
          return (
            <button
              key={label}
              onClick={() => setStatusFilter(label)}
              className={cn(
                "px-3.5 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 shadow-2xs",
                isActive
                  ? "bg-[#2C2C2C] text-white border-[#2C2C2C] shadow-xs"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              <span>{label}</span>
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                )}
              >
                {num}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input Bar */}
      <div className="bg-white rounded-2xl p-3 border border-[#EFECE6] flex items-center justify-between shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order #, customer name, phone, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-1.5 outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-2 text-xs border-l border-gray-200 pl-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-transparent outline-none font-semibold text-gray-600 pr-2 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            {ALL_STATUS_TABS.slice(1).map(({ label }) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table with Expandable Accordion (Matches Flamira Reference Image 2 & 3) */}
      <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF9F6] uppercase text-gray-400 font-semibold text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ORDER #</th>
                <th className="px-6 py-4">CUSTOMER</th>
                <th className="px-6 py-4">ITEMS</th>
                <th className="px-6 py-4">TOTAL</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4">DATE</th>
                <th className="px-6 py-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map((o) => {
                const isExpanded = expandedId === o.id;
                const activeSelection = editingStatus[o.id] ?? o.status;

                return (
                  <tr key={o.id} className="group">
                    <td colSpan={7} className="p-0">
                      {/* Row Main Header */}
                      <div
                        onClick={() => setExpandedId(isExpanded ? null : o.id)}
                        className={cn(
                          "px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-amber-50/25 transition-colors",
                          isExpanded ? "bg-[#FFFDF7]" : ""
                        )}
                      >
                        {/* Order # */}
                        <div className="w-1/6 font-mono font-bold text-brand-charcoal text-xs">
                          {o.orderNumber}
                        </div>

                        {/* Customer */}
                        <div className="w-1/4">
                          <p className="font-bold text-brand-charcoal text-xs">
                            {o.customerName}
                          </p>
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                            {o.phone}
                          </p>
                        </div>

                        {/* Items */}
                        <div className="w-1/12 text-gray-600 font-semibold">
                          {o.itemsCount}
                        </div>

                        {/* Total */}
                        <div className="w-1/6 font-bold text-brand-charcoal text-xs">
                          Rs. {o.total.toLocaleString()}
                        </div>

                        {/* Status */}
                        <div className="w-1/6">
                          <span
                            className={cn(
                              "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                              o.status === "Pending"
                                ? "bg-[#FFF2D6] text-[#A6781E]"
                                : o.status === "Completed"
                                ? "bg-[#E6F8F0] text-[#1B8054]"
                                : o.status === "Confirmed"
                                ? "bg-[#EBF3FF] text-[#1E60A6]"
                                : o.status === "Processing"
                                ? "bg-[#F3E8FF] text-[#6B21A8]"
                                : "bg-gray-100 text-gray-700"
                            )}
                          >
                            {o.status}
                          </span>
                        </div>

                        {/* Date */}
                        <div className="w-1/6 text-gray-400 text-xs">
                          {o.date}
                        </div>

                        {/* Actions */}
                        <div className="w-1/12 flex items-center justify-end gap-2 text-gray-400">
                          <ExternalLink className="w-3.5 h-3.5 hover:text-brand-charcoal" />
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* Accordion Expanded Detail Section (Matches Screenshot 3) */}
                      {isExpanded && (
                        <div className="px-6 py-6 bg-[#FAF9F5] border-t border-b border-gray-100 space-y-6 animate-fade-in">
                          {/* Order ID & Open Full Order Page */}
                          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                            <p className="text-gray-500 font-mono text-[11px]">
                              <strong>Order ID:</strong> {o.orderIdString} &bull; Placed: {o.date}
                            </p>
                            <button
                              onClick={() => toast.success(`Viewing full order ${o.orderNumber}`)}
                              className="px-4 py-1.5 rounded-xl bg-[#C97A52] hover:bg-[#b56b45] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                            >
                              Open Full Order Page <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* 3 Detail Boxes: Items Ordered, Delivery & Customer Info, Payment Method */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {/* 1. Items Ordered */}
                            <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-2xs space-y-4">
                              <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                                ITEMS ORDERED
                              </p>
                              <div className="flex items-start justify-between text-xs pt-1">
                                <span className="font-semibold text-brand-charcoal leading-snug">
                                  {o.itemDescription} &times; {o.itemsCount}
                                </span>
                                <span className="font-bold text-gray-700 whitespace-nowrap ml-2">
                                  Rs. {o.subtotal.toLocaleString()}
                                </span>
                              </div>
                              <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-500">
                                <div className="flex justify-between">
                                  <span>Subtotal</span>
                                  <span>Rs. {o.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Delivery</span>
                                  <span>Rs. {o.deliveryFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold text-brand-charcoal pt-2 border-t border-gray-100 text-sm">
                                  <span>Total</span>
                                  <span className="text-[#9A7A2E]">
                                    Rs. {o.total.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* 2. Delivery & Customer Info */}
                            <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-2xs space-y-3">
                              <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                                DELIVERY & CUSTOMER INFO
                              </p>
                              <div>
                                <p className="font-bold text-brand-charcoal text-sm">
                                  {o.customerName}
                                </p>
                                <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                                  <span>{o.phone}</span>
                                </p>
                                <a
                                  href={`https://wa.me/+94${o.whatsapp.replace(/[^0-9]/g, "").slice(-9)}?text=Hello%20${encodeURIComponent(o.customerName)}%2C%20regarding%20your%20order%20${o.orderNumber}...`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-[#25D366] font-semibold flex items-center gap-1 hover:underline mt-1"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>WhatsApp: {o.whatsapp}</span>
                                </a>
                                <p className="text-[11px] text-gray-400 mt-1 truncate">
                                  {o.email}
                                </p>
                              </div>

                              <div className="pt-2 border-t border-gray-100">
                                <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                                  {o.address}
                                </p>
                              </div>
                            </div>

                            {/* 3. Payment Method & Courier */}
                            <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-2xs space-y-4">
                              <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                                PAYMENT METHOD
                              </p>
                              <div>
                                <p className="font-bold text-brand-charcoal text-xs">
                                  {o.paymentMethod}
                                </p>
                                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FFF5E0] text-[#9A7A2E]">
                                  {o.paymentStatus}
                                </span>
                              </div>

                              <div className="pt-3 border-t border-gray-100">
                                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">
                                  COURIER DISPATCH
                                </p>
                                <div className="bg-[#FAF9F6] p-2.5 rounded-xl border border-gray-100 text-[11px] text-gray-500 flex items-center gap-2">
                                  <Truck className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                  <span>{o.courier}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Update Status Bar (Matching Screenshot 3) */}
                          <div className="bg-white p-4 rounded-2xl border border-[#EFECE6] shadow-2xs space-y-2">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                              UPDATE STATUS
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                              <div className="relative min-w-[200px]">
                                <select
                                  value={activeSelection}
                                  onChange={(e) =>
                                    handleStatusSelect(o.id, e.target.value as OrderStatus)
                                  }
                                  className="w-full text-xs font-semibold px-3 py-2 border border-gray-300 rounded-xl bg-white shadow-2xs outline-none cursor-pointer focus:border-brand-gold"
                                >
                                  <option value="Pending">Pending (current)</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Processing">Processing</option>
                                  <option value="Ready to Dispatch">Ready to Dispatch</option>
                                  <option value="Dispatched">Dispatched</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                  <option value="Failed Delivery">Failed Delivery</option>
                                </select>
                              </div>

                              <button
                                onClick={() => handleSaveStatus(o.id)}
                                className="px-5 py-2 bg-[#D18F68] hover:bg-[#bd7e58] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
                              >
                                Save Status
                              </button>

                              <a
                                href={`https://wa.me/+94${o.whatsapp.replace(/[^0-9]/g, "").slice(-9)}?text=Hello%20${encodeURIComponent(o.customerName)}%2C%20your%20order%20${o.orderNumber}%20is%20now%20${activeSelection}!`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" /> Notify Customer on WhatsApp
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
