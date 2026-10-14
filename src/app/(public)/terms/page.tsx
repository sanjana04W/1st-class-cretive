import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions | 1st Class Creative" };

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="font-heading text-4xl font-bold text-brand-charcoal mb-3">Terms & Conditions</h1>
      <p className="text-gray-400 text-sm mb-10">Last updated: October 2026</p>
      <div className="space-y-6 text-gray-600">
        <p>Please read these terms carefully before placing a custom order with 1st Class Creative.</p>
        <h2 className="font-heading text-xl font-bold text-brand-charcoal">Orders & Payment</h2>
        <p>
          All orders are custom-made and require confirmation of design, quantity and price before production begins. A deposit may be required for large or complex orders. Final payment is due on delivery or as agreed.
        </p>
        <h2 className="font-heading text-xl font-bold text-brand-charcoal">Delivery</h2>
        <p>
          Estimated delivery timelines will be confirmed at the time of order. 1st Class Creative is not responsible for delays caused by courier services. We will provide tracking information where available.
        </p>
        <h2 className="font-heading text-xl font-bold text-brand-charcoal">Cancellations & Refunds</h2>
        <p>
          As all items are handmade to order, cancellations are only accepted before production begins. Deposits are non-refundable once work has started. Defective items will be replaced or refunded at our discretion.
        </p>
        <h2 className="font-heading text-xl font-bold text-brand-charcoal">Intellectual Property</h2>
        <p>
          All designs, photos and creative work produced by 1st Class Creative remain our intellectual property. Portfolio images may be used for promotional purposes unless the customer requests otherwise in writing.
        </p>
        <h2 className="font-heading text-xl font-bold text-brand-charcoal">Contact</h2>
        <p>
          For any queries, contact us at <a href="mailto:1stclasscreative97@gmail.com" className="text-brand-gold hover:underline">1stclasscreative97@gmail.com</a> or call 074 038 8788.
        </p>
      </div>
    </div>
  );
}
