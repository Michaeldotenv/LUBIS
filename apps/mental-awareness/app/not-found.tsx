import Link from "next/link";
import { CalendarDays, Home, MessageCircle } from "lucide-react";
import { whatsappHref } from "./whatsapp";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#14213d] pt-[72px] text-white">
      <div className="absolute inset-0 bg-[url('/brand/mental-hero.png')] bg-cover bg-center opacity-38" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#14213d] via-[#14213d]/88 to-[#1f7a8c]/68" />
      <section className="shell relative flex min-h-[calc(100vh-72px)] items-center py-16">
        <div className="max-w-2xl animate-rise">
          <p className="mb-4 inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/82">
            404
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">This resource is not available.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
            The program, event, or page may have moved. Explore current initiatives or contact the Lubis Mental Awareness team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/programs" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#14213d] transition hover:-translate-y-0.5">
              <CalendarDays size={18} />
              View programs
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/16">
              <Home size={18} />
              Return home
            </Link>
            <a
              href={whatsappHref("Hello Lubis Mental Awareness, I need help finding a resource.")}
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
