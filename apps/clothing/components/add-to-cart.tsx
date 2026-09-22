"use client";

import { MessageCircle, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "../app/data";
import { useCart } from "./cart-store";
import { productWhatsappMessage, whatsappHref } from "./whatsapp";

export function AddToCart({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);
  const cart = useCart();

  return (
    <div className="grid gap-5">
      <div>
        <label className="text-sm font-bold">Size</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button key={option} type="button" onClick={() => setSize(option)} className={`h-10 min-w-12 rounded-full border px-3 font-bold ${size === option ? "border-ink bg-ink text-white" : "border-slate-300 bg-white"}`}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-bold">Colour</label>
        <select value={color} onChange={(event) => setColor(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3">
          {product.colors.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={() => {
          cart.addItem(product, size, color);
          setAdded(true);
        }}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white"
      >
        <ShoppingBag size={18} /> {added ? "Added" : "Add to cart"}
      </button>
      <a
        href={whatsappHref(productWhatsappMessage(product, size, color))}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-ink px-6 py-3 font-bold text-ink transition hover:bg-ink hover:text-white"
      >
        <MessageCircle size={18} /> Buy selected item on WhatsApp
      </a>
    </div>
  );
}
