import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "#faces", label: "Faces" },
  { href: "#method", label: "Method" },
  { href: "#founder", label: "Founder" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link href="/" className="group relative block w-[148px] sm:w-[176px]">
          <Image
            src="/kyvelon-logo.png"
            alt="Kyvelon"
            width={354}
            height={177}
            priority
            className="h-auto w-full transition duration-500 group-hover:brightness-110"
          />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[0.78rem] tracking-[0.18em] text-navy/70 uppercase transition hover:text-electric"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="inline-flex h-10 items-center justify-center bg-navy px-4 text-[0.72rem] tracking-[0.16em] text-white uppercase transition hover:bg-electric"
        >
          Start a build
        </a>
      </div>
    </header>
  );
}
