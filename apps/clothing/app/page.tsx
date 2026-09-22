import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CreditCard, MessageCircle, PackageCheck, Search, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { CartPanel } from "../components/cart-panel";
import { customRequestMessage, primaryWhatsappNumber, secondaryWhatsappNumber, whatsappHref } from "../components/whatsapp";
import { categoriesList, products } from "./data";

const money = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });
const featuredProducts = products.slice(0, 9);

export default function ClothingHome() {
  return (
    <main>
      <section className="relative min-h-[82svh] overflow-hidden bg-ink text-white md:min-h-[88vh]">
        <Image src="/brand/clothing-hero.png" alt="Lubis clothing storefront" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(17,24,39,0.94),rgba(17,24,39,0.72)_52%,rgba(17,24,39,0.34))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="shell relative z-10 flex min-h-[82svh] items-center pb-16 pt-32 md:min-h-[88vh]">
          <div className="max-w-[660px] animate-rise">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
              <ShoppingBag size={16} /> Online store by Lubis
            </p>
            <h1 className="max-w-3xl text-[clamp(2.25rem,5.6vw,4.25rem)] font-black leading-[1.04] tracking-normal">Clothing for confident everyday presence.</h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/82 md:text-lg">Curated essentials, occasion pieces, footwear, and accessories with easy online ordering and WhatsApp assistance.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-strong transition hover:-translate-y-0.5 hover:bg-[#c91125]">
                Shop products <ArrowRight size={18} />
              </Link>
              <a href={whatsappHref("Hello Lubis Clothing, I want help choosing an outfit.")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-ink">
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-blush">
        <div className="shell grid gap-6 md:grid-cols-3">
          {[
            ["Secure online ordering", "Move from product selection to a clear order summary with a streamlined payment experience.", CreditCard],
            ["WhatsApp assistance", `Speak with Lubis Clothing on +${primaryWhatsappNumber} or +${secondaryWhatsappNumber} for product availability, sizing, colours, and delivery support.`, MessageCircle],
            ["Curated fashion range", "Explore refined selections across tailoring, dresses, denim, footwear, accessories, activewear, and wardrobe essentials.", PackageCheck]
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
      </section>

      <section className="bg-white py-8">
        <div className="shell flex gap-3 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
          {categoriesList.map((category) => (
            <Link key={category} href={`/products?category=${encodeURIComponent(category)}`} className="shrink-0 rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-ink transition hover:border-accent hover:text-accent">
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <div className="shell grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-bold uppercase text-accent"><Sparkles size={16} /> Featured</p>
                <h2 className="mt-2 text-3xl font-black text-ink md:text-4xl">Featured clothing selections</h2>
              </div>
              <Link href="/products" className="inline-flex items-center gap-2 font-bold text-accent">View all <Search size={17} /></Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {featuredProducts.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.slug} className="card lift group block overflow-hidden">
                  <div className="overflow-hidden">
                    <Image src={product.image} alt={product.name} width={600} height={338} className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-bold text-accent">{product.category}</p>
                    <h3 className="mt-2 text-xl font-bold">{product.name}</h3>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="font-bold">{money.format(product.price)}</p>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-blush text-accent transition group-hover:bg-accent group-hover:text-white">
                        <ArrowRight size={17} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <CartPanel />
        </div>
      </section>

      <section className="section bg-ink text-white">
        <div className="shell grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase text-accent"><ShieldCheck size={16} /> Custom request</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Looking for a specific style?</h2>
            <p className="mt-4 max-w-2xl leading-8 text-white/78">Send your preferred style, size, colour, fabric, or reference image on WhatsApp. Lubis Clothing will help confirm availability or recommend the closest suitable option.</p>
          </div>
          <a href={whatsappHref(customRequestMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-strong transition hover:-translate-y-0.5 hover:bg-[#c91125]">
            <MessageCircle size={18} /> Message on WhatsApp
          </a>
        </div>
      </section>
      <a href={whatsappHref("Hello Lubis Clothing, I want to chat about an order.")} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-strong transition hover:-translate-y-0.5 md:hidden" aria-label="Open WhatsApp chat">
        <MessageCircle size={22} />
      </a>
    </main>
  );
}
