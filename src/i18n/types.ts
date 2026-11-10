import type { CubeFaceId } from "@/lib/cube-faces";

export type FaceCopy = {
  label: string;
  short: string;
  title: string;
  copy: string;
  detail: string[];
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    taglineLead: string;
    taglineAccent: string;
  };
  cube: {
    hint: string;
    activeFace: string;
    enterFace: string;
    facesNav: string;
    backToCube: string;
    backHome: string;
    faceLabel: string;
    briefFace: string;
    dragAria: string;
  };
  faces: Record<CubeFaceId, FaceCopy>;
  contactForm: {
    name: string;
    email: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    send: string;
    sent: string;
    error: string;
  };
  story: {
    originEyebrow: string;
    originTitle: string;
    originBody: string;
    originPoints: { title: string; body: string }[];
    connectEyebrow: string;
    connectTitle: string;
    connectBody: string;
    threads: { from: string; to: string; body: string }[];
    methodEyebrow: string;
    methodTitle: string;
    methodBody: string;
    steps: { greek: string; title: string; body: string }[];
    closeEyebrow: string;
    closeTitle: string;
    closeBody: string;
    closeCta: string;
  };
  people: {
    eyebrow: string;
    title: string;
    body: string;
    founderRole: string;
    founderName: string;
    founderBio: string;
    founderQuote: string;
    founderMeta: string;
    founderCta: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    body: string;
  };
  terms: {
    eyebrow: string;
    title: string;
    updated: string;
    sections: { title: string; body: string }[];
  };
  footer: {
    blurb: string;
    faces: string;
    company: string;
    contact: string;
    theCube: string;
    people: string;
    terms: string;
    startBrief: string;
    method: string;
    location: string;
    rights: string;
    tag: string;
  };
  lang: {
    label: string;
  };
};
