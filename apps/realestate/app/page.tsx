import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Home, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { InquiryForm } from "./inquiry-form";
import { properties } from "./data";
import { primaryWhatsappNumber, secondaryWhatsappNumber, whatsappHref } from "./whatsapp";

export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-[88svh] overflow-hidden bg-ink text-white md:min-h-[92vh]">
        <Image src="/brand/realestate-hero.png" alt="Lubis real estate" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(16,36,61,0.96),rgba(16,36,61,0.72)_52%,rgba(16,36,61,0.16))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="shell relative z-10 flex min-h-[88svh] items-center pb-16 pt-32 md:min-h-[92vh]">
          <div className="max-w-[680px] animate-rise">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
              <Building2 size={16} /> Real estate by Lubis
            </p>
            <h1 className="text-[clamp(2.25rem,5.6vw,4.25rem)] font-black leading-[1.04] tracking-normal">Real estate guidance for confident property decisions.</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/85 md:text-xl">
              Buy, lease, sell, or invest with a property team focused on clear documentation, practical advice, and long-term value.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/properties" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-strong transition hover:-translate-y-0.5 hover:bg-[#c91125]">
                View listings <ArrowRight size={18} />
              </Link>
              <a href={whatsappHref("Hello Lubis Real Estate, I want help finding a property.")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-ink">
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-white/78">
              <Phone size={16} /> +{primaryWhatsappNumber} / +{secondaryWhatsappNumber}
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="shell">
          <h2 className="text-4xl font-bold">Professional real estate services</h2>
          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {[
              ["Sales and leasing", "Property search, negotiation support, and closing coordination for buyers, tenants, landlords, and sellers.", Home],
              ["Investment guidance", "Location review, market perspective, and practical acquisition support for property investors.", ShieldCheck],
              ["Property marketing", "Listing preparation, presentation guidance, and buyer inquiry management for market-ready properties.", MapPin]
            ].map(([title, copy, Icon]) => (
              <article key={title as string} className="card lift p-7">
                <span className="icon-badge">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-xl font-bold">{title as string}</h3>
                <p className="mt-3 leading-7 text-slate-600">{copy as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="shell">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase text-accent">Featured</p>
              <h2 className="mt-2 text-4xl font-bold">Featured property opportunities</h2>
            </div>
            <Link href="/properties" className="inline-flex items-center gap-2 font-bold text-accent">
              All properties <ArrowRight size={17} />
            </Link>
          </div>
          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {properties.map((property) => (
              <article key={property.slug} className="card lift overflow-hidden">
                <Link href={`/properties/${property.slug}`} className="block">
                <Image src={property.image} alt={property.title} width={600} height={338} className="h-52 w-full object-cover" />
                <div className="p-6">
                  <p className="text-sm font-bold text-accent">{property.location}</p>
                  <h3 className="mt-2 text-xl font-bold">{property.title}</h3>
                  <p className="mt-2 text-slate-600">{property.price}</p>
                </div>
                </Link>
                <div className="px-6 pb-6">
                  <a href={whatsappHref(`Hello Lubis Real Estate, I want to ask about ${property.title} in ${property.location}.`)} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 py-3 text-sm font-bold text-white">
                    <MessageCircle size={17} /> Ask on WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry" className="section bg-slate-100">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase text-accent">Inquiry</p>
            <h2 className="mt-2 text-4xl font-bold">Tell us about your property needs.</h2>
            <p className="mt-5 leading-8 text-slate-600">Send an inquiry for property search support, inspection scheduling, availability checks, sales, leasing, or investment guidance.</p>
            <a href={whatsappHref("Hello Lubis Real Estate, I want to schedule a property conversation.")} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 font-bold text-white shadow-soft transition hover:-translate-y-0.5">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
          <InquiryForm />
        </div>
      </section>
      <a href={whatsappHref("Hello Lubis Real Estate, I want to make a property inquiry.")} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-strong transition hover:-translate-y-0.5 md:hidden" aria-label="Open WhatsApp chat">
        <MessageCircle size={22} />
      </a>
    </main>
  );
}
