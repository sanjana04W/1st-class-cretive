import type { Metadata } from "next";
import "./globals.css";
import ClientToaster from "@/components/ClientToaster";

export const metadata: Metadata = {
  title: {
    default: "1st Class Creative Craft | Resin Creations & Wedding Stationery Sri Lanka",
    template: "%s | 1st Class Creative",
  },
  description:
    "Handcrafted resin creations, personalised keychains, bespoke wedding invitations and elegant cake boxes. Order online or request a custom design. Sri Lanka.",
  keywords: [
    "resin creations Sri Lanka",
    "wedding invitations Sri Lanka",
    "cake boxes Sri Lanka",
    "personalised keychains",
    "custom resin art",
    "1st Class Creative",
    "handmade gifts Sri Lanka",
    "custom frames Sri Lanka",
  ],
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "https://1stclasscreative.lk",
    siteName: "1st Class Creative",
    title: "1st Class Creative | Handcrafted Resin & Wedding Stationery",
    description:
      "Discover handcrafted resin creations, personalised keychains, bespoke wedding invitations and elegant cake boxes from Sri Lanka's premier creative studio.",
    images: [
      {
        url: "/logo.png",
        width: 400,
        height: 400,
        alt: "1st Class Creative Craft logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "1st Class Creative | Resin & Wedding Stationery Sri Lanka",
    description:
      "Handcrafted resin creations, personalised keychains, bespoke wedding invitations and elegant cake boxes.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-brand-cream font-body antialiased">
        {children}
        <ClientToaster />
      </body>
    </html>
  );
}
