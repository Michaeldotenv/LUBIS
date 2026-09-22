import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { ProductCatalogue } from "../../components/product-catalogue";
import { customRequestMessage, whatsappHref } from "../../components/whatsapp";
import { categoriesList, products } from "../data";

export default async function ProductsPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  const initialCategory = params?.category && categoriesList.includes(params.category) ? params.category : "All";

  return (
    <main>
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white">
        <Image src="/brand/clothing-hero.png" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(17,24,39,0.96),rgba(17,24,39,0.78)_55%,rgba(17,24,39,0.36))]" />
        <div className="shell relative z-10">
          <Link href="/" className="text-sm font-semibold text-white/75">Lubis Clothing</Link>
          <h1 className="mt-6 text-[clamp(2.35rem,7vw,4.25rem)] font-black leading-tight">Shop Lubis Clothing collections.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/75">Explore curated fashion pieces across structured workwear, occasion styles, weekend essentials, shoes, and accessories.</p>
        </div>
      </section>
      <ProductCatalogue products={products} categories={categoriesList} initialCategory={initialCategory} />
      <section className="section bg-blush">
        <div className="shell card grid items-center gap-6 p-7 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-bold uppercase text-accent">Personal sourcing</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">Need a specific style or size?</h2>
            <p className="mt-3 leading-7 text-slate-600">Message Lubis Clothing on WhatsApp with your preferred colour, fabric, size, occasion, and budget.</p>
          </div>
          <a href={whatsappHref(customRequestMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white">
            <MessageCircle size={18} /> Message on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
