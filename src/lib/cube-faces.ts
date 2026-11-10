export type CubeFaceId =
  | "software"
  | "websites"
  | "automation"
  | "services"
  | "method"
  | "contact";

export const FACE_ORDER: CubeFaceId[] = [
  "software",
  "websites",
  "automation",
  "services",
  "method",
  "contact",
];

export const SERVICE_FACE_IDS: CubeFaceId[] = [
  "software",
  "websites",
  "automation",
  "services",
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
