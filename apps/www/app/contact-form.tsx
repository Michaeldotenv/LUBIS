"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      message: String(form.get("message") ?? "")
    };

    try {
      const response = await fetch(`${apiUrl}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Could not send message");
      }

      formElement.reset();
      setStatus("success");
      setMessage("Your message has been sent. The Lubis team will follow up shortly.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Message submission failed");
    }
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 p-6">
      <input name="name" required placeholder="Full name" className="rounded-md border border-slate-300 px-4 py-3" />
      <input name="email" required type="email" placeholder="Email address" className="rounded-md border border-slate-300 px-4 py-3" />
      <input name="phone" placeholder="Phone number" className="rounded-md border border-slate-300 px-4 py-3" />
      <textarea name="message" required placeholder="Message" rows={5} className="rounded-md border border-slate-300 px-4 py-3" />
      <button disabled={status === "submitting"} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400">
        {status === "submitting" ? "Sending..." : "Send message"} <ArrowRight size={18} />
      </button>
      {message && (
        <p className={`rounded-md p-4 text-sm font-semibold ${status === "success" ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
