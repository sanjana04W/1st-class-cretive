import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Heart, Award, Users, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | 1st Class Creative",
  description:
    "Learn about 1st Class Creative — the story behind Sri Lanka's premier handcrafted resin art, wedding invitations and cake boxes studio.",
};

const stats = [
  { icon: <Heart className="w-6 h-6 text-brand-rose" />, value: "500+", label: "Happy Customers" },
  { icon: <Award className="w-6 h-6 text-brand-gold" />, value: "100%", label: "Handmade Quality" },
  { icon: <Users className="w-6 h-6 text-brand-teal" />, value: "5★", label: "Customer Rating" },
  { icon: <Star className="w-6 h-6 text-brand-gold" />, value: "7+", label: "Years of Craft" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <Image src="/529179520_1214465350692710_3362134301413191237_n.jpg" alt="1st Class Creative craft workspace" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-brand-charcoal/75" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">✦ Our Story</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white">About Us</h1>
          <div className="gold-divider" />
          <p className="text-gray-300 text-lg">
            A passion-driven creative studio turning ideas into handcrafted keepsakes.
          </p>
        </div>
      </div>

      {/* Brand Story */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">Our Journey</p>
              <h2 className="section-heading">The Story Behind<br/>1st Class Creative</h2>
              <div className="w-16 h-1 bg-brand-gold rounded mt-4 mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-brand-charcoal">1st Class Creative</strong> was born from a deep love of handcrafting — the belief that every celebration deserves something truly unique and personal. What started as a passion project has grown into a beloved creative studio trusted by hundreds of customers across Sri Lanka.
                </p>
                <p>
                  We specialize in <strong>resin art</strong>, including shimmering keychains, ocean-themed coasters and custom frames, as well as bespoke <strong>wedding invitations</strong> and beautifully designed <strong>cake boxes</strong> for every occasion.
                </p>
                <p>
                  Every piece that leaves our studio is made by hand with premium materials, genuine care, and an eye for detail that sets our work apart. We believe the things that surround your most meaningful moments should be as beautiful as those moments themselves.
                </p>
                <p>
                  Whether you're celebrating a wedding, anniversary, birthday or simply want a unique keepsake — we're here to make it unforgettable.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <a href="https://www.facebook.com/1stclasscreative/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-brand-charcoal hover:text-brand-gold transition-colors">
                  <Facebook className="w-5 h-5" /> Facebook
                </a>
                <a href="https://www.instagram.com/1st_class_creative_/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-brand-charcoal hover:text-brand-gold transition-colors">
                  <Instagram className="w-5 h-5" /> Instagram
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card-hover">
                <Image src="/484810488_1103650881774158_3999044029988274536_n.jpg" alt="Glitter resin keychain craft" fill className="object-cover" sizes="25vw" />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card-hover mt-8">
                <Image src="/484074106_1098277412311505_6713907112004454121_n.jpg" alt="Golden rose cake box" fill className="object-cover" sizes="25vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-brand-gold">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ icon, value, label }) => (
              <div key={label}>
                <div className="flex justify-center mb-3 text-white/80">{icon}</div>
                <p className="font-heading text-4xl font-bold text-white">{value}</p>
                <p className="text-white/80 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading section-heading-center">Our Values</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: "🎨", title: "Creativity", desc: "We pour imagination into every piece, ensuring each creation is truly one-of-a-kind." },
              { emoji: "💎", title: "Quality", desc: "Only premium materials, careful craftsmanship, and no compromises on finish." },
              { emoji: "❤️", title: "Passion", desc: "We genuinely love what we do — and it shows in every piece we create." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="text-center p-8 rounded-2xl bg-brand-cream border border-brand-champagne shadow-card">
                <span className="text-5xl">{emoji}</span>
                <h3 className="font-heading text-xl font-bold text-brand-charcoal mt-5 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-20 bg-brand-champagne">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading section-heading-center">A Peek at Our Studio</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/542761575_1238637001608878_8607990700312666146_n.jpg",
              "/626581418_1362772269195350_2007381266795301988_n.jpg",
              "/468455143_2478273399043962_6736575115530202270_n.jpg",
              "/486374725_1107174841421762_6927538140018557104_n.jpg",
            ].map((src, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                <Image src={src} alt={`Studio creation ${i + 1}`} fill className="object-cover" sizes="25vw" />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/portfolio" className="btn-primary">View Full Collection</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-charcoal text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-white mb-4">
            Let's Create Something <span className="text-brand-gold-light">Beautiful Together</span>
          </h2>
          <p className="text-gray-300 mb-8">Get in touch to discuss your custom creation idea.</p>
          <Link href="/contact" className="btn-primary text-base">Contact Us Today</Link>
        </div>
      </section>
    </>
  );
}
