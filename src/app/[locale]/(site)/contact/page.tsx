import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { SiteHeader } from "@/components/site-header";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = await getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    path: "/contact",
    title: t.contactPage.eyebrow,
    description: t.contactPage.body,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = await getDictionary(locale);

  return (
    <main className="relative bg-navy text-white" data-nav-tone="dark">
      <SiteHeader locale={locale} t={t} tone="dark" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-28 pb-16 sm:px-8 sm:pt-32 lg:grid-cols-[0.9fr_1.1fr] lg:pb-24">
        <div>
          <p className="text-[0.72rem] tracking-[0.22em] text-electric-soft uppercase">
            {t.contactPage.eyebrow}
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {t.contactPage.title}
          </h1>
          <p className="mt-4 max-w-md text-white/65">{t.contactPage.body}</p>
          <ul className="mt-8 space-y-3 text-sm text-white/70">
            <li>{t.footer.location}</li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hover:text-white"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href="tel:+306937027555" className="hover:text-white">
                +30 6937 027 555
              </a>
            </li>
          </ul>
        </div>
        <div className="border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          <ContactForm t={t.contactForm} />
        </div>
      </div>
    </main>
  );
}
