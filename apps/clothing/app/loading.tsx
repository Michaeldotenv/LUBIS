export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-ink py-16">
        <div className="shell">
          <div className="skeleton h-5 w-40 bg-white/15" />
          <div className="skeleton mt-6 h-14 max-w-2xl bg-white/15" />
          <div className="skeleton mt-5 h-5 max-w-xl bg-white/15" />
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="skeleton h-16 w-full" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="card overflow-hidden">
                <div className="skeleton h-72 rounded-none" />
                <div className="p-6">
                  <div className="skeleton h-4 w-24" />
                  <div className="skeleton mt-4 h-6 w-4/5" />
                  <div className="skeleton mt-4 h-4 w-full" />
                  <div className="skeleton mt-6 h-5 w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
