import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Product, Inquiry, Promotion, Testimonial, ContactFormData } from "@/types";

// ─── Products ──────────────────────────────────────────────────────────────

export async function getProducts(filters?: {
  category?: string;
  featured?: boolean;
  isNew?: boolean;
  limitCount?: number;
}): Promise<Product[]> {
  const constraints: QueryConstraint[] = [
    where("status", "==", "active"),
    orderBy("displayOrder", "asc"),
  ];

  if (filters?.category && filters.category !== "all") {
    constraints.unshift(where("category", "==", filters.category));
  }
  if (filters?.featured) {
    constraints.unshift(where("featured", "==", true));
  }
  if (filters?.isNew) {
    constraints.unshift(where("isNew", "==", true));
  }
  if (filters?.limitCount) {
    constraints.push(limit(filters.limitCount));
  }

  const q = query(collection(db, "products"), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(collection(db, "products"), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Product;
}

export async function addProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const ref = await addDoc(collection(db, "products"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  await updateDoc(doc(db, "products", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, "products", id));
}

// ─── Inquiries ─────────────────────────────────────────────────────────────

export async function submitInquiry(data: ContactFormData): Promise<string> {
  const ref = await addDoc(collection(db, "inquiries"), {
    ...data,
    status: "new",
    source: "website",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getInquiries(statusFilter?: string): Promise<Inquiry[]> {
  const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
  if (statusFilter && statusFilter !== "all") {
    constraints.unshift(where("status", "==", statusFilter));
  }
  const q = query(collection(db, "inquiries"), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Inquiry));
}

export async function updateInquiryStatus(
  id: string,
  status: string,
  notes?: string
): Promise<void> {
  await updateDoc(doc(db, "inquiries", id), {
    status,
    ...(notes !== undefined ? { notes } : {}),
    updatedAt: serverTimestamp(),
  });
}

// ─── Promotions ────────────────────────────────────────────────────────────

export async function getActivePromotions(): Promise<Promotion[]> {
  const q = query(
    collection(db, "promotions"),
    where("isActive", "==", true),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Promotion));
}

export async function getPromotions(): Promise<Promotion[]> {
  const q = query(collection(db, "promotions"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Promotion));
}

export async function addPromotion(data: Omit<Promotion, "id" | "createdAt">): Promise<string> {
  const ref = await addDoc(collection(db, "promotions"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updatePromotion(id: string, data: Partial<Promotion>): Promise<void> {
  await updateDoc(doc(db, "promotions", id), data);
}

// ─── Testimonials ──────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  const q = query(
    collection(db, "testimonials"),
    where("isVisible", "==", true),
    orderBy("createdAt", "desc"),
    limit(12)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial));
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial));
}

export async function addTestimonial(data: Omit<Testimonial, "id" | "createdAt">): Promise<string> {
  const ref = await addDoc(collection(db, "testimonials"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>): Promise<void> {
  await updateDoc(doc(db, "testimonials", id), data);
}

export async function deleteTestimonial(id: string): Promise<void> {
  await deleteDoc(doc(db, "testimonials", id));
}
