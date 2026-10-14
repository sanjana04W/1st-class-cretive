import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page Not Found | 1st Class Creative" };

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-heading font-bold text-brand-gold/30">404</p>
        <h1 className="font-heading text-3xl font-bold text-brand-charcoal mt-2 mb-4">Page Not Found</h1>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="btn-primary">Go Back Home</Link>
      </div>
    </div>
  );
}
