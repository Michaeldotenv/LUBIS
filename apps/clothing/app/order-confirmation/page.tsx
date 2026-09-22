import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <main>
      <section className="grid min-h-screen place-items-center bg-blush px-4">
        <div className="card max-w-xl p-8 text-center">
          <p className="text-sm font-bold uppercase text-accent">Payment received</p>
          <h1 className="mt-3 text-4xl font-bold">Thank you for shopping Lubis.</h1>
          <p className="mt-4 leading-7 text-slate-600">Your order has been received. The Lubis Clothing team will confirm the final details and keep you updated on delivery.</p>
          <Link href="/" className="mt-7 inline-block rounded-full bg-ink px-6 py-3 font-bold text-white">Return home</Link>
        </div>
      </section>
    </main>
  );
}
