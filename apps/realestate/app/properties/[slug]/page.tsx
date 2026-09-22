import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { properties } from "../../data";
import { whatsappHref } from "../../whatsapp";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);

  if (!property) {
    notFound();
  }

  return (
    <main>
      <section className="relative overflow-hidden bg-ink pb-12 pt-32 text-white">
        <Image src={property.detailImage} alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(16,36,61,0.96),rgba(16,36,61,0.78)_55%,rgba(16,36,61,0.36))]" />
        <div className="shell relative z-10">
          <Link href="/properties" className="text-sm font-semibold text-white/70">Back to listings</Link>
          <h1 className="mt-5 text-[clamp(2.4rem,8vw,4.5rem)] font-black leading-tight">{property.title}</h1>
          <p className="mt-4 text-xl text-white/80">{property.location}</p>
          <a href={whatsappHref(`Hello Lubis Real Estate, I want to inspect or ask about ${property.title} in ${property.location}.`)} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 font-bold text-white shadow-strong transition hover:-translate-y-0.5">
            <MessageCircle size={18} /> Discuss this property
          </a>
        </div>
      </section>
      <section className="section">
        <div className="shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Image src={property.detailImage} alt={property.title} width={900} height={506} className="rounded-md object-cover" />
          <div className="card p-7">
            <p className="text-sm font-bold uppercase text-accent">{property.type}</p>
            <h2 className="mt-3 text-3xl font-bold">{property.price}</h2>
            <p className="mt-5 leading-8 text-slate-600">{property.summary}</p>
            <ul className="mt-6 grid gap-3">
              {property.features.map((feature) => (
                <li key={feature} className="rounded-md bg-slate-100 px-4 py-3 font-semibold">{feature}</li>
              ))}
            </ul>
            <a href={whatsappHref(`Hello Lubis Real Estate, I want to inspect or ask about ${property.title}.`)} target="_blank" rel="noreferrer" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 font-bold text-white">
              <MessageCircle size={18} /> Schedule inspection on WhatsApp
            </a>
          </div>
        </div>
      </section>
      <a href={whatsappHref(`Hello Lubis Real Estate, I want to ask about ${property.title}.`)} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-strong transition hover:-translate-y-0.5 md:hidden" aria-label="Open WhatsApp chat">
        <MessageCircle size={22} />
      </a>
    </main>
  );
}
