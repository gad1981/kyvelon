import { notFound } from "next/navigation";
import { FaceApp } from "@/components/face-app";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { FACE_ORDER, type CubeFaceId } from "@/lib/cube-faces";
import { buildPageMetadata } from "@/lib/seo";

function isFace(value: string): value is CubeFaceId {
  return FACE_ORDER.includes(value as CubeFaceId);
}

export function generateStaticParams() {
  const locales = ["en", "el", "ar"];
  return locales.flatMap((locale) =>
    FACE_ORDER.map((face) => ({ locale, face })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; face: string }>;
}) {
  const { locale: raw, face } = await params;
  if (!isLocale(raw) || !isFace(face)) return {};
  const t = await getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    path: `/faces/${face}`,
    title: t.faces[face].title,
    description: t.faces[face].copy,
  });
}

export default async function FacePage({
  params,
}: {
  params: Promise<{ locale: string; face: string }>;
}) {
  const { locale: raw, face } = await params;
  if (!isLocale(raw) || !isFace(face)) notFound();
  const locale = raw as Locale;
  const t = await getDictionary(locale);

  return <FaceApp locale={locale} t={t} faceId={face} />;
}
