import Image from "next/image";
import Link from "next/link";
import { FACE_ORDER, CUBE_FACES } from "@/lib/cube-faces";

const companyLinks = [
  { href: "#cube", label: "The cube" },
  { href: "https://georgegad.com", label: "Founder · georgegad.com", external: true },
  { href: "mailto:georgiosgad@gmail.com", label: "Start a brief" },
];

export function SiteFooter() {
  return (
    <footer id="site-footer" className="relative z-10 border-t border-white/10 bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Link href="#cube" className="inline-flex items-center gap-3">
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
            Digital systems built as cubes — software, websites, automation, and
            digital services from Athens.
          </p>
        </div>

        <div>
          <p className="text-[0.68rem] tracking-[0.2em] text-electric-soft uppercase">
            Faces
          </p>
          <ul className="mt-4 space-y-2.5">
            {FACE_ORDER.filter((id) => id !== "contact" && id !== "method").map(
              (id) => (
                <li key={id}>
                  <a
                    href="#cube"
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {CUBE_FACES[id].title}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <p className="text-[0.68rem] tracking-[0.2em] text-electric-soft uppercase">
            Company
          </p>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#cube"
                className="text-sm text-white/65 transition hover:text-white"
              >
                {CUBE_FACES.method.title}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[0.68rem] tracking-[0.2em] text-electric-soft uppercase">
            Contact
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/65">
            <li>Athens, Greece</li>
            <li>
              <a
                href="mailto:georgiosgad@gmail.com"
                className="transition hover:text-white"
              >
                georgiosgad@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+306937027555" className="transition hover:text-white">
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
            <li>
              <Link
                href="https://linkedin.com/in/georgegad"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Kyvelon. All rights reserved.</p>
          <p className="tracking-[0.12em] uppercase">
            κύβος · Digital systems from Athens
          </p>
        </div>
      </div>
    </footer>
  );
}
