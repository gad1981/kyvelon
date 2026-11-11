import type { CubeFaceId } from "@/lib/cube-faces";

export type CaseStudy = {
  slug: string;
  /** Dictionary key under Dictionary for case copy */
  dictKey: "caseFeedbackLoop";
  hero: string;
  faces: CubeFaceId[];
};

/** Published case studies — Feedback Loop is one of them, not the Work destination. */
export const CASES: CaseStudy[] = [
  {
    slug: "feedback-loop",
    dictKey: "caseFeedbackLoop",
    hero: "/work/feedback-loop/hero.png",
    faces: ["software", "websites", "automation", "services", "method"],
  },
];

export function getCaseSlugs() {
  return CASES.map((c) => c.slug);
}
