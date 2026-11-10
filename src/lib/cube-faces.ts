export type CubeFaceId =
  | "software"
  | "websites"
  | "automation"
  | "services"
  | "method"
  | "contact";

export type CubeFace = {
  id: CubeFaceId;
  label: string;
  short: string;
  title: string;
  copy: string;
  href: string;
  tone: "navy" | "electric" | "deep" | "mid";
};

/** Six faces of the Kyvelon cube — the real navigation surface */
export const CUBE_FACES: Record<CubeFaceId, CubeFace> = {
  software: {
    id: "software",
    label: "Software",
    short: "SOFT",
    title: "Software creation",
    copy: "Custom products and platforms engineered as durable building blocks — clear architecture, sharp UX, room to scale.",
    href: "#face-software",
    tone: "deep",
  },
  websites: {
    id: "websites",
    label: "Websites",
    short: "WEB",
    title: "Websites & digital products",
    copy: "Brand-led sites and product surfaces that convert. Fast, structured, and ready for the channels your customers live in.",
    href: "#face-websites",
    tone: "electric",
  },
  automation: {
    id: "automation",
    label: "Automation",
    short: "AUTO",
    title: "Automation",
    copy: "Workflows that remove friction: CRM flows, content ops, AI-assisted execution, and systems that keep teams moving.",
    href: "#face-automation",
    tone: "mid",
  },
  services: {
    id: "services",
    label: "Services",
    short: "SERV",
    title: "Digital services",
    copy: "Strategy through delivery — omnichannel growth, digital innovation, and go-to-market for brands that need results.",
    href: "#face-services",
    tone: "navy",
  },
  method: {
    id: "method",
    label: "Method",
    short: "κύβος",
    title: "The κύβος method",
    copy: "Structure → Faces → Assemble. Build like a cube, not a pile — every edge intentional.",
    href: "#method",
    tone: "electric",
  },
  contact: {
    id: "contact",
    label: "Contact",
    short: "BRIEF",
    title: "Brief the next cube",
    copy: "Tell us what face you need first. We reply from Athens.",
    href: "#contact",
    tone: "navy",
  },
};

export const FACE_ORDER: CubeFaceId[] = [
  "software",
  "websites",
  "automation",
  "services",
  "method",
  "contact",
];

/** Target rotations that bring each face forward */
export const FACE_ROTATIONS: Record<CubeFaceId, { x: number; y: number }> = {
  software: { x: 0, y: 0 },
  websites: { x: 0, y: -90 },
  automation: { x: 0, y: 180 },
  services: { x: 0, y: 90 },
  method: { x: -90, y: 0 },
  contact: { x: 90, y: 0 },
};
