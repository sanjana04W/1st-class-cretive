"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  InboxIcon,
  Images,
  Star,
  Tag,
  TrendingUp,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react";
import { getInquiries } from "@/lib/firestore";
import type { Inquiry } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  quoted: "bg-purple-100 text-purple-700",
  booked: "bg-brand-gold/20 text-brand-gold-dark",
  completed: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

function StatCard({ icon, value, label, sub, color }: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card flex items-start gap-4">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", color)}>
        {icon}
      </div>
      <div>
        <p className="font-heading text-2xl font-bold text-brand-charcoal">{value}</p>
        <p className="text-sm font-medium text-brand-charcoal">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInquiries().then((data) => {
      setInquiries(data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  const newCount = inquiries.filter((i) => i.status === "new").length;
  const bookedCount = inquiries.filter((i) => i.status === "booked").length;
  const completedCount = inquiries.filter((i) => i.status === "completed").length;
  const recent = inquiries.slice(0, 8);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-charcoal">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back! Here's your business overview.</p>
        </div>
        <Link href="/" target="_blank" className="flex items-center gap-2 text-sm text-brand-gold hover:underline">
          <ExternalLink className="w-4 h-4" /> View Website
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={<AlertCircle className="w-6 h-6 text-blue-600" />}
          value={newCount}
          label="New Inquiries"
          sub="Awaiting response"
          color="bg-blue-50"
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-yellow-600" />}
          value={bookedCount}
          label="Active Orders"
          sub="In progress"
          color="bg-yellow-50"
        />
        <StatCard
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          value={completedCount}
          label="Completed"
          sub="This period"
          color="bg-green-50"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-brand-gold" />}
          value={inquiries.length}
          label="Total Inquiries"
          sub="All time"
          color="bg-brand-gold/10"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { href: "/admin/inquiries", icon: <InboxIcon className="w-5 h-5" />, label: "Manage Inquiries", color: "text-blue-600 bg-blue-50" },
          { href: "/admin/portfolio", icon: <Images className="w-5 h-5" />, label: "Portfolio Items", color: "text-purple-600 bg-purple-50" },
          { href: "/admin/testimonials", icon: <Star className="w-5 h-5" />, label: "Testimonials", color: "text-brand-gold bg-brand-gold/10" },
          { href: "/admin/promotions", icon: <Tag className="w-5 h-5" />, label: "Promotions", color: "text-green-600 bg-green-50" },
        ].map(({ href, icon, label, color }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 text-center"
          >
            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3", color)}>
              {icon}
            </div>
            <p className="text-sm font-semibold text-brand-charcoal">{label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-brand-charcoal">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-sm text-brand-gold hover:underline flex items-center gap-1">
            View all <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <svg className="animate-spin w-8 h-8 text-brand-gold mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
            </svg>
          </div>
        ) : recent.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400 text-sm">No inquiries yet. They'll appear here when customers submit the contact form.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Phone</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recent.map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-brand-charcoal">{inq.name}</td>
                    <td className="px-6 py-4 text-gray-500 capitalize">{inq.inquiryType?.replace("-", " ")}</td>
                    <td className="px-6 py-4 text-gray-500">{inq.phone}</td>
                    <td className="px-6 py-4">
                      <span className={cn("status-badge", STATUS_COLORS[inq.status] ?? "bg-gray-100 text-gray-500")}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {inq.createdAt instanceof Date
                        ? inq.createdAt.toLocaleDateString()
                        : (inq.createdAt as any)?.toDate?.()?.toLocaleDateString?.() ?? "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/inquiries`} className="text-brand-gold hover:text-brand-gold-dark flex items-center gap-1 text-xs font-semibold">
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
