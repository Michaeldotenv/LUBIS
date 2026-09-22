import Image from "next/image";
import Link from "next/link";

const events = [
  ["Community Listening Session", "Lagos", "Schedule to be announced"],
  ["Mental Health at Work", "Online", "Schedule to be announced"],
  ["Youth Wellbeing Workshop", "Campus partner", "Schedule to be announced"]
];

export default function EventsPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white">
        <Image src="/brand/mental-hero.png" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(20,33,61,0.96),rgba(20,33,61,0.76)_58%,rgba(20,33,61,0.34))]" />
        <div className="shell relative z-10">
          <Link href="/" className="text-sm font-semibold text-white/75">Lubis Mental Awareness</Link>
          <h1 className="mt-6 text-[clamp(2.35rem,7vw,4.25rem)] font-black leading-tight">Mental wellbeing events</h1>
        </div>
      </section>
      <section className="section bg-sage">
        <div className="shell grid gap-5">
          {events.map(([title, location, date]) => (
            <article className="card flex flex-col justify-between gap-4 p-6 md:flex-row md:items-center" key={title}>
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="mt-2 text-slate-600">{location}</p>
              </div>
              <p className="rounded-full bg-brand px-5 py-3 font-bold text-white">{date}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
