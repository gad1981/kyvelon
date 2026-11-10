import type { Metadata } from "next";
import { Syne, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
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
  metadataBase: new URL("https://kyvelon.local"),
  openGraph: {
    title: "Kyvelon — Digital systems built as cubes",
    description:
      "Software. Websites. Automation. Digital services. Structured like κύβος — every face precise, every system complete.",
    type: "website",
    locale: "en_GB",
  },
  icons: {
    icon: "/cube-mark.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="font-body relative min-h-full">
        <div className="noise-overlay fixed inset-0 z-[60] pointer-events-none" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
