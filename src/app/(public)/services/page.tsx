import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | 1st Class Creative",
  description:
    "Explore our handcrafted services: resin creations, personalised keychains, bespoke wedding invitations and elegant cake boxes. Custom orders welcome.",
};

const services = [
  {
    id: "resin-creations",
    title: "Resin Creations",
    emoji: "✨",
    tagline: "Unique art that captures your story in crystal-clear resin",
    desc: "Our resin creations range from ocean-themed coasters and decorative wall panels to one-of-a-kind art pieces. Each item is mixed, poured and finished by hand using premium pigments, glitters and inclusions.",
    image: "/485184284_1103127648493148_4472142601649408182_n.jpg",
    includes: [
      "Resin coasters & trays",
      "Wall art panels",
      "Decorative pieces",
      "Custom colour themes",
      "Personalized inclusions (flowers, shells, etc.)",
    ],
    href: "/portfolio?cat=resin-creations",
    whatsapp: "I%27m%20interested%20in%20a%20custom%20resin%20creation.",
  },
  {
    id: "keychains",
    title: "Resin Keychains",
    emoji: "🔑",
    tagline: "Carry your name — and your personality — everywhere",
    desc: "Our personalised resin keychains are crafted with hand-poured resin, embedded glitter and custom name lettering. Available in letters, hearts, custom shapes and more — perfect as gifts or party favours.",
    image: "/542752181_1238639424941969_1583669488507158905_n.jpg",
    includes: [
      "Letter & initial keychains",
      "Heart & star shapes",
      "Custom glitter colours",
      "Name engraving / printing",
      "Bulk orders for events & bridal parties",
    ],
    href: "/portfolio?cat=keychains",
    whatsapp: "I%27m%20interested%20in%20personalised%20resin%20keychains.",
  },
  {
    id: "wedding-invitations",
    title: "Wedding Invitations",
    emoji: "💌",
    tagline: "Set the tone for your big day with stunning stationery",
    desc: "Our custom wedding invitations are designed and printed to your exact specifications. From elegant foil finishes to romantic floral themes, we craft each invitation set to reflect your unique love story.",
    image: "/468396156_2478270609044241_1138043242894587302_n.jpg",
    includes: [
      "Custom design & printing",
      "Envelope sets",
      "Name tags & place cards",
      "Thank-you cards",
      "Bulk quantities available",
    ],
    href: "/portfolio?cat=wedding-invitations",
    whatsapp: "I%27m%20interested%20in%20custom%20wedding%20invitations.",
  },
  {
    id: "cake-boxes",
    title: "Cake Boxes",
    emoji: "🎂",
    tagline: "Beautiful packaging that's as special as what's inside",
    desc: "Our handcrafted cake boxes combine elegance with functionality. Decorated with embossed paper, ribbons, floral accents and custom toppers, they transform any cake into a gift-worthy presentation piece.",
    image: "/484074106_1098277412311505_6713907112004454121_n.jpg",
    includes: [
      "Custom sizing",
      "Embossed & decorated exteriors",
      "Ribbon & floral accents",
      "Custom toppers",
      "Wedding, birthday & occasion themes",
    ],
    href: "/portfolio?cat=cake-boxes",
    whatsapp: "I%27m%20interested%20in%20a%20custom%20cake%20box.",
  },
  {
    id: "custom-frames",
    title: "Custom Frames & Memory Boxes",
    emoji: "🖼️",
    tagline: "Preserve your most cherished memories in style",
    desc: "Our custom frames and memory shadow boxes are decorated with handcrafted resin elements, florals, lights and personalised text. Perfect for anniversaries, weddings and milestone celebrations.",
    image: "/557802403_1265990468873531_7381377988699630798_n.jpg",
    includes: [
      "Photo shadow boxes",
      "Illuminated memory frames",
      "Resin number/letter accents",
      "Floral & ribbon decorations",
      "Personalised occasion messages",
    ],
    href: "/portfolio?cat=custom-frames",
    whatsapp: "I%27m%20interested%20in%20a%20custom%20frame%20or%20memory%20box.",
  },
];

const process = [
  { step: "01", title: "Enquire", desc: "Message us on WhatsApp or fill in our contact form with your idea." },
  { step: "02", title: "Consult", desc: "We discuss your vision, colour preferences, occasion and timeline." },
  { step: "03", title: "Craft", desc: "Your piece is handmade with care using premium materials." },
  { step: "04", title: "Deliver", desc: "We safely package and deliver your creation to your door." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative pt-32 pb-20 bg-gradient-to-br from-brand-charcoal to-brand-charcoal-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/485912821_1104266158379297_7626713888688372280_n.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">✦ What We Offer</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white">Our Services</h1>
          <div className="gold-divider" />
          <p className="text-gray-300 text-lg">
            Every creation is made to order — handcrafted with premium materials and personalised for you.
          </p>
        </div>
      </div>

      {/* Services */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {services.map(({ id, title, emoji, tagline, desc, image, includes, href, whatsapp }, i) => (
            <div
              key={id}
              className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card-hover">
                  <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              </div>
              {/* Content */}
              <div className="w-full lg:w-1/2">
                <span className="text-4xl">{emoji}</span>
                <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mt-3 mb-2">{tagline}</p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">{title}</h2>
                <p className="text-gray-500 leading-relaxed mb-6">{desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link href={href} className="btn-primary">
                    View Examples <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`https://wa.me/94740388788?text=Hello%2C%20${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <MessageCircle className="w-4 h-4" /> Enquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-brand-champagne">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading section-heading-center">How It Works</h2>
            <div className="gold-divider" />
            <p className="text-gray-500 mt-2">From your idea to your doorstep in four simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-7 text-center shadow-card relative overflow-hidden">
                <span className="absolute -top-4 -left-4 text-8xl font-bold font-heading text-brand-champagne leading-none select-none">
                  {step}
                </span>
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-brand-gold/10 border-2 border-brand-gold text-brand-gold font-bold font-heading text-xl flex items-center justify-center mx-auto mb-5">
                    {step}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-charcoal text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-white mb-4">Ready to Create Something Special?</h2>
          <p className="text-gray-300 text-lg mb-8">Contact us today and let's bring your vision to life.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">Get a Quote</Link>
            <a href="https://wa.me/94740388788" target="_blank" rel="noopener noreferrer"
              className="btn-secondary border-white text-white hover:bg-white hover:text-brand-charcoal">
              <MessageCircle className="w-5 h-5" /> WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
