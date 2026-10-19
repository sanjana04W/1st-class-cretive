"use client";

import { useState } from "react";
import {
  Shield,
  ShieldCheck,
  Plus,
  Search,
  Eye,
  Power,
  Edit2,
  Trash2,
  Check,
  X,
  UserCheck,
  Crown,
  User,
  LayoutDashboard,
  ShoppingBag,
  Package,
  MessageSquare,
  Users,
  BarChart2,
  Settings,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";

// ── Types ────────────────────────────────────────────────────────────────────

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "SUPER ADMIN" | "STAFF";
  status: "ACTIVE" | "INACTIVE";
  permissions: string[];
}

export interface CustomerAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  lastOrder: string;
}

// ── Initial Mock Data Matching Screenshot 1 ──────────────────────────────────

const INITIAL_STAFF: StaffMember[] = [
  {
    id: "staff-1",
    name: "1st Class Owner",
    email: "owner@1stclasscreative.lk",
    avatar: "1st",
    role: "SUPER ADMIN",
    status: "ACTIVE",
    permissions: ["all"],
  },
  {
    id: "staff-2",
    name: "Kasun Perera",
    email: "kasun@1stclasscreative.lk",
    avatar: "K",
    role: "STAFF",
    status: "ACTIVE",
    permissions: [
      "dash_view",
      "orders_view",
      "orders_status",
      "orders_whatsapp",
      "stock_manage",
      "prod_view",
      "msg_view",
      "msg_reply",
    ],
  },
  {
    id: "staff-3",
    name: "Nadeesha Fernando",
    email: "nadeesha@1stclasscreative.lk",
    avatar: "N",
    role: "STAFF",
    status: "ACTIVE",
    permissions: [
      "dash_view",
      "orders_view",
      "orders_status",
      "orders_whatsapp",
      "stock_manage",
      "prod_view",
      "msg_view",
      "msg_reply",
    ],
  },
];

const INITIAL_CUSTOMERS: CustomerAccount[] = [
  {
    id: "cust-1",
    name: "wenuri",
    email: "wenuris2004@gmail.com",
    phone: "0701442569",
    city: "Colombo",
    ordersCount: 2,
    totalSpent: 16700,
    lastOrder: "16 Oct 2026",
  },
  {
    id: "cust-2",
    name: "Anushka Senanayake",
    email: "anushka@example.lk",
    phone: "0771234567",
    city: "Colombo",
    ordersCount: 1,
    totalSpent: 6150,
    lastOrder: "16 Oct 2026",
  },
  {
    id: "cust-3",
    name: "Rohan De Silva",
    email: "rohan@example.lk",
    phone: "0719876543",
    city: "Gampaha",
    ordersCount: 1,
    totalSpent: 7600,
    lastOrder: "16 Oct 2026",
  },
  {
    id: "cust-4",
    name: "Dilini Jayawardena",
    email: "dilini@example.lk",
    phone: "0765432109",
    city: "Kandy",
    ordersCount: 1,
    totalSpent: 8950,
    lastOrder: "15 Oct 2026",
  },
  {
    id: "cust-5",
    name: "Chamika Dilshan",
    email: "chamika.d@gmail.com",
    phone: "0778122331",
    city: "Gampaha",
    ordersCount: 2,
    totalSpent: 21500,
    lastOrder: "14 Oct 2026",
  },
];

// ── Permission Definitions Matching Screenshots 2, 3 & 4 ──────────────────────

interface PermissionItem {
  id: string;
  label: string;
}

interface PermissionGroup {
  id: string;
  title: string;
  icon: any;
  items: PermissionItem[];
}

const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    id: "dashboard",
    title: "DASHBOARD",
    icon: LayoutDashboard,
    items: [{ id: "dash_view", label: "View Dashboard" }],
  },
  {
    id: "orders",
    title: "ORDERS",
    icon: ShoppingBag,
    items: [
      { id: "orders_view", label: "View Orders" },
      { id: "orders_status", label: "Update Order Status" },
      { id: "orders_whatsapp", label: "Contact Customers via WhatsApp" },
    ],
  },
  {
    id: "products",
    title: "PRODUCTS & INVENTORY",
    icon: Package,
    items: [
      { id: "stock_manage", label: "Manage Stock & Inventory" },
      { id: "prod_view", label: "View Products" },
      { id: "prod_add", label: "Add New Products" },
      { id: "prod_edit", label: "Edit Existing Products" },
      { id: "prod_delete", label: "Delete Products" },
    ],
  },
  {
    id: "messages",
    title: "MESSAGES",
    icon: MessageSquare,
    items: [
      { id: "msg_view", label: "View Messages" },
      { id: "msg_reply", label: "Reply to Customer Inquiries" },
    ],
  },
  {
    id: "customers",
    title: "CUSTOMERS",
    icon: Users,
    items: [{ id: "cust_view", label: "View Customer Profiles" }],
  },
  {
    id: "analytics",
    title: "ANALYTICS",
    icon: BarChart2,
    items: [
      { id: "analytics_revenue", label: "View Analytics & Revenue" },
      { id: "analytics_reports", label: "View Sales Reports" },
    ],
  },
  {
    id: "settings",
    title: "SETTINGS",
    icon: Settings,
    items: [
      { id: "settings_system", label: "System Settings" },
      { id: "settings_promos", label: "Promotions & Discounts" },
      { id: "settings_audit", label: "Audit Logs" },
      { id: "settings_users", label: "User Management" },
    ],
  },
];

const ALL_PERMISSION_IDS = PERMISSION_GROUPS.flatMap((g) => g.items.map((i) => i.id));
const DEFAULT_STAFF_PERMISSION_IDS = [
  "dash_view",
  "orders_view",
  "orders_status",
  "orders_whatsapp",
  "stock_manage",
  "prod_view",
  "msg_view",
  "msg_reply",
];

export default function AdminUserManagementPage() {
  const [activeTab, setActiveTab] = useState<"staff" | "customers">("staff");
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);
  const [customerList] = useState<CustomerAccount[]>(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [formRole, setFormRole] = useState<"SUPER ADMIN" | "STAFF">("STAFF");
  const [formPermissions, setFormPermissions] = useState<string[]>(DEFAULT_STAFF_PERMISSION_IDS);

  // ── Open Add Modal ──
  const handleOpenAddModal = () => {
    setEditingStaff(null);
    setFormName("");
    setFormEmail("");
    setFormStatus("ACTIVE");
    setFormRole("STAFF");
    setFormPermissions(DEFAULT_STAFF_PERMISSION_IDS);
    setShowModal(true);
  };

  // ── Open Edit Modal ──
  const handleOpenEditModal = (staff: StaffMember) => {
    setEditingStaff(staff);
    setFormName(staff.name);
    setFormEmail(staff.email);
    setFormStatus(staff.status);
    setFormRole(staff.role);
    setFormPermissions(staff.permissions.includes("all") ? ALL_PERMISSION_IDS : staff.permissions);
    setShowModal(true);
  };

  // ── Toggle Power Status ──
  const handleToggleStatus = (id: string) => {
    setStaffList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newStatus = s.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
          toast.success(`${s.name} account set to ${newStatus}`);
          return { ...s, status: newStatus };
        }
        return s;
      })
    );
  };

  // ── Delete Staff ──
  const handleDeleteStaff = (id: string) => {
    const target = staffList.find((s) => s.id === id);
    if (target?.role === "SUPER ADMIN") {
      toast.error("Cannot delete Super Admin account.");
      return;
    }
    setStaffList((prev) => prev.filter((s) => s.id !== id));
    toast.success("Staff profile removed");
  };

  // ── Role Select Helper ──
  const handleSelectRole = (role: "SUPER ADMIN" | "STAFF") => {
    setFormRole(role);
    if (role === "SUPER ADMIN") {
      setFormPermissions(ALL_PERMISSION_IDS);
    } else {
      setFormPermissions(DEFAULT_STAFF_PERMISSION_IDS);
    }
  };

  // ── Checkbox Toggle ──
  const handleTogglePermission = (permId: string) => {
    setFormPermissions((prev) =>
      prev.includes(permId) ? prev.filter((id) => id !== permId) : [...prev, permId]
    );
  };

  // ── Select / Clear All ──
  const handleSelectAll = () => setFormPermissions(ALL_PERMISSION_IDS);
  const handleClearAll = () => setFormPermissions([]);

  // ── Save Form ──
  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      toast.error("Please provide both name and email.");
      return;
    }

    const permsToSave = formRole === "SUPER ADMIN" ? ["all"] : formPermissions;

    if (editingStaff) {
      setStaffList((prev) =>
        prev.map((s) =>
          s.id === editingStaff.id
            ? {
                ...s,
                name: formName,
                email: formEmail,
                status: formStatus,
                role: formRole,
                permissions: permsToSave,
              }
            : s
        )
      );
      toast.success("Staff member updated successfully!");
    } else {
      const newStaff: StaffMember = {
        id: `staff-${Date.now()}`,
        name: formName,
        email: formEmail,
        avatar: formName.trim().charAt(0).toUpperCase(),
        role: formRole,
        status: formStatus,
        permissions: permsToSave,
      };
      setStaffList((prev) => [...prev, newStaff]);
      toast.success("New staff member created successfully!");
    }

    setShowModal(false);
  };

  // ── Filters ──
  const filteredStaff = staffList.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    return !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
  });

  const filteredCustomers = customerList.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.city.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Card Matching Screenshot 1 */}
      <div className="bg-white rounded-2xl border border-[#E9DFCE] p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF3E0] border border-[#DEC47F] flex items-center justify-center shrink-0 text-[#9A7A2E]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-heading font-serif text-2xl font-bold text-brand-charcoal">
              Backend Staff Profiles
            </h1>
            <p className="text-xs text-gray-500 mt-1 max-w-2xl leading-relaxed">
              Manage Role-Based Access Control (RBAC) permissions & staff logins.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#9A7A2E] text-white text-xs font-bold hover:bg-[#856722] transition-colors shrink-0 shadow-2xs uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Tabs Row Matching Screenshot 1 */}
      <div className="flex items-center gap-3 border-b border-[#EFECE6] pb-3">
        <button
          onClick={() => setActiveTab("staff")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "staff"
              ? "bg-[#FAF3E0] text-[#8C6D27] border border-[#DEC47F] shadow-2xs"
              : "text-gray-500 hover:text-brand-charcoal hover:bg-white"
          }`}
        >
          Staff & Access Roles ({staffList.length})
        </button>
        <button
          onClick={() => setActiveTab("customers")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "customers"
              ? "bg-[#FAF3E0] text-[#8C6D27] border border-[#DEC47F] shadow-2xs"
              : "text-gray-500 hover:text-brand-charcoal hover:bg-white"
          }`}
        >
          Customer Accounts ({customerList.length})
        </button>
      </div>

      {/* Search and Counts Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative min-w-[260px] md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === "staff"
                ? "Search staff by name or email..."
                : "Search customers by name, phone, email..."
            }
            className="w-full pl-9 pr-4 py-2 rounded-full border border-[#EFECE6] bg-white text-xs focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal placeholder-gray-400"
          />
        </div>

        <p className="text-xs font-medium text-gray-400">
          Showing {activeTab === "staff" ? filteredStaff.length : filteredCustomers.length} {activeTab === "staff" ? "members" : "customers"}
        </p>
      </div>

      {/* Table Section */}
      {activeTab === "staff" ? (
        /* Staff Table Matching Screenshot 1 */
        <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EFECE6] bg-[#FAF9F5] text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-5">MEMBER</th>
                  <th className="py-3.5 px-5">ROLE</th>
                  <th className="py-3.5 px-5">PERMISSIONS</th>
                  <th className="py-3.5 px-5 text-center">STATUS</th>
                  <th className="py-3.5 px-5 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6] text-xs">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-[#FAF9F5] transition-colors">
                    {/* Member details */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            staff.role === "SUPER ADMIN"
                              ? "bg-[#9A7A2E] text-white shadow-2xs"
                              : "bg-[#2C2C2C] text-white"
                          }`}
                        >
                          {staff.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-brand-charcoal text-xs">{staff.name}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{staff.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role badge */}
                    <td className="py-4 px-5">
                      {staff.role === "SUPER ADMIN" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                          <Crown className="w-3.5 h-3.5 text-amber-600" />
                          <span>SUPER ADMIN</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                          <User className="w-3.5 h-3.5 text-blue-600" />
                          <span>STAFF</span>
                        </span>
                      )}
                    </td>

                    {/* Permissions summary */}
                    <td className="py-4 px-5">
                      {staff.permissions.includes("all") ? (
                        <span className="font-semibold text-gray-700">All permissions</span>
                      ) : (
                        <div>
                          <p className="font-bold text-gray-800">
                            {staff.permissions.length} permissions
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            Dashboard, Orders, Stock, Messages
                          </p>
                        </div>
                      )}
                    </td>

                    {/* Status pill */}
                    <td className="py-4 px-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          staff.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>{staff.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-400">
                        {/* View */}
                        <button
                          onClick={() => handleOpenEditModal(staff)}
                          className="p-1 hover:text-brand-charcoal transition-colors"
                          title="View Permissions"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Power toggle */}
                        <button
                          onClick={() => handleToggleStatus(staff.id)}
                          className={`p-1 transition-colors ${
                            staff.status === "ACTIVE"
                              ? "hover:text-emerald-600"
                              : "text-rose-500 hover:text-rose-600"
                          }`}
                          title={staff.status === "ACTIVE" ? "Deactivate Account" : "Activate Account"}
                        >
                          <Power className="w-4 h-4" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => handleOpenEditModal(staff)}
                          className="p-1 hover:text-brand-gold-dark transition-colors"
                          title="Edit Profile"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Delete (if not super admin) */}
                        {staff.role !== "SUPER ADMIN" && (
                          <button
                            onClick={() => handleDeleteStaff(staff.id)}
                            className="p-1 hover:text-rose-600 transition-colors"
                            title="Remove Staff"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Customer Accounts View */
        <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EFECE6] bg-[#FAF9F5] text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-5">CUSTOMER</th>
                  <th className="py-3.5 px-5">CONTACT</th>
                  <th className="py-3.5 px-5">LOCATION</th>
                  <th className="py-3.5 px-5 text-center">ORDERS</th>
                  <th className="py-3.5 px-5">TOTAL SPENT</th>
                  <th className="py-3.5 px-5">LAST ORDER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6] text-xs">
                {filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-[#FAF9F5] transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FAF3E0] text-[#9A7A2E] font-bold flex items-center justify-center text-xs shrink-0 border border-[#DEC47F]/40">
                          {cust.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-brand-charcoal text-xs">{cust.name}</p>
                          <p className="text-[11px] text-gray-400">{cust.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 font-mono text-gray-600 text-xs">
                      {cust.phone}
                    </td>

                    <td className="py-4 px-5 font-medium text-gray-700">
                      {cust.city}
                    </td>

                    <td className="py-4 px-5 text-center font-bold tabular-nums text-brand-charcoal">
                      {cust.ordersCount}
                    </td>

                    <td className="py-4 px-5 font-heading font-bold text-sm tabular-nums text-[#8C6D27]">
                      LKR {cust.totalSpent.toLocaleString()}
                    </td>

                    <td className="py-4 px-5 text-gray-500 font-medium text-xs">
                      {cust.lastOrder}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Edit / Add Staff Member Modal Matching Screenshots 2, 3 & 4 ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-[#EFECE6] shadow-2xl overflow-hidden animate-fade-in my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header Matching Screenshot 2 */}
            <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-white shrink-0">
              <div>
                <h3 className="font-heading font-serif text-2xl font-bold text-brand-charcoal">
                  {editingStaff ? "Edit Staff Member" : "Add Staff Member"}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Assign a role and choose individual permissions.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with Custom Scrollbar */}
            <form onSubmit={handleSaveStaff} className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-brand-charcoal text-xs mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Kasun Perera"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFECE6] focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal bg-white shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-charcoal text-xs mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="e.g. staff@1stclasscreative.lk"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFECE6] focus:outline-hidden focus:border-[#9A7A2E] text-brand-charcoal bg-white shadow-2xs"
                  />
                </div>
              </div>

              {/* Account Status Card Matching Screenshot 2 */}
              <div className="p-4 rounded-2xl border border-[#EFECE6] bg-white flex items-center justify-between shadow-2xs">
                <div>
                  <p className="font-bold text-brand-charcoal text-xs">Account Status</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Inactive accounts cannot access the admin panel.
                  </p>
                </div>
                {/* Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setFormStatus((s) => (s === "ACTIVE" ? "INACTIVE" : "ACTIVE"))}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
                    formStatus === "ACTIVE" ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform shadow-xs ${
                      formStatus === "ACTIVE" ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Role Selection Matching Screenshot 2 */}
              <div>
                <label className="block font-bold text-brand-charcoal text-xs mb-2">
                  Role <span className="text-rose-500">*</span>{" "}
                  <span className="font-normal text-gray-400 text-[11px]">
                    — Selecting a role pre-fills recommended permissions
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Staff Card */}
                  <div
                    onClick={() => handleSelectRole("STAFF")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formRole === "STAFF"
                        ? "border-[#DEC47F] bg-[#FAF5E8] ring-1 ring-[#DEC47F]"
                        : "border-[#EFECE6] bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          formRole === "STAFF"
                            ? "border-[#9A7A2E] bg-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {formRole === "STAFF" && (
                          <div className="w-2 h-2 rounded-full bg-[#9A7A2E]" />
                        )}
                      </div>
                      <span className="font-bold text-brand-charcoal text-xs">Staff</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-2 pl-6.5 leading-relaxed">
                      Access to Dashboard, Orders, Stock & Messages only.
                    </p>
                  </div>

                  {/* Super Admin Card */}
                  <div
                    onClick={() => handleSelectRole("SUPER ADMIN")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formRole === "SUPER ADMIN"
                        ? "border-[#DEC47F] bg-[#FAF5E8] ring-1 ring-[#DEC47F]"
                        : "border-[#EFECE6] bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          formRole === "SUPER ADMIN"
                            ? "border-[#9A7A2E] bg-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {formRole === "SUPER ADMIN" && (
                          <div className="w-2 h-2 rounded-full bg-[#9A7A2E]" />
                        )}
                      </div>
                      <span className="font-bold text-brand-charcoal text-xs">Super Admin</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-2 pl-6.5 leading-relaxed">
                      Full unrestricted access to all features.
                    </p>
                  </div>
                </div>
              </div>

              {/* ACCESS PERMISSIONS Header Matching Screenshot 2 */}
              <div className="pt-2">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h4 className="font-bold text-brand-charcoal uppercase tracking-wider text-[11px]">
                    ACCESS PERMISSIONS
                  </h4>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="font-semibold text-[#8C6D27] hover:underline"
                    >
                      Select All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="font-semibold text-gray-400 hover:text-gray-600 hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Permission Accordion Groups Matching Screenshots 2, 3 & 4 */}
                <div className="space-y-3 mt-3">
                  {PERMISSION_GROUPS.map((group) => {
                    const GroupIcon = group.icon;
                    const groupSelectedCount = group.items.filter((item) =>
                      formPermissions.includes(item.id)
                    ).length;

                    return (
                      <div
                        key={group.id}
                        className="rounded-2xl border border-[#EFECE6] bg-white overflow-hidden shadow-2xs"
                      >
                        {/* Group Header */}
                        <div className="p-3.5 bg-[#FAF9F5] border-b border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GroupIcon className="w-4 h-4 text-[#8C6D27]" />
                            <span className="font-bold text-brand-charcoal text-xs tracking-wider">
                              {group.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-gray-400 font-medium">
                              {groupSelectedCount}/{group.items.length} selected
                            </span>
                            <div className="w-4 h-4 text-[#8C6D27]">
                              <Edit2 className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>

                        {/* Group Items */}
                        <div className="p-3.5 space-y-2.5">
                          {group.items.map((item) => {
                            const isChecked = formPermissions.includes(item.id);

                            return (
                              <label
                                key={item.id}
                                className="flex items-center gap-3 cursor-pointer group select-none"
                              >
                                <div
                                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                                    isChecked
                                      ? "bg-[#9A7A2E] border-[#9A7A2E] text-white"
                                      : "border-gray-300 bg-white group-hover:border-[#9A7A2E]"
                                  }`}
                                >
                                  {isChecked && <Check className="w-3 h-3 stroke-3" />}
                                </div>
                                <input
                                  type="checkbox"
                                  className="hidden"
                                  checked={isChecked}
                                  onChange={() => handleTogglePermission(item.id)}
                                />
                                <span
                                  className={`text-xs ${
                                    isChecked
                                      ? "font-semibold text-brand-charcoal"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {item.label}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer Matching Screenshot 4 */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#9A7A2E] text-white text-xs font-bold hover:bg-[#856722] transition-colors shadow-2xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
