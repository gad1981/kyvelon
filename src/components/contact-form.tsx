"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent(`Kyvelon inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:georgiosgad@gmail.com?subject=${subject}&body=${body}`;
    setStatus("sent");
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-[0.7rem] tracking-[0.18em] text-white/50 uppercase">
            Name
          </span>
          <Input
            name="name"
            required
            placeholder="Your name"
            className="h-11 rounded-none border-white/20 bg-white text-navy"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[0.7rem] tracking-[0.18em] text-white/50 uppercase">
            Email
          </span>
          <Input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="h-11 rounded-none border-white/20 bg-white text-navy"
          />
        </label>
      </div>
      <label className="block space-y-2">
        <span className="text-[0.7rem] tracking-[0.18em] text-white/50 uppercase">
          What should we build?
        </span>
        <Textarea
          name="message"
          required
          rows={4}
          placeholder="Tell us about the product, automation, or digital system you need."
          className="rounded-none border-white/20 bg-white text-navy"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button
          type="submit"
          size="lg"
          className="h-11 rounded-none bg-electric px-6 tracking-[0.14em] uppercase hover:bg-white hover:text-navy"
        >
          Send brief
        </Button>
        {status === "sent" && (
          <p className="text-sm text-white/70">Opening your email client…</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-300">Please complete all fields.</p>
        )}
      </div>
    </form>
  );
}
