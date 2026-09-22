import Image from "next/image";
import { ArrowRight, Building2, HeartPulse, Mail, MapPin, MessageCircle, Phone, Shirt, Sparkles } from "lucide-react";
import { ContactForm } from "./contact-form";
import { primaryWhatsappNumber, secondaryWhatsappNumber, whatsappHref } from "./whatsapp";

const divisions = [
  {
    title: "Lubis Real Estate",
    href: "https://realestate.lubis.org",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    copy: "Property sales, leasing, and investment guidance for clients seeking clarity, documentation, and long-term value.",
    stat: "Real estate"
  },
  {
    title: "Lubis Mental Awareness",
    href: "https://mentalawareness.lubis.org",
    icon: HeartPulse,
    image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=900&q=80",
    copy: "Mental wellbeing education, advocacy, and community support designed to reduce stigma and improve access to helpful resources.",
    stat: "Social impact"
  },
  {
    title: "Lubis Clothing",
    href: "https://clothing.lubis.org",
    icon: Shirt,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
    copy: "Curated fashion essentials, occasion pieces, footwear, accessories, and custom requests for confident everyday style.",
    stat: "Commerce"
  }
];

const values = ["Integrity", "Care", "Excellence", "Access", "Long-term value"];

export default function Home() {
  return (
    <main>
      <section id="top" className="relative min-h-[88svh] overflow-hidden bg-ink text-white md:min-h-[92vh]">
        <Image src="/brand/lubis-hero.png" alt="Lubis leadership across real estate, wellness, and clothing" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(11,23,48,0.96),rgba(11,23,48,0.72)_52%,rgba(11,23,48,0.18))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="shell relative z-10 grid min-h-[88svh] items-center gap-10 pb-16 pt-32 md:min-h-[92vh] lg:grid-cols-[1fr_400px]">
          <div className="max-w-2xl animate-rise">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white"><Sparkles size={15} /> Multi-sector company built for lasting value</p>
            <h1 className="text-[clamp(3rem,8vw,5rem)] font-black leading-[0.95] tracking-normal">Lubis</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/85 md:text-xl">
              Lubis builds trusted ventures in real estate, mental awareness, and clothing, with a focus on quality service, practical value, and community impact.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#divisions" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-strong transition hover:-translate-y-0.5 hover:bg-[#c91125]">
                Explore divisions <ArrowRight size={18} />
              </a>
              <a href={whatsappHref("Hello Lubis, I want to discuss your services.")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-ink">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
          <div className="hidden animate-rise gap-3 lg:grid" style={{ animationDelay: "120ms" }}>
            {divisions.map((division) => {
              const Icon = division.icon;
              return (
                <a key={division.title} href={division.href} className="group grid grid-cols-[48px_1fr_auto] items-center gap-4 rounded-md border border-white/15 bg-white/12 p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/18">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-white text-brand">
                    <Icon size={21} />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-white/55">{division.stat}</span>
                    <span className="mt-1 block font-bold">{division.title}</span>
                  </span>
                  <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="section bg-white">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase text-accent">About Lubis</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink md:text-4xl">One parent brand, three focused paths.</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-700">
            <p>
              Lubis creates dependable services and products that improve daily life: places to live and invest, resources for emotional wellbeing, and clothing that feels refined, accessible, and purposeful.
            </p>
            <p>
              Each division serves a focused audience while sharing the same standards for clear communication, responsible delivery, and long-term customer relationships.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase text-accent">Foundation</p>
            <h2 className="mt-3 text-4xl font-bold text-ink">Built for responsible growth and dependable service.</h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Lubis supports each division with a clear operating standard while allowing every brand to serve its audience with focus and accountability.
            </p>
          </div>
          <div className="grid divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
            {[
              ["Mission", "Build responsible ventures that combine commercial discipline with meaningful service."],
              ["Vision", "Become a trusted multi-sector company known for quality, care, and long-term value."],
              ["Leadership", "Lead each venture with professionalism, transparency, and a strong commitment to customer trust."]
            ].map(([title, copy]) => (
              <article key={title} className="grid gap-3 p-6 md:grid-cols-[150px_1fr] md:gap-8">
                <h3 className="text-lg font-bold text-ink">{title}</h3>
                <p className="leading-7 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="divisions" className="section bg-white">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-accent">Divisions</p>
            <h2 className="mt-3 text-3xl font-black text-ink md:text-4xl">Focused brands serving distinct customer needs.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {divisions.map((division) => {
              const Icon = division.icon;
              return (
                <a key={division.title} href={division.href} className="card lift group block overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image src={division.image} alt={division.title} width={900} height={540} className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ink shadow-soft">{division.stat}</span>
                  </div>
                  <div className="p-7">
                    <span className="icon-badge">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-5 text-2xl font-bold text-ink">{division.title}</h3>
                    <p className="mt-4 min-h-24 leading-7 text-slate-600">{division.copy}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-semibold text-accent">
                      Visit platform <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-ink text-white">
        <div className="shell grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-gold">Core values</p>
            <h2 className="mt-3 text-4xl font-bold">The standards behind every Lubis brand.</h2>
            <p className="mt-5 leading-8 text-white/70">
              These principles guide how Lubis communicates, serves customers, supports communities, and builds trust across sectors.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value} className="flex items-center gap-3 rounded-md border border-white/12 bg-white/5 px-4 py-4">
                <span className="h-2 w-2 rounded-full bg-gold" />
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="section bg-white">
        <div className="shell grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Image src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80" alt="Professional office space for Lubis media" width={900} height={506} className="h-full max-h-[430px] rounded-md object-cover" />
          <div className="self-center">
            <p className="text-sm font-bold uppercase text-accent">Gallery</p>
            <h2 className="mt-3 text-4xl font-bold text-ink">Company highlights and brand moments.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Explore selected moments from Lubis ventures, including property work, community programs, clothing campaigns, partnerships, and company milestones.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="section bg-slate-50">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase text-accent">Contact</p>
            <h2 className="mt-3 text-3xl font-black text-ink md:text-4xl">Start a conversation with Lubis.</h2>
            <div className="mt-8 space-y-4 text-slate-700">
              <p className="flex items-center gap-3"><Phone size={18} /> +{primaryWhatsappNumber} / +{secondaryWhatsappNumber}</p>
              <p className="flex items-center gap-3"><Mail size={18} /> hello@lubis.org</p>
              <p className="flex items-center gap-3"><MapPin size={18} /> Lagos, Nigeria</p>
            </div>
            <a href={whatsappHref("Hello Lubis, I want to start a conversation.")} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 font-bold text-white shadow-soft transition hover:-translate-y-0.5">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
          <ContactForm />
        </div>
      </section>
      <a href={whatsappHref("Hello Lubis, I want to make an inquiry.")} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-strong transition hover:-translate-y-0.5 md:hidden" aria-label="Open WhatsApp chat">
        <MessageCircle size={22} />
      </a>
    </main>
  );
}
