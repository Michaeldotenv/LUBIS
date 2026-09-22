"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "../app/data";
import { customRequestMessage, whatsappHref } from "./whatsapp";

const money = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });

export function ProductCatalogue({ products, categories, initialCategory = "All" }: { products: Product[]; categories: string[]; initialCategory?: string }) {
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : "All");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const queryMatch =
        normalizedQuery.length === 0 ||
        [product.name, product.category, product.collection, product.material, product.fit, product.gender, ...product.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return categoryMatch && queryMatch;
    });
  }, [category, products, query]);

  function selectCategory(nextCategory: string) {
    setCategory(nextCategory);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (nextCategory === "All") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", nextCategory);
      }
      window.history.replaceState(null, "", url.toString());
    }
  }

  return (
    <section className="section bg-white">
      <div className="shell">
        <div className="grid gap-5 rounded-md border border-slate-200 bg-slate-50 p-4 shadow-soft md:grid-cols-[1fr_auto] md:items-center">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by product, material, fit, or category..."
              className="w-full rounded-md border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-ink"
            />
          </label>
          <p className="text-sm font-bold text-slate-600">{filteredProducts.length} products</p>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
          {["All", ...categories].map((option) => {
            const active = option === category;
            return (
              <button
                key={option}
                type="button"
                onClick={() => selectCategory(option)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
                  active ? "border-ink bg-ink text-white" : "border-slate-300 bg-white text-ink hover:border-accent hover:text-accent"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.slug} className="card lift group block overflow-hidden">
              <div className="relative overflow-hidden bg-slate-100">
                <Image src={product.image} alt={product.name} width={600} height={800} className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
                <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-bold text-ink shadow-soft">{product.collection}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">{product.category}</p>
                  <p className="text-xs font-semibold text-slate-500">{product.gender}</p>
                </div>
                <h2 className="mt-3 text-xl font-bold leading-tight text-ink">{product.name}</h2>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="font-bold">{money.format(product.price)}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-ink">
                    View <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-10 rounded-md border border-slate-200 bg-slate-50 p-8 text-center">
            <h2 className="text-2xl font-bold text-ink">No products match your search.</h2>
            <p className="mt-3 text-slate-600">Try another category, fit, material, or product name, or contact us for personal assistance.</p>
            <a href={whatsappHref(customRequestMessage)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white">
              <MessageCircle size={18} /> Ask on WhatsApp
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
