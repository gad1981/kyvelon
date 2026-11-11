"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/components/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/i18n/types";
import { CONTACT_EMAIL } from "@/lib/site";

export function ContactForm({ t }: { t: Dictionary["contactForm"] }) {
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

    trackEvent("generate_lead", {
      form_id: "contact",
      method: "mailto",
    });

    const subject = encodeURIComponent(`Kyvelon inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus("sent");
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-[0.7rem] tracking-[0.18em] text-white/50 uppercase">
            {t.name}
          </span>
          <Input
            name="name"
            required
            placeholder={t.namePlaceholder}
            className="h-11 rounded-none border-white/20 bg-white text-navy"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[0.7rem] tracking-[0.18em] text-white/50 uppercase">
            {t.email}
          </span>
          <Input
            name="email"
            type="email"
            required
            placeholder={t.emailPlaceholder}
            className="h-11 rounded-none border-white/20 bg-white text-navy"
          />
        </label>
      </div>
      <label className="block space-y-2">
        <span className="text-[0.7rem] tracking-[0.18em] text-white/50 uppercase">
          {t.message}
        </span>
        <Textarea
          name="message"
          required
          rows={4}
          placeholder={t.messagePlaceholder}
          className="rounded-none border-white/20 bg-white text-navy"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button
          type="submit"
          size="lg"
          className="h-11 rounded-none bg-electric px-6 tracking-[0.14em] uppercase hover:bg-white hover:text-navy"
        >
          {t.send}
        </Button>
        {status === "sent" && (
          <p className="text-sm text-white/70">{t.sent}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-300">{t.error}</p>
        )}
      </div>
    </form>
  );
}
