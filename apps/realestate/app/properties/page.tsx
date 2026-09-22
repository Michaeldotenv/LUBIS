import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { properties } from "../data";
import { whatsappHref } from "../whatsapp";

export default function PropertiesPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white">
        <Image src="/brand/realestate-hero.png" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(16,36,61,0.96),rgba(16,36,61,0.78)_55%,rgba(16,36,61,0.34))]" />
        <div className="shell relative z-10">
          <Link href="/" className="text-sm font-semibold text-white/70">Lubis Real Estate</Link>
          <h1 className="mt-6 text-[clamp(2.6rem,8vw,4.5rem)] font-black leading-tight">Curated property listings</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">Explore selected residential, land, and investment opportunities with support from the Lubis Real Estate team.</p>
          <a href={whatsappHref("Hello Lubis Real Estate, I want help choosing a property from the listings.")} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 font-bold text-white shadow-strong transition hover:-translate-y-0.5">
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
        </div>
      </section>
      <section className="section">
        <div className="shell grid gap-6 md:grid-cols-3">
          {properties.map((property) => (
            <article key={property.slug} className="card lift overflow-hidden">
              <Link href={`/properties/${property.slug}`} className="block">
                <Image src={property.image} alt={property.title} width={680} height={383} className="h-52 w-full object-cover" />
                <div className="p-6">
                  <p className="flex items-center gap-2 text-sm font-bold text-accent"><MapPin size={15} /> {property.location}</p>
                  <h2 className="mt-3 text-2xl font-bold">{property.title}</h2>
                  <p className="mt-3 text-slate-600">{property.summary}</p>
                  <p className="mt-4 font-bold">{property.price}</p>
                </div>
              </Link>
              <div className="px-6 pb-6">
                <a href={whatsappHref(`Hello Lubis Real Estate, I want to ask about ${property.title} in ${property.location}.`)} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink px-4 py-3 text-sm font-bold text-ink transition hover:bg-ink hover:text-white">
                  <MessageCircle size={17} /> Ask about this property
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <a href={whatsappHref("Hello Lubis Real Estate, I want to make a property inquiry.")} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-strong transition hover:-translate-y-0.5 md:hidden" aria-label="Open WhatsApp chat">
        <MessageCircle size={22} />
      </a>
    </main>
  );
}
