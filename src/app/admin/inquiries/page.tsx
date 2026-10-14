"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, Mail, ChevronDown, Search, Filter } from "lucide-react";
import { getInquiries, updateInquiryStatus } from "@/lib/firestore";
import type { Inquiry, InquiryStatus } from "@/types";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const STATUSES: InquiryStatus[] = ["new", "contacted", "quoted", "booked", "completed", "closed"];

const STATUS_COLORS: Record<InquiryStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  quoted: "bg-purple-100 text-purple-700",
  booked: "bg-brand-gold/20 text-brand-gold-dark",
  completed: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const load = async () => {
    setLoading(true);
    const data = await getInquiries(filter !== "all" ? filter : undefined);
    setInquiries(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [filter]);

  const filtered = inquiries.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.phone.includes(search) ||
      i.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    setUpdatingId(id);
    try {
      await updateInquiryStatus(id, status, notes);
      toast.success("Status updated!");
      await load();
      setSelected((prev) => prev ? { ...prev, status } : null);
    } catch {
      toast.error("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-brand-charcoal">Inquiries</h1>
        <p className="text-gray-400 text-sm mt-1">Manage customer enquiries and track their progress.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-card p-4 mb-6 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, phone, email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9 !py-2.5"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-input !py-2.5 !w-auto">
            <option value="all">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={cn("grid gap-6", selected ? "grid-cols-1 lg:grid-cols-5" : "grid-cols-1")}>
        {/* Table */}
        <div className={selected ? "lg:col-span-3" : ""}>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <svg className="animate-spin w-8 h-8 text-brand-gold mx-auto" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                </svg>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-400 text-sm">No inquiries found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                    <tr>
                      <th className="px-5 py-3 text-left">Name</th>
                      <th className="px-5 py-3 text-left">Type</th>
                      <th className="px-5 py-3 text-left">Contact</th>
                      <th className="px-5 py-3 text-left">Status</th>
                      <th className="px-5 py-3 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((inq) => (
                      <tr
                        key={inq.id}
                        onClick={() => { setSelected(inq); setNotes(inq.notes ?? ""); }}
                        className={cn(
                          "cursor-pointer hover:bg-brand-champagne/40 transition-colors",
                          selected?.id === inq.id ? "bg-brand-champagne/60" : ""
                        )}
                      >
                        <td className="px-5 py-3.5 font-medium text-brand-charcoal">{inq.name}</td>
                        <td className="px-5 py-3.5 text-gray-500 capitalize text-xs">{inq.inquiryType?.replace("-", " ")}</td>
                        <td className="px-5 py-3.5 text-gray-500">{inq.phone}</td>
                        <td className="px-5 py-3.5">
                          <span className={cn("status-badge", STATUS_COLORS[inq.status])}>{inq.status}</span>
                        </td>
                        <td className="px-5 py-3.5 text-gray-400 text-xs">
                          {(inq.createdAt as any)?.toDate?.()?.toLocaleDateString?.() ?? "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-heading text-lg font-bold text-brand-charcoal">{selected.name}</h3>
                  <span className={cn("status-badge mt-1", STATUS_COLORS[selected.status])}>{selected.status}</span>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-brand-charcoal text-xs">✕</button>
              </div>

              <div className="space-y-3 mb-6">
                <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-gold">
                  <Phone className="w-4 h-4 text-brand-gold" /> {selected.phone}
                </a>
                {selected.email && (
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-gold">
                    <Mail className="w-4 h-4 text-brand-gold" /> {selected.email}
                  </a>
                )}
                <a
                  href={`https://wa.me/+${selected.phone.replace(/^0/, "94")}?text=Hi%20${encodeURIComponent(selected.name)}%2C%20thank%20you%20for%20your%20enquiry!`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#25D366] hover:underline"
                >
                  <MessageCircle className="w-4 h-4" /> Reply on WhatsApp
                </a>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Message</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selected.message}</p>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Update Status</label>
                <select
                  value={selected.status}
                  onChange={(e) => handleStatusChange(selected.id, e.target.value as InquiryStatus)}
                  disabled={updatingId === selected.id}
                  className="form-input !py-2.5"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Internal Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-input !py-2.5 min-h-[80px] resize-none text-sm"
                  placeholder="Add notes about this inquiry…"
                />
                <button
                  onClick={() => handleStatusChange(selected.id, selected.status)}
                  className="btn-primary w-full justify-center text-sm mt-3"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
