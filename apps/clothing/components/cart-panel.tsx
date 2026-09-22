"use client";

import Link from "next/link";
import { MessageCircle, Trash2 } from "lucide-react";
import { useCart } from "./cart-store";
import { cartWhatsappMessage, whatsappHref } from "./whatsapp";

const money = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });

export function CartPanel() {
  const cart = useCart();

  return (
    <aside className="card p-6">
      <h2 className="text-2xl font-bold">Cart</h2>
      <div className="mt-5 grid gap-4">
        {cart.items.length === 0 ? (
          <p className="text-slate-600">Your cart is empty.</p>
        ) : (
          cart.items.map((item, index) => (
            <div key={`${item.slug}-${item.size}-${item.color}-${index}`} className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-slate-600">{item.size} / {item.color} / Qty {item.quantity}</p>
                <p className="mt-1 font-semibold">{money.format(item.price * item.quantity)}</p>
              </div>
              <button type="button" onClick={() => cart.removeItem(index)} className="rounded-full border border-slate-300 p-2" aria-label={`Remove ${item.name}`}>
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="mt-5 flex items-center justify-between text-lg font-bold">
        <span>Total</span>
        <span>{money.format(cart.total)}</span>
      </div>
      <Link href="/checkout" className="mt-5 block rounded-full bg-ink px-6 py-3 text-center font-bold text-white">
        Checkout
      </Link>
      {cart.items.length > 0 && (
        <a
          href={whatsappHref(cartWhatsappMessage(cart.items, cart.total))}
          target="_blank"
          rel="noreferrer"
          className="mt-3 flex items-center justify-center gap-2 rounded-full border border-ink px-6 py-3 text-center font-bold text-ink transition hover:bg-ink hover:text-white"
        >
          <MessageCircle size={18} /> Send cart on WhatsApp
        </a>
      )}
    </aside>
  );
}
