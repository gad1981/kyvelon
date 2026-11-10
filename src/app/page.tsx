import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { HeroCube } from "@/components/hero-cube";
import { IsoGrid } from "@/components/iso-grid";
import { SiteHeader } from "@/components/site-header";

const faces = [
  {
    face: "01",
    title: "Software creation",
    copy: "Custom products and platforms engineered as durable building blocks — clear architecture, sharp UX, room to scale.",
  },
  {
    face: "02",
    title: "Websites & digital products",
    copy: "Brand-led sites and product surfaces that convert. Fast, structured, and ready for the channels your customers live in.",
  },
  {
    face: "03",
    title: "Automation",
    copy: "Workflows that remove friction: CRM flows, content ops, AI-assisted execution, and systems that keep teams moving.",
  },
  {
    face: "04",
    title: "Digital services",
    copy: "Strategy through delivery — omnichannel growth, digital innovation, and go-to-market for brands that need results.",
  },
];

const method = [
  {
    step: "Structure",
    greek: "δομή",
    copy: "We define the cube: goals, users, data, and constraints. No floating features — only faces that belong.",
  },
  {
    step: "Faces",
    greek: "έδρες",
    copy: "Each capability is cut with precision — product, site, automation, or service — then stress-tested in isolation.",
  },
  {
    step: "Assemble",
    greek: "σύνθεση",
    copy: "Faces lock into one system. Launch, measure, iterate. The cube holds because every edge was intentional.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* HERO — one composition, brand first, cube as visual plane */}
        <section className="relative isolate min-h-[100svh] overflow-hidden">
          <IsoGrid />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgb(243_245_248_/_0.2)_0%,rgb(0_56_248_/_0.08)_42%,rgb(6_16_43_/_0.18)_100%)]" />
          <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-24">
            <div className="animate-face-in z-10 max-w-xl">
              <Image
                src="/kyvelon-logo.png"
                alt="Kyvelon"
                width={708}
                height={354}
                priority
                className="mb-8 w-[min(100%,320px)] sm:w-[360px]"
              />
              <h1 className="font-display text-[clamp(2.35rem,6vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-navy">
                Digital systems
                <span className="block text-electric">built as cubes.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-navy/70 sm:text-lg">
                Software, websites, automation, and digital services — structured
                like κύβος. Every face precise. Every edge intentional.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex h-12 items-center bg-electric px-6 text-[0.75rem] tracking-[0.16em] text-white uppercase transition hover:bg-navy"
                >
                  Start a project
                </a>
                <a
                  href="#faces"
                  className="inline-flex h-12 items-center border border-navy/20 bg-white/50 px-6 text-[0.75rem] tracking-[0.16em] text-navy uppercase backdrop-blur-sm transition hover:border-electric hover:text-electric"
                >
                  Explore the faces
                </a>
              </div>
            </div>
            <div
              className="animate-face-in relative z-10 flex items-center justify-center"
              style={{ animationDelay: "120ms" }}
            >
              <HeroCube />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
        </section>

        {/* FACES — services as cube faces, not cards */}
        <section id="faces" className="relative scroll-mt-20 py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
                The four faces
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
                One cube. Four ways we build.
              </h2>
              <p className="mt-4 max-w-lg text-navy/65">
                Kyvelon turns digital ambition into systems you can ship — from
                Athens to EMEA brands that need speed without chaos.
              </p>
            </div>

            <div className="mt-14 grid gap-px bg-navy/10 sm:grid-cols-2">
              {faces.map((item, index) => (
                <article
                  key={item.face}
                  className="group relative overflow-hidden bg-surface px-6 py-8 transition duration-500 hover:bg-navy sm:px-8 sm:py-10"
                  style={{
                    clipPath:
                      index % 2 === 0
                        ? "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)"
                        : "polygon(0 0, 100% 0, 100% 100%, 6% 100%, 0 88%)",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -top-10 -right-8 h-36 w-36 rotate-12 bg-[linear-gradient(135deg,rgb(0_56_248_/_0.18),transparent)] transition duration-500 group-hover:bg-[linear-gradient(135deg,rgb(42_88_255_/_0.35),transparent)]"
                  />
                  <p className="font-display text-sm tracking-[0.2em] text-electric group-hover:text-electric-soft">
                    Face {item.face}
                  </p>
                  <h3 className="font-display mt-4 text-2xl font-semibold tracking-[-0.02em] text-navy transition group-hover:text-white sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-navy/65 transition group-hover:text-white/70">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* METHOD — κύβος idea */}
        <section
          id="method"
          className="relative scroll-mt-20 overflow-hidden bg-navy py-24 text-white sm:py-28"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(30deg, transparent 47%, rgb(0 56 248 / 0.45) 49%, transparent 52%),
                linear-gradient(150deg, transparent 47%, rgb(255 255 255 / 0.08) 49%, transparent 52%)
              `,
              backgroundSize: "72px 42px",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] tracking-[0.22em] text-electric-soft uppercase">
                κύβος · the method
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Build like a cube, not a pile.
              </h2>
              <p className="mt-4 max-w-xl text-white/65">
                From the Greek for cube: structure first, then faces, then
                assembly. That is how Kyvelon ships digital work that holds under
                pressure.
              </p>
            </div>

            <ol className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
              {method.map((item, index) => (
                <li key={item.step} className="relative">
                  <div
                    className="mb-5 h-16 w-16"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      background:
                        index === 1
                          ? "linear-gradient(145deg,#2a58ff,#0038f8)"
                          : "linear-gradient(145deg,#1a2748,#0a1638)",
                    }}
                    aria-hidden="true"
                  />
                  <p className="text-[0.7rem] tracking-[0.2em] text-white/40 uppercase">
                    Step 0{index + 1} · {item.greek}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-semibold tracking-[-0.02em]">
                    {item.step}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FOUNDER — George Gad / georgegad.com */}
        <section id="founder" className="relative scroll-mt-20 py-24 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-end gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
                Founder
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
                Built by George Gad.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy/70">
                Kyvelon is the delivery studio of{" "}
                <Link
                  href="https://georgegad.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric underline decoration-electric/30 underline-offset-4 transition hover:decoration-electric"
                >
                  georgegad.com
                </Link>
                — 16+ years leading digital strategy and innovation across EMEA
                for brands like P&amp;G, Nestlé, and Essity.
              </p>
              <p className="mt-4 max-w-xl text-navy/65">
                Data-led. Human-centered. Tech-fluent. From Athens, Kyvelon turns
                that same discipline into software, websites, automation, and
                digital systems brands can run on.
              </p>
            </div>
            <aside className="relative border-l-2 border-electric pl-6 sm:pl-8">
              <p className="font-display text-xl leading-snug text-navy sm:text-2xl">
                “In a digital, yet human world — structure is how ideas become
                systems that grow.”
              </p>
              <p className="mt-6 text-[0.72rem] tracking-[0.18em] text-navy/50 uppercase">
                Athens, Greece · Digital strategy &amp; innovation
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy/70">
                <a
                  href="mailto:georgiosgad@gmail.com"
                  className="transition hover:text-electric"
                >
                  georgiosgad@gmail.com
                </a>
                <a
                  href="tel:+306937027555"
                  className="transition hover:text-electric"
                >
                  +30 6937 027 555
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="relative scroll-mt-20 border-t border-navy/10 bg-[linear-gradient(180deg,#eef1f6_0%,#e4e9f2_100%)] py-24 sm:py-28"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[0.72rem] tracking-[0.22em] text-electric uppercase">
                Contact
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
                Brief the next cube.
              </h2>
              <p className="mt-4 max-w-md text-navy/65">
                Tell us what face you need first — product, site, automation, or
                a full digital system. We reply from Athens.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-navy/70">
                <li>Athens, Greece</li>
                <li>
                  <a
                    href="mailto:georgiosgad@gmail.com"
                    className="hover:text-electric"
                  >
                    georgiosgad@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+306937027555" className="hover:text-electric">
                    +30 6937 027 555
                  </a>
                </li>
                <li>
                  <Link
                    href="https://georgegad.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-electric"
                  >
                    georgegad.com
                  </Link>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 bg-electric/10"
                style={{
                  clipPath:
                    "polygon(3% 0, 100% 0, 100% 92%, 97% 100%, 0 100%, 0 8%)",
                }}
              />
              <div
                className="bg-white/80 p-6 backdrop-blur-sm sm:p-8"
                style={{
                  clipPath:
                    "polygon(2% 0, 100% 0, 100% 94%, 98% 100%, 0 100%, 0 6%)",
                }}
              >
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-navy/10 bg-navy py-8 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/cube-mark.svg"
              alt=""
              width={28}
              height={28}
              className="opacity-90"
            />
            <p className="font-display text-lg tracking-[-0.02em]">Kyvelon</p>
          </div>
          <p className="text-sm text-white/50">
            © 2026 Kyvelon · Digital systems from Athens
          </p>
        </div>
      </footer>
    </>
  );
}
