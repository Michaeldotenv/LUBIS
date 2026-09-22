"use client";

import Image from "next/image";
import Link from "next/link";
import { LockKeyhole, UserPlus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../components/auth-store";
import { useCart } from "../../components/cart-store";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const money = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });

export default function CheckoutPage() {
  const cart = useCart();
  const auth = useAuth();
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");
    const form = new FormData(event.currentTarget);

    try {
      const orderResponse = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.get("name"),
            email: form.get("email"),
            phone: form.get("phone")
          },
          delivery_address: form.get("address"),
          items: cart.items.map((item) => ({
            product_slug: item.slug,
            product_name: item.name,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            unit_price: item.price
          }))
        })
      });

      if (!orderResponse.ok) {
        throw new Error("Could not create order");
      }

      const order = await orderResponse.json();
      const paymentResponse = await fetch(`${apiUrl}/payments/paystack/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: order.id, email: form.get("email") })
      });

      if (!paymentResponse.ok) {
        setStatus(`Order ${order.order_number} has been received. A Lubis Clothing representative will contact you to complete payment and delivery confirmation.`);
        return;
      }

      const payment = await paymentResponse.json();
      if (payment.authorization_url) {
        window.location.href = payment.authorization_url;
        return;
      }

      setStatus(`Order ${order.order_number} has been received. A Lubis Clothing representative will contact you to complete payment and delivery confirmation.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Checkout failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-white">
        <Image src="/brand/clothing-hero.png" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(17,24,39,0.96),rgba(17,24,39,0.78)_55%,rgba(17,24,39,0.38))]" />
        <div className="shell relative z-10">
          <Link href="/" className="text-sm font-semibold text-white/75">Lubis Clothing</Link>
          <h1 className="mt-6 text-[clamp(2.35rem,7vw,4.25rem)] font-black leading-tight">Checkout</h1>
        </div>
      </section>
      <section className="section bg-white">
        <div className="shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {auth.user ? (
            <form onSubmit={submit} className="card grid gap-4 p-6">
              <div className="mb-2 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-900">
                Signed in as {auth.user.email}. Review your delivery details and submit your order securely.
              </div>
              <input name="name" defaultValue={auth.user.name} required placeholder="Full name" className="rounded-md border border-slate-300 px-4 py-3" />
              <input name="email" defaultValue={auth.user.email} required type="email" placeholder="Email address" className="rounded-md border border-slate-300 px-4 py-3" />
              <input name="phone" defaultValue={auth.user.phone ?? ""} required placeholder="Phone or WhatsApp" className="rounded-md border border-slate-300 px-4 py-3" />
              <textarea name="address" required rows={5} placeholder="Delivery address" className="rounded-md border border-slate-300 px-4 py-3" />
              <button disabled={submitting || cart.items.length === 0} className="rounded-full bg-accent px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-400">
                {submitting ? "Preparing payment..." : "Pay securely"}
              </button>
              {status && <p className="rounded-md bg-blush p-4 font-semibold text-ink">{status}</p>}
            </form>
          ) : (
            <section className="card p-7">
              <span className="icon-badge">
                <LockKeyhole size={22} strokeWidth={1.8} />
              </span>
              <h2 className="mt-5 text-3xl font-bold text-ink">Create an account to complete your order.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Sign in or create an account to keep your order details organized and make future purchases faster.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/signup?next=/checkout" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white">
                  <UserPlus size={18} /> Sign up
                </Link>
                <Link href="/signin?next=/checkout" className="rounded-full border border-ink px-6 py-3 font-bold text-ink">
                  Sign in
                </Link>
              </div>
            </section>
          )}
          <aside className="card p-6">
            <h2 className="text-2xl font-bold">Order summary</h2>
            <div className="mt-5 grid gap-4">
              {cart.items.map((item) => (
                <div key={`${item.slug}-${item.size}-${item.color}`} className="flex justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-slate-600">{item.size} / {item.color} / Qty {item.quantity}</p>
                  </div>
                  <p className="font-bold">{money.format(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>{money.format(cart.total)}</span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
