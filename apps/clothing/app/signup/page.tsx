"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth } from "../../components/auth-store";

function SignUpContent() {
  const auth = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/checkout";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    auth.signIn({ name, email, phone });
    router.push(next);
  }

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative hidden overflow-hidden bg-ink lg:block">
        <Image src="/brand/clothing-hero.png" alt="Lubis Clothing account" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-ink/45" />
      </section>
      <section className="grid place-items-center px-5 pb-12 pt-28">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/brand/lubis-logo.png" alt="Lubis logo" width={44} height={44} className="rounded-full" />
            <span className="text-lg font-bold">Lubis Clothing</span>
          </Link>
          <p className="mt-10 text-sm font-bold uppercase text-accent">New customer</p>
          <h1 className="mt-3 text-3xl font-black text-ink md:text-4xl">Create your Lubis Clothing account.</h1>
          <form onSubmit={submit} className="mt-8 grid gap-4">
            <input value={name} onChange={(event) => setName(event.target.value)} name="name" required placeholder="Full name" className="rounded-md border border-slate-300 px-4 py-3" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} name="email" required type="email" placeholder="Email address" className="rounded-md border border-slate-300 px-4 py-3" />
            <input value={phone} onChange={(event) => setPhone(event.target.value)} name="phone" required placeholder="Phone or WhatsApp" className="rounded-md border border-slate-300 px-4 py-3" />
            <input name="password" required type="password" placeholder="Password" className="rounded-md border border-slate-300 px-4 py-3" />
            <button className="rounded-full bg-accent px-6 py-3 font-bold text-white">Create account</button>
          </form>
          <p className="mt-5 text-sm text-slate-600">
            Already have an account? <Link href={`/signin?next=${encodeURIComponent(next)}`} className="font-bold text-ink">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpContent />
    </Suspense>
  );
}
