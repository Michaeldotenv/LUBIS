import Link from "next/link";
import { Home, MessageCircle, ShoppingBag } from "lucide-react";
import { whatsappHref } from "../components/whatsapp";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#171821] pt-[72px] text-white">
      <div className="absolute inset-0 bg-[url('/brand/clothing-hero.png')] bg-cover bg-center opacity-38" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#171821] via-[#171821]/90 to-[#e5172f]/54" />
      <section className="shell relative flex min-h-[calc(100vh-72px)] items-center py-16">
        <div className="max-w-2xl animate-rise">
          <p className="mb-4 inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/82">
            404
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">We could not find that item.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
            The product or page may no longer be available. Browse the current catalogue or chat with Lubis Clothing for a quick recommendation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#171821] transition hover:-translate-y-0.5">
              <ShoppingBag size={18} />
              Shop products
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/16">
              <Home size={18} />
              Return home
            </Link>
            <a
              href={whatsappHref("Hello Lubis Clothing, I need help finding a product.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
