import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { SERVICE_FACE_IDS } from "@/lib/cube-faces";
import { CONTACT_EMAIL } from "@/lib/site";

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
      data-nav-tone="dark"
      className="relative z-10 border-t border-white/10 bg-navy text-white"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
        <div>
          <BrandLogo href={`${home}#cube`} tone="white" width={128} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
            {f.blurb}
          </p>
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
            {f.explore}
          </p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link
                href={`${home}#cube`}
                className="text-sm text-white/65 transition hover:text-white"
              >
                {f.theCube}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/work`}
                className="text-sm text-white/65 transition hover:text-white"
              >
                {f.work}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/insights`}
                className="text-sm text-white/65 transition hover:text-white"
              >
                {f.insights}
              </Link>
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
              <Link
                href={`${home}#method`}
                className="text-sm text-white/65 transition hover:text-white"
              >
                {f.method}
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
                href={`mailto:${CONTACT_EMAIL}`}
                className="transition hover:text-white"
              >
                {CONTACT_EMAIL}
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
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>{f.rights}</p>
          <nav
            aria-label={f.legal}
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <Link
              href={`/${locale}/terms`}
              className="transition hover:text-white"
            >
              {f.terms}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="transition hover:text-white"
            >
              {f.privacy}
            </Link>
            <Link
              href={`/${locale}/cookies`}
              className="transition hover:text-white"
            >
              {f.cookies}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
