import Image from "next/image";
import { ArrowRight, CalendarDays, HeartHandshake, Library, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { InquiryForm } from "./inquiry-form";
import { primaryWhatsappNumber, secondaryWhatsappNumber, whatsappHref } from "./whatsapp";

const programs = [
  {
    title: "Awareness sessions",
    copy: "Structured wellbeing conversations for schools, workplaces, community groups, and faith-based organizations.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=900&q=80",
    icon: Users
  },
  {
    title: "Resource library",
    copy: "Accessible materials on stress, resilience, stigma reduction, and practical support pathways.",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=900&q=80",
    icon: Library
  },
  {
    title: "Community events",
    copy: "Workshops and listening spaces designed to encourage participation, empathy, and early support.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    icon: CalendarDays
  }
];

const impactStats = [
  ["Schools", "Awareness sessions for students, parents, and educators."],
  ["Community", "Programs that reduce stigma and make support feel more accessible."],
  ["Partners", "Collaboration opportunities for educators, clinicians, sponsors, and volunteer advocates."]
];

export default function MentalAwarenessHome() {
  return (
    <main>
      <section className="relative min-h-[88svh] overflow-hidden bg-ink text-white md:min-h-[92vh]">
        <Image src="/brand/mental-hero.png" alt="Lubis mental awareness" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(20,33,61,0.96),rgba(20,33,61,0.73)_50%,rgba(20,33,61,0.16))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="shell relative z-10 grid min-h-[88svh] items-center gap-10 pb-16 pt-32 md:min-h-[92vh] lg:grid-cols-[1fr_410px]">
          <div className="max-w-[700px] animate-rise">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
              <HeartHandshake size={16} /> Mental wellbeing and social impact by Lubis
            </p>
            <h1 className="text-[clamp(2.2rem,5.5vw,4.2rem)] font-black leading-[1.05] tracking-normal">Mental wellbeing education that feels human and accessible.</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/85 md:text-xl">
              Lubis Mental Awareness supports education, advocacy, and community participation for healthier conversations around mental wellbeing.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#participate" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white shadow-strong transition hover:-translate-y-0.5 hover:bg-[#176574]">
                Get involved <ArrowRight size={18} />
              </a>
              <a href={whatsappHref("Hello Lubis Mental Awareness, I want to chat about an NGO program or partnership.")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-ink">
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="hidden animate-rise gap-3 lg:grid" style={{ animationDelay: "120ms" }}>
            {impactStats.map(([title, copy]) => (
              <div key={title} className="rounded-md border border-white/15 bg-white/12 p-5 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">{title}</p>
                <p className="mt-2 leading-7 text-white/84">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section bg-white">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase text-accent">About the initiative</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">A platform for education, support, and stigma reduction.</h2>
          </div>
          <p className="text-lg leading-8 text-slate-700">
            The initiative provides practical resources, organizes community programs, and creates pathways for schools, workplaces, partners, and volunteers to participate in mental wellbeing advocacy.
          </p>
        </div>
      </section>

      <section className="section bg-sage">
        <div className="shell grid gap-6 md:grid-cols-3">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
            <article key={program.title} className="card lift overflow-hidden">
              <div className="overflow-hidden">
                <Image src={program.image} alt={program.title} width={900} height={540} className="h-52 w-full object-cover transition duration-500 hover:scale-[1.04]" />
              </div>
              <div className="p-7">
                <span className="icon-badge">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-xl font-bold">{program.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{program.copy}</p>
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <section className="section bg-ink text-white">
        <div className="shell grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase text-accent"><ShieldCheck size={16} /> Support channel</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Speak with the Lubis Mental Awareness team.</h2>
            <p className="mt-4 max-w-2xl leading-8 text-white/76">Use WhatsApp for school programs, volunteer interest, sponsorship discussions, event invitations, or community partnerships. Available numbers: +{primaryWhatsappNumber} and +{secondaryWhatsappNumber}.</p>
          </div>
          <a href={whatsappHref("Hello Lubis Mental Awareness, I want to speak with the NGO team.")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 font-bold text-white shadow-strong transition hover:-translate-y-0.5">
            <MessageCircle size={18} /> Open WhatsApp
          </a>
        </div>
      </section>

      <section id="participate" className="section bg-white">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase text-accent">Participate</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Request a program, partnership, or volunteer conversation.</h2>
          </div>
          <InquiryForm />
        </div>
      </section>
      <a href={whatsappHref("Hello Lubis Mental Awareness, I want to get involved.")} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-strong transition hover:-translate-y-0.5 md:hidden" aria-label="Open WhatsApp chat">
        <MessageCircle size={22} />
      </a>
    </main>
  );
}
