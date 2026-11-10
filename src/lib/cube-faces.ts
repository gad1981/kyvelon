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
  detail: string[];
  tone: "navy" | "electric" | "deep" | "mid";
};

/** Six faces of the Kyvelon cube — the whole-screen navigation surface */
export const CUBE_FACES: Record<CubeFaceId, CubeFace> = {
  software: {
    id: "software",
    label: "Software",
    short: "SOFT",
    title: "Software creation",
    copy: "Custom products and platforms engineered as durable building blocks.",
    detail: [
      "Clear architecture, sharp UX, room to scale.",
      "From concept through launch — products built to hold under pressure.",
      "Athens-based delivery for EMEA brands that need speed without chaos.",
    ],
    tone: "deep",
  },
  websites: {
    id: "websites",
    label: "Websites",
    short: "WEB",
    title: "Websites & digital products",
    copy: "Brand-led sites and product surfaces that convert.",
    detail: [
      "Fast, structured, ready for the channels your customers live in.",
      "Design systems that feel like Kyvelon: geometric, precise, memorable.",
      "Launch surfaces that carry strategy into the browser.",
    ],
    tone: "electric",
  },
  automation: {
    id: "automation",
    label: "Automation",
    short: "AUTO",
    title: "Automation",
    copy: "Workflows that remove friction and keep teams moving.",
    detail: [
      "CRM flows, content ops, and AI-assisted execution.",
      "Systems that connect data, creative, and delivery.",
      "Less manual drag — more compound growth.",
    ],
    tone: "mid",
  },
  services: {
    id: "services",
    label: "Services",
    short: "SERV",
    title: "Digital services",
    copy: "Strategy through delivery for brands that need results.",
    detail: [
      "Omnichannel growth, digital innovation, and go-to-market.",
      "16+ years across EMEA — P&G, Nestlé, Essity, and more.",
      "Led by George Gad · georgegad.com · Athens, Greece.",
    ],
    tone: "navy",
  },
  method: {
    id: "method",
    label: "Method",
    short: "κύβος",
    title: "The κύβος method",
    copy: "Structure → Faces → Assemble. Build like a cube, not a pile.",
    detail: [
      "δομή · Structure — define goals, users, data, constraints.",
      "έδρες · Faces — cut each capability with precision, then stress-test.",
      "σύνθεση · Assemble — lock faces into one system. Launch, measure, iterate.",
    ],
    tone: "electric",
  },
  contact: {
    id: "contact",
    label: "Contact",
    short: "BRIEF",
    title: "Brief the next cube",
    copy: "Tell us what face you need first. We reply from Athens.",
    detail: [
      "georgiosgad@gmail.com",
      "+30 6937 027 555",
      "georgegad.com · Athens, Greece",
    ],
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
