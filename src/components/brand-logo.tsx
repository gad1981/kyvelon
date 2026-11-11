import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href: string;
  /** Full color on light grounds; solid white on dark grounds. */
  tone?: "color" | "white";
  className?: string;
  /** Wordmark width in px (mark scales with it). */
  width?: number;
  priority?: boolean;
};

/**
 * Kyvelon wordmark. On dark surfaces use tone="white" — a total white invert,
 * not a partial wash that leaves navy strokes invisible.
 */
export function BrandLogo({
  href,
  tone = "color",
  className,
  width = 148,
  priority = false,
}: BrandLogoProps) {
  const height = Math.round((width * 278) / 1256);

  return (
    <Link href={href} className={cn("inline-block", className)}>
      <Image
        src="/kyvelon-logo.png"
        alt="Kyvelon"
        width={1256}
        height={278}
        priority={priority}
        className={cn(
          "h-auto",
          tone === "white" && "brightness-0 invert",
        )}
        style={{ width, height: "auto", maxHeight: height }}
      />
    </Link>
  );
}
