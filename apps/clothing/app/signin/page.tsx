"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth } from "../../components/auth-store";

function SignInContent() {
  const auth = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/checkout";
  const [email, setEmail] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    auth.signIn({ name: email.split("@")[0] || "Lubis Customer", email });
    router.push(next);
  }

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative hidden overflow-hidden bg-ink lg:block">
        <Image src="/brand/clothing-hero.png" alt="Lubis Clothing" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-ink/45" />
      </section>
      <section className="grid place-items-center px-5 pb-12 pt-28">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/brand/lubis-logo.png" alt="Lubis logo" width={44} height={44} className="rounded-full" />
            <span className="text-lg font-bold">Lubis Clothing</span>
          </Link>
          <p className="mt-10 text-sm font-bold uppercase text-accent">Customer account</p>
          <h1 className="mt-3 text-3xl font-black text-ink md:text-4xl">Sign in to complete your order.</h1>
          <form onSubmit={submit} className="mt-8 grid gap-4">
            <input value={email} onChange={(event) => setEmail(event.target.value)} name="email" required type="email" placeholder="Email address" className="rounded-md border border-slate-300 px-4 py-3" />
            <input name="password" required type="password" placeholder="Password" className="rounded-md border border-slate-300 px-4 py-3" />
            <button className="rounded-full bg-ink px-6 py-3 font-bold text-white">Sign in</button>
          </form>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/forgot-password" className="text-accent">Forgot password?</Link>
            <Link href={`/signup?next=${encodeURIComponent(next)}`} className="text-ink">Create account</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
