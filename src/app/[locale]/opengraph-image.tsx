import { renderOgImage } from "@/lib/og-image";

export const alt = "Kyvelon — Digital systems built as cubes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage();
}
