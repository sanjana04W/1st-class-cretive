"use client";

import { useState } from "react";
import { UserCheck, Phone, Mail, MessageCircle, MapPin, Search } from "lucide-react";
import { formatLKR } from "@/lib/utils";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  lastOrder: string;
}

const mockCustomers: Customer[] = [
  {
    id: "CUST-101",
    name: "Kaveesha Sanhinda",
    phone: "077 671 1121",
    email: "kaveesha.s@gmail.com",
    city: "Colombo",
    ordersCount: 3,
    totalSpent: 9800,
    lastOrder: "15 Oct 2026",
  },
  {
    id: "CUST-102",
    name: "Chamika Dilshan",
    phone: "077 812 2331",
    email: "chamika.d@gmail.com",
    city: "Gampaha",
    ordersCount: 2,
    totalSpent: 21500,
    lastOrder: "14 Oct 2026",
  },
  {
    id: "CUST-103",
    name: "Nimasha Fernando",
    phone: "077 482 9102",
    email: "nimasha.f@gmail.com",
    city: "Kandy",
    ordersCount: 1,
    totalSpent: 2250,
    lastOrder: "15 Oct 2026",
  },
  {
    id: "CUST-104",
    name: "Tharushi Perera",
    phone: "071 902 4432",
    email: "tharushi.p@outlook.com",
    city: "Negombo",
    ordersCount: 2,
    totalSpent: 5600,
    lastOrder: "14 Oct 2026",
  },
  {
    id: "CUST-105",
    name: "Hasitha Senanayake",
    phone: "076 230 4910",
    email: "hasitha.sena@gmail.com",
    city: "Kurunegala",
    ordersCount: 1,
    totalSpent: 4850,
    lastOrder: "13 Oct 2026",
  },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 bg-[#FBF9F5] min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-brand-charcoal">
            Customers Directory
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track customer records, repeat purchases, and lifetime values.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#EFECE6] flex items-center shadow-xs">
        <Search className="w-4 h-4 text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search by customer name, phone, email, or city…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs outline-none bg-transparent"
        />
      </div>

      <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-xs overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#FAF9F6] uppercase text-gray-400 font-semibold text-[10px] tracking-wider border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Total Orders</th>
              <th className="px-6 py-4">Lifetime Value</th>
              <th className="px-6 py-4">Last Order</th>
              <th className="px-6 py-4 text-right">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-amber-50/20 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-brand-charcoal">{c.name}</p>
                  <p className="text-[10px] text-gray-400">{c.email}</p>
                </td>
                <td className="px-6 py-4 text-gray-600">{c.phone}</td>
                <td className="px-6 py-4 text-gray-600">{c.city}</td>
                <td className="px-6 py-4 text-gray-600">{c.ordersCount} orders</td>
                <td className="px-6 py-4 font-bold text-[#9A7A2E]">
                  {formatLKR(c.totalSpent)}
                </td>
                <td className="px-6 py-4 text-gray-400">{c.lastOrder}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={`https://wa.me/+94${c.phone.replace(/[^0-9]/g, "").slice(-9)}?text=Hello%20${encodeURIComponent(c.name)}%2C%20greetings%20from%201st%20Class%20Creative!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs font-semibold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
