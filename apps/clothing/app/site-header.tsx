"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { whatsappHref } from "../components/whatsapp";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/88 text-white shadow-strong backdrop-blur-xl">
      <div className="shell flex h-[72px] items-center justify-between gap-4 py-3">
        <Link href="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-3">
          <Image src="/brand/lubis-logo.png" alt="Lubis logo" width={42} height={42} className="rounded-full bg-white" />
          <span className="truncate font-bold">Lubis Clothing</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-white/88 md:flex">
          <Link href="/products">Products</Link>
          <Link href="/checkout">Checkout</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/checkout" className="hidden items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-ink sm:inline-flex">
            <ShoppingBag size={17} /> Cart
          </Link>
          <a
            href={whatsappHref("Hello Lubis Clothing, I want to make an order.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
          >
            <MessageCircle size={17} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-ink md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="shell grid gap-2 pb-4 md:hidden">
          <Link href="/products" onClick={() => setOpen(false)} className="rounded-full border border-white/12 px-4 py-3 text-sm font-bold text-white/90">
            Products
          </Link>
          <Link href="/checkout" onClick={() => setOpen(false)} className="rounded-full border border-white/12 px-4 py-3 text-sm font-bold text-white/90">
            Checkout
          </Link>
        </nav>
      )}
    </header>
  );
}
