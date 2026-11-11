import type { CubeFaceId } from "@/lib/cube-faces";

export type FaceCopy = {
  label: string;
  short: string;
  title: string;
  copy: string;
  detail: string[];
  /** Short labels for the animated face graph (maps 1:1 to detail beats). */
  graph: string[];
  /** Optional hub / center label on the face graph (e.g. automation). */
  graphHub?: string;
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
    soundOn: string;
    soundOff: string;
    soundHint: string;
    entering: string;
    inside: string;
    sideCopy: string;
    sideGraph: string;
    toGraph: string;
    toCopy: string;
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
  work: {
    eyebrow: string;
    title: string;
    body: string;
    readCase: string;
    visitLive: string;
    backToWork: string;
    backHome: string;
    facesUsed: string;
  };
  insights: {
    eyebrow: string;
    title: string;
    body: string;
    readArticle: string;
    backToInsights: string;
    minRead: string;
    sources: string;
    takeaway: string;
    relatedFace: string;
    enterFace: string;
    signalGraph: string;
  };
  caseFeedbackLoop: {
    eyebrow: string;
    product: string;
    urlLabel: string;
    url: string;
    title: string;
    summary: string;
    heroSupport: string;
    challengeEyebrow: string;
    challengeTitle: string;
    challengeBody: string;
    challengeBefore: string;
    challengeAfter: string;
    structureEyebrow: string;
    structureTitle: string;
    structureBody: string;
    systemEyebrow: string;
    systemTitle: string;
    systemBody: string;
    systemPanels: { title: string; body: string }[];
    loopEyebrow: string;
    loopTitle: string;
    loopSteps: { title: string; body: string }[];
    facesEyebrow: string;
    faces: { face: string; short: string; body: string }[];
    assembleEyebrow: string;
    assembleTitle: string;
    assembleBody: string;
    outcomes: { label: string; body: string }[];
    stackEyebrow: string;
    stackTitle: string;
    stackItems: string[];
    closeTitle: string;
    closeBody: string;
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
    work: string;
    insights: string;
    terms: string;
    startBrief: string;
    method: string;
    location: string;
    rights: string;
    tag: string;
  };
  cookies: {
    eyebrow: string;
    title: string;
    body: string;
    policy: string;
    accept: string;
    reject: string;
  };
  lang: {
    label: string;
  };
  menu: {
    open: string;
    close: string;
    title: string;
  };
};
