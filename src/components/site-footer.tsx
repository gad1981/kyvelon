import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { SERVICE_FACE_IDS } from "@/lib/cube-faces";

export function SiteFooter({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const f = t.footer;
  const home = `/${locale}`;

  return (
    <footer
      id="site-footer"
      className="relative z-10 border-t border-white/10 bg-navy text-white"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Link href={`${home}#cube`} className="inline-flex items-center gap-3">
            <Image
              src="/cube-mark.svg"
              alt=""
              width={36}
              height={36}
              className="shrink-0"
            />
            <span className="font-display text-2xl tracking-[-0.02em]">
              Kyvelon
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
            {f.blurb}
          </p>
          <LanguageSwitcher
            locale={locale}
            label={t.lang.label}
            className="mt-6"
            tone="dark"
          />
        </div>

        <div>
          <p className="text-[0.68rem] tracking-[0.2em] text-electric-soft uppercase">
            {f.faces}
          </p>
          <ul className="mt-4 space-y-2.5">
            {SERVICE_FACE_IDS.map((id) => (
              <li key={id}>
                <Link
                  href={`/${locale}/faces/${id}`}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {t.faces[id].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.68rem] tracking-[0.2em] text-electric-soft uppercase">
            {f.company}
          </p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={`${home}#cube`}
                className="text-sm text-white/65 transition hover:text-white"
              >
                {f.theCube}
              </a>
            </li>
            <li>
              <a
                href={`${home}#origin`}
                className="text-sm text-white/65 transition hover:text-white"
              >
                {t.story.originEyebrow}
              </a>
            </li>
            <li>
              <Link
                href={`/${locale}/people`}
                className="text-sm text-white/65 transition hover:text-white"
              >
                {f.people}
              </Link>
            </li>
            <li>
              <a
                href={`${home}#method`}
                className="text-sm text-white/65 transition hover:text-white"
              >
                {f.method}
              </a>
            </li>
            <li>
              <Link
                href={`/${locale}/terms`}
                className="text-sm text-white/65 transition hover:text-white"
              >
                {f.terms}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[0.68rem] tracking-[0.2em] text-electric-soft uppercase">
            {f.contact}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/65">
            <li>{f.location}</li>
            <li>
              <Link
                href={`/${locale}/contact`}
                className="transition hover:text-white"
              >
                {f.startBrief}
              </Link>
            </li>
            <li>
              <a
                href="mailto:georgiosgad@gmail.com"
                className="transition hover:text-white"
              >
                georgiosgad@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+306937027555"
                className="transition hover:text-white"
              >
                +30 6937 027 555
              </a>
            </li>
            <li>
              <Link
                href="https://georgegad.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                georgegad.com
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>{f.rights}</p>
          <p className="tracking-[0.12em] uppercase">{f.tag}</p>
        </div>
      </div>
    </footer>
  );
}
