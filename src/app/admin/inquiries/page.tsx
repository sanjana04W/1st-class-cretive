"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  RefreshCw,
  Clock,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle2,
  Check,
  Send,
  X,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";

// ── Types ────────────────────────────────────────────────────────────────────

export interface CustomerInquiry {
  id: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  subject: string;
  message: string;
  timestamp: string;
  status: "New" | "In Progress" | "Resolved";
  notes?: string;
}

// ── Seed Mock Data Matching User's Screenshot ─────────────────────────────────

const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: "inq-1",
    senderName: "Anushka Senanayake",
    senderEmail: "anushka.s@gmail.com",
    senderPhone: "0771234567",
    subject: "Order inquiry - LIL-2025-001",
    message:
      "Hi, I placed an order this morning. Could you confirm when it will be dispatched?",
    timestamp: "3 hours ago",
    status: "New",
    notes: "",
  },
  {
    id: "inq-2",
    senderName: "Rohan De Silva",
    senderEmail: "rohan.desilva@yahoo.com",
    senderPhone: "0719876543",
    subject: "Authenticity & Custom Design Inquiry",
    message:
      "Hello, do you offer bespoke color matching for the resin coaster sets and anniversary frame orders? We have a specific wedding theme palette.",
    timestamp: "12 hours ago",
    status: "In Progress",
    notes: "Spoke on phone, waiting for client wedding swatch photo.",
  },
  {
    id: "inq-3",
    senderName: "Dilini Jayawardena",
    senderEmail: "dilini.j@outlook.com",
    senderPhone: "0765432109",
    subject: "Gift Wrapping Option",
    message:
      "Do you offer luxury gift boxes or special gift wrapping for birthdays? Looking to order personalized keychains for a party of 10.",
    timestamp: "Yesterday",
    status: "Resolved",
    notes: "Sent luxury gift hamper catalog via WhatsApp.",
  },
];

export default function AdminMessagesPage() {
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(INITIAL_INQUIRIES);
  const [selectedId, setSelectedId] = useState<string>("inq-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All Statuses");
  const [internalNote, setInternalNote] = useState("");
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync internal note text with selected inquiry
  useEffect(() => {
    const cur = inquiries.find((i) => i.id === selectedId);
    if (cur) {
      setInternalNote(cur.notes || "");
    }
  }, [selectedId, inquiries]);

  // Selected inquiry object
  const selectedInquiry =
    inquiries.find((i) => i.id === selectedId) || inquiries[0];

  // Counts
  const newCount = inquiries.filter((i) => i.status === "New").length;

  // Status changer
  const handleUpdateStatus = (id: string, newStatus: CustomerInquiry["status"]) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    toast.success(`Inquiry marked as ${newStatus}`);
  };

  // Save notes
  const handleSaveNotes = () => {
    if (!selectedInquiry) return;
    setInquiries((prev) =>
      prev.map((i) => (i.id === selectedInquiry.id ? { ...i, notes: internalNote } : i))
    );
    toast.success("Internal note saved successfully");
  };

  // WhatsApp launcher
  const handleOpenWhatsApp = (inquiry: CustomerInquiry) => {
    let clean = inquiry.senderPhone.replace(/\D/g, "");
    if (clean.startsWith("0")) clean = "94" + clean.slice(1);
    else if (!clean.startsWith("94")) clean = "94" + clean;

    const text = encodeURIComponent(
      `Hello ${inquiry.senderName},\nThis is 1st Class Creative regarding your inquiry: "${inquiry.subject}". How can we assist you today?`
    );
    window.open(`https://wa.me/${clean}?text=${text}`, "_blank");
  };

  // Reply via email submit
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    toast.success(`Reply sent to ${selectedInquiry.senderEmail}!`);
    setShowReplyModal(false);
    setReplyText("");
    handleUpdateStatus(selectedInquiry.id, "In Progress");
  };

  // Refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Messages & inquiries refreshed");
    }, 600);
  };

  // Filter inquiries
  const filtered = inquiries.filter((item) => {
    const matchesStatus =
      statusFilter === "All Statuses" ? true : item.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.senderName.toLowerCase().includes(q) ||
      item.senderEmail.toLowerCase().includes(q) ||
      item.subject.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Matching Screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-serif text-3xl font-bold text-brand-charcoal">
            Messages & Inquiries
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Customer inquiries submitted via the Contact Us form
          </p>
        </div>

        <div className="flex items-center gap-3">
          {newCount > 0 && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {newCount} New
            </span>
          )}

          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#DEC47F] bg-white text-[#8C6D27] text-xs font-bold hover:bg-[#FAF5E8] transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Search & Status Filter Row Matching Screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-2xl">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, subject..."
            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-[#EFECE6] bg-white text-xs focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal placeholder-gray-400 shadow-2xs"
          />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-full border border-[#EFECE6] bg-white text-xs font-semibold text-brand-charcoal focus:outline-hidden focus:border-[#9A7A2E] shadow-2xs cursor-pointer appearance-none pr-8"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Split Two-Column Layout Matching Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Messages List (4 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EFECE6] shadow-2xs overflow-hidden">
          <div className="p-3.5 border-b border-gray-100 bg-[#FAF9F5] flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 tracking-wider">
              {filtered.length} of {inquiries.length} messages
            </span>
          </div>

          <div className="divide-y divide-[#EFECE6]">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400">
                No inquiries found
              </div>
            ) : (
              filtered.map((item) => {
                const isSelected = selectedInquiry?.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#FAF5E8] border-l-4 border-l-[#9A7A2E]"
                        : "hover:bg-gray-50 border-l-4 border-l-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {item.status === "New" && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                        <h4 className="font-bold text-xs text-brand-charcoal truncate">
                          {item.senderName}
                        </h4>
                      </div>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">
                        {item.timestamp}
                      </span>
                    </div>

                    <p className="font-bold text-xs text-[#8C6D27] mt-1 truncate">
                      {item.subject}
                    </p>

                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>

                    <div className="mt-2.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === "New"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : item.status === "In Progress"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Message Detail (7 Cols) */}
        {selectedInquiry ? (
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EFECE6] p-6 sm:p-8 shadow-2xs space-y-6">
            {/* Message Header */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h2 className="font-heading font-serif text-2xl font-bold text-brand-charcoal">
                  {selectedInquiry.subject}
                </h2>
                <div className="flex items-center gap-1 text-[11px] text-gray-400 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedInquiry.timestamp}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 mt-2">
                <span>
                  From: <strong className="text-brand-charcoal">{selectedInquiry.senderName}</strong>
                </span>
                <span>•</span>
                <span className="text-gray-500">{selectedInquiry.senderEmail}</span>
                <span>•</span>
                <span className="font-mono text-gray-600">{selectedInquiry.senderPhone}</span>
              </div>
            </div>

            {/* Message Body Container */}
            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#EFECE6] text-xs text-gray-700 leading-relaxed font-medium">
              {selectedInquiry.message}
            </div>

            {/* Interactive Status Changer Matching Screenshot */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-bold text-brand-charcoal">Status:</span>
              <div className="flex items-center gap-2">
                {(["New", "In Progress", "Resolved"] as CustomerInquiry["status"][]).map(
                  (st) => {
                    const isActive = selectedInquiry.status === st;

                    return (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          isActive
                            ? st === "New"
                              ? "bg-blue-50 text-blue-700 border border-blue-300 ring-2 ring-blue-100"
                              : st === "In Progress"
                              ? "bg-amber-50 text-amber-700 border border-amber-300 ring-2 ring-amber-100"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-300 ring-2 ring-emerald-100"
                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {isActive && <Check className="w-3 h-3" />}
                        <span>{st}</span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Internal Notes Box Matching Screenshot */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-brand-charcoal">
                Internal Notes
              </label>
              <textarea
                rows={3}
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Add private notes about this inquiry..."
                className="w-full p-4 rounded-2xl border border-[#EFECE6] bg-white text-xs focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal placeholder-gray-400 leading-relaxed"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 rounded-xl bg-brand-charcoal text-white text-xs font-bold hover:bg-black transition-colors shadow-2xs"
                >
                  Save Notes
                </button>
              </div>
            </div>

            {/* Bottom Action Bar Matching Screenshot */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
              {/* Reply via Email */}
              <button
                onClick={() => setShowReplyModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#9A7A2E] text-white text-xs font-bold hover:bg-[#856722] transition-colors shadow-2xs"
              >
                <Mail className="w-4 h-4" />
                <span>Reply via Email</span>
              </button>

              {/* Open in WhatsApp */}
              <button
                onClick={() => handleOpenWhatsApp(selectedInquiry)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D9488] text-white text-xs font-bold hover:bg-[#0F766E] transition-colors shadow-2xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </button>

              {/* Mark Resolved */}
              <button
                onClick={() => handleUpdateStatus(selectedInquiry.id, "Resolved")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15803D] text-white text-xs font-bold hover:bg-[#166534] transition-colors shadow-2xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Resolved</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EFECE6] p-12 text-center text-gray-400 text-xs">
            Select an inquiry to view details
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#EFECE6] shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#FAF9F5]">
              <div>
                <h3 className="font-heading font-serif text-lg font-bold text-brand-charcoal">
                  Reply to {selectedInquiry.senderName}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{selectedInquiry.senderEmail}</p>
              </div>
              <button
                onClick={() => setShowReplyModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendReply} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  readOnly
                  value={`Re: ${selectedInquiry.subject}`}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Reply Message</label>
                <textarea
                  rows={5}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response to the customer..."
                  className="w-full p-3.5 rounded-xl border border-[#EFECE6] focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReplyModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#9A7A2E] text-white font-bold hover:bg-[#856722] shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reply</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
