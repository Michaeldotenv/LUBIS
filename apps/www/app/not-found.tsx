import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import { whatsappHref } from "./whatsapp";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink pt-[72px] text-white">
      <div className="absolute inset-0 bg-[url('/brand/lubis-hero.png')] bg-cover bg-center opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/88 to-[#0b47a1]/72" />
      <section className="shell relative flex min-h-[calc(100vh-72px)] items-center py-16">
        <div className="max-w-2xl animate-rise">
          <p className="mb-4 inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/82">
            404
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">This page is not available.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
            The page may have moved, or the link may be incomplete. Continue from the Lubis homepage or contact our team for assistance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-ink transition hover:-translate-y-0.5">
              <Home size={18} />
              Return home
            </Link>
            <a
              href={whatsappHref("Hello Lubis, I need help finding a page on the website.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/16"
            >
              <MessageCircle size={18} />
              Contact support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
