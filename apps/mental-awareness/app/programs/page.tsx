import Image from "next/image";
import Link from "next/link";

export default function ProgramsPage() {
  const resources = ["Stress and burnout", "Youth wellbeing", "Workplace conversations", "Caregiver support", "Stigma reduction", "Finding support"];

  return (
    <main>
      <section className="relative overflow-hidden bg-brand pb-16 pt-32 text-white">
        <Image src="/brand/mental-hero.png" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(20,33,61,0.94),rgba(31,122,140,0.76)_58%,rgba(20,33,61,0.34))]" />
        <div className="shell relative z-10">
          <Link href="/" className="text-sm font-semibold text-white/75">Lubis Mental Awareness</Link>
          <h1 className="mt-6 text-[clamp(2.35rem,7vw,4.25rem)] font-black leading-tight">Mental wellbeing programs and resources</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">Explore education themes, community sessions, and practical materials that support healthier conversations around mental wellbeing.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell grid gap-5 md:grid-cols-3">
          {resources.map((resource) => (
            <article className="card p-6" key={resource}>
              <h2 className="text-xl font-bold">{resource}</h2>
              <p className="mt-3 leading-7 text-slate-600">Programs can include guided discussion points, learning materials, and practical next steps tailored to this topic.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
