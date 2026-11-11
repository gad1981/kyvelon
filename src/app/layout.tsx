import type { Metadata } from "next";
import {
  Syne,
  Manrope,
  Noto_Sans,
  Noto_Sans_Arabic,
  Geist_Mono,
} from "next/font/google";
import { Analytics } from "@/components/analytics";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kyvelon.com",
  ),
  title: {
    default: "Kyvelon — Digital systems built as cubes",
    template: "%s · Kyvelon",
  },
  description:
    "Kyvelon builds software, websites, automation, and digital services from Athens. Founded by George Gad — structured systems for brands that need to move.",
  applicationName: "Kyvelon",
  authors: [{ name: "Kyvelon", url: "https://www.kyvelon.com" }],
  creator: "Kyvelon",
  publisher: "Kyvelon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/cube-mark.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Kyvelon",
    title: "Kyvelon — Digital systems built as cubes",
    description:
      "Kyvelon builds software, websites, automation, and digital services from Athens. Founded by George Gad — structured systems for brands that need to move.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyvelon — Digital systems built as cubes",
    description:
      "Kyvelon builds software, websites, automation, and digital services from Athens. Founded by George Gad — structured systems for brands that need to move.",
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${greek.variable} ${arabic.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="font-body relative min-h-full">
        <Analytics />
        <div
          className="noise-overlay pointer-events-none fixed inset-0 z-[60]"
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
