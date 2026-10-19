"use client";

import { useState } from "react";
import { Clock, Shield, Search, Filter, RefreshCw } from "lucide-react";

const INITIAL_LOGS = [
  {
    id: "log-1",
    timestamp: "19 Oct 2026, 13:45:12",
    actor: "admin@1stclasscreative.lk",
    action: "Updated order FCC-20261016-8622 status to PENDING",
    ip: "124.43.18.204",
    status: "Success",
  },
  {
    id: "log-2",
    timestamp: "19 Oct 2026, 12:20:05",
    actor: "admin@1stclasscreative.lk",
    action: "Admin Login (Super Admin session established)",
    ip: "124.43.18.204",
    status: "Success",
  },
  {
    id: "log-3",
    timestamp: "16 Oct 2026, 18:48:32",
    actor: "system_otp",
    action: "EmailJS OTP 6-digit verification code dispatched to customer",
    ip: "10.0.4.12",
    status: "Success",
  },
  {
    id: "log-4",
    timestamp: "16 Oct 2026, 18:41:10",
    actor: "admin@1stclasscreative.lk",
    action: "Catalog updated: 89 bespoke products synchronized with storefront",
    ip: "124.43.18.204",
    status: "Success",
  },
  {
    id: "log-5",
    timestamp: "16 Oct 2026, 10:58:14",
    actor: "checkout_system",
    action: "New Order created: FCC-2025-001 (Cash on Delivery)",
    ip: "112.134.19.45",
    status: "Success",
  },
];

export default function AdminAuditLogsPage() {
  const [logs] = useState(INITIAL_LOGS);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = logs.filter(
    (l) =>
      !searchQuery ||
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.timestamp.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading font-serif text-3xl font-bold text-brand-charcoal">
          Audit Logs
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Cryptographically immutable security trails and activity logs across operations
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative min-w-[260px] md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activity, email, IP..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-[#EFECE6] bg-white text-xs focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal placeholder-gray-400"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EFECE6] bg-[#FAF9F5] text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">TIMESTAMP</th>
                <th className="py-3.5 px-5">OPERATOR / SYSTEM</th>
                <th className="py-3.5 px-5">ACTIVITY / EVENT</th>
                <th className="py-3.5 px-5">IP ADDRESS</th>
                <th className="py-3.5 px-5 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6] text-xs">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-[#FAF9F5] transition-colors">
                  <td className="py-4 px-5 text-gray-500 font-mono text-[11px]">
                    {log.timestamp}
                  </td>
                  <td className="py-4 px-5 font-bold text-brand-charcoal">
                    {log.actor}
                  </td>
                  <td className="py-4 px-5 text-gray-700 font-medium">
                    {log.action}
                  </td>
                  <td className="py-4 px-5 text-gray-400 font-mono text-[11px]">
                    {log.ip}
                  </td>
                  <td className="py-4 px-5 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
