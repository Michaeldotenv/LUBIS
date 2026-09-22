"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative hidden overflow-hidden bg-ink lg:block">
        <Image src="/brand/clothing-hero.png" alt="Lubis Clothing account recovery" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-ink/45" />
      </section>
      <section className="grid place-items-center px-5 pb-12 pt-28">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/brand/lubis-logo.png" alt="Lubis logo" width={44} height={44} className="rounded-full" />
            <span className="text-lg font-bold">Lubis Clothing</span>
          </Link>
          <p className="mt-10 text-sm font-bold uppercase text-accent">Password reset</p>
          <h1 className="mt-3 text-3xl font-black text-ink md:text-4xl">Recover your account.</h1>
          <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="mt-8 grid gap-4">
            <input name="email" required type="email" placeholder="Email address" className="rounded-md border border-slate-300 px-4 py-3" />
            <button className="rounded-full bg-ink px-6 py-3 font-bold text-white">Send reset link</button>
          </form>
          {sent && <p className="mt-5 rounded-md bg-blush p-4 font-semibold text-ink">If an account exists for this email address, password reset instructions will be sent shortly.</p>}
          <Link href="/signin" className="mt-5 inline-block text-sm font-bold text-accent">Back to sign in</Link>
        </div>
      </section>
    </main>
  );
}
