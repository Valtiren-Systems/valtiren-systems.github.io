"use client";

import { useState } from "react";
import { CTA } from "@/lib/content";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "ok" | "error";

/**
 * Reference box: bg #060810, 172.8px block padding, 100px/110px bold display.
 * The form posts to the Postgres-backed /api/leads route.
 */
export default function CtaSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   const payload = Object.fromEntries(new FormData(form).entries());
  //   setStatus("sending");
  //   try {
  //     const res = await fetch("/api/leads", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });
  //     const body = await res.json();
  //     if (!res.ok) throw new Error(body?.error ?? "Something went wrong.");
  //     setStatus("ok");
  //     setMessage(
  //       "Thanks — a strategist will reach out within one business day."
  //     );
  //     form.reset();
  //   } catch (err) {
  //     setStatus("error");
  //     setMessage(err instanceof Error ? err.message : "Something went wrong.");
  //   }
  // }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "efe3a31f-abff-4e51-9199-da3b500369ff");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error ?? "Something went wrong.");
      setStatus("ok");
      setMessage(
        "Thanks — our team will review your request and get back to you within one business day."
      );
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="demo" className="bg-ink-raised py-[clamp(80px,12vw,172.8px)]">
      <div className="shell px-6 md:px-[57.6px]">
        <div className="grid items-start gap-[72px] lg:grid-cols-[minmax(0,1fr)_480px]">
          <Reveal>
            <div>
              <h2 className="text-[clamp(2.5rem,6.9vw,6.25rem)] font-bold leading-[1.1] tracking-[-0.03em]">
                {CTA.title}
              </h2>
              <p className="mt-6 max-w-[520px] text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-paper/65">
                {CTA.body}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#demo-form" className="btn-primary">
                  {CTA.primary.label}
                </a>
                <a
                  href={CTA.secondary.href}
                  className="text-[14.4px] font-bold text-paper/80 underline-offset-4 hover:text-lime hover:underline"
                >
                  {CTA.secondary.label}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <form
              id="demo-form"
              onSubmit={onSubmit}
              className="rounded-[16px] border border-hairline bg-white/[0.04] p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  name="name"
                  label="Name"
                  autoComplete="given-name"
                  required
                />
                <Field
                  name="country"
                  label="Country"
                  autoComplete="family-name"
                  required
                />
              </div>
              <div className="mt-4 grid gap-4">
                <Field
                  name="email"
                  label="Work email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <Field name="phonenumber" label="Phone number" />
                <Field
                  name="company"
                  label="Company"
                  autoComplete="organization"
                  required
                />
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-[12px] font-semibold text-paper/70">
                  What are you currently dealing?
                </span>
                <textarea
                  name="message"
                  rows={3}
                  maxLength={2000}
                  className="w-full rounded-[10px] border border-hairline bg-black/30 px-3.5 py-2.5 text-[14px] outline-none transition-colors focus:border-violet"
                />
              </label>

              {/* Honeypot — hidden from humans, rejected server-side when filled. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary mt-6 w-full justify-center disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Request a Demo"}
              </button>

              {status !== "idle" && status !== "sending" && (
                <p
                  role="status"
                  className={`mt-4 text-[13px] font-medium ${
                    status === "ok" ? "text-lime" : "text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  ...rest
}: {
  name: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold text-paper/70">
        {label}
      </span>
      <input
        name={name}
        className="w-full rounded-[10px] border border-hairline bg-black/30 px-3.5 py-2.5 text-[14px] outline-none transition-colors focus:border-violet"
        {...rest}
      />
    </label>
  );
}
