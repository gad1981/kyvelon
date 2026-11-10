import type { Metadata } from "next";
import {
  Syne,
  Manrope,
  Noto_Sans,
  Noto_Sans_Arabic,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const greek = Noto_Sans({
  variable: "--font-greek",
  subsets: ["greek", "latin"],
  weight: ["400", "500", "600", "700"],
});

const arabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kyvelon — Digital systems built as cubes",
    template: "%s · Kyvelon",
  },
  description:
    "Kyvelon builds software, websites, automation, and digital services from Athens. Founded by George Gad — structured systems for brands that need to move.",
  icons: {
    icon: "/cube-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${greek.variable} ${arabic.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="font-body relative min-h-full">
        <div
          className="noise-overlay pointer-events-none fixed inset-0 z-[60]"
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
