"use client";

import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function InquiryForm() {
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
      subject: String(form.get("subject") ?? "Property inquiry"),
      message: String(form.get("message") ?? ""),
      source: "realestate"
    };

    try {
      const response = await fetch(`${apiUrl}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Could not submit inquiry");
      }

      formElement.reset();
      setStatus("success");
      setMessage("Your inquiry has been submitted. The Lubis Real Estate team will follow up shortly.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Inquiry submission failed");
    }
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 p-6">
      <input name="name" required placeholder="Full name" className="rounded-md border border-slate-300 px-4 py-3" />
      <input name="email" required type="email" placeholder="Email address" className="rounded-md border border-slate-300 px-4 py-3" />
      <input name="phone" placeholder="Phone or WhatsApp" className="rounded-md border border-slate-300 px-4 py-3" />
      <input name="subject" placeholder="Property interest" className="rounded-md border border-slate-300 px-4 py-3" />
      <textarea name="message" required rows={5} placeholder="Budget, location, property type, and timeline" className="rounded-md border border-slate-300 px-4 py-3" />
      <button disabled={status === "submitting"} className="rounded-full bg-brand px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-400">
        {status === "submitting" ? "Submitting..." : "Submit inquiry"}
      </button>
      {message && (
        <p className={`rounded-md p-4 text-sm font-semibold ${status === "success" ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
