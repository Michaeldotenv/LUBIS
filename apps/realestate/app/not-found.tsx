import Link from "next/link";
import { Building2, Home, MessageCircle } from "lucide-react";
import { whatsappHref } from "./whatsapp";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#10243d] pt-[72px] text-white">
      <div className="absolute inset-0 bg-[url('/brand/realestate-hero.png')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#10243d] via-[#10243d]/88 to-[#0b47a1]/64" />
      <section className="shell relative flex min-h-[calc(100vh-72px)] items-center py-16">
        <div className="max-w-2xl animate-rise">
          <p className="mb-4 inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/82">
            404
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">This property page is not available.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
            The listing may have changed or the page link may be incomplete. View available properties or speak with our real estate team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/properties" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#10243d] transition hover:-translate-y-0.5">
              <Building2 size={18} />
              View properties
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/16">
              <Home size={18} />
              Return home
            </Link>
            <a
              href={whatsappHref("Hello Lubis Real Estate, I need help with a property inquiry.")}
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
