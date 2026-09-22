export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-ink py-16">
        <div className="shell">
          <div className="skeleton h-5 w-44 bg-white/15" />
          <div className="skeleton mt-6 h-16 max-w-xl bg-white/15" />
          <div className="skeleton mt-5 h-5 max-w-2xl bg-white/15" />
        </div>
      </section>
      <section className="section">
        <div className="shell grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card overflow-hidden">
              <div className="skeleton h-52 rounded-none" />
              <div className="p-7">
                <div className="skeleton h-11 w-11" />
                <div className="skeleton mt-5 h-7 w-4/5" />
                <div className="skeleton mt-4 h-4 w-full" />
                <div className="skeleton mt-3 h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
