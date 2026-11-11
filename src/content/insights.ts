import type { CubeFaceId } from "@/lib/cube-faces";

export type InsightStat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  source: string;
};

export type InsightSource = {
  label: string;
  href: string;
};

export type InsightSection = {
  heading: string;
  body: string[];
};

export type InsightArticle = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date
  readingMinutes: number;
  keywords: string[];
  face: CubeFaceId;
  heroTone: "navy" | "electric" | "deep" | "grid" | "pulse";
  stats: InsightStat[];
  sections: InsightSection[];
  takeaway: string;
  sources: InsightSource[];
};

/** Articles ordered newest → oldest, one week apart. */
export const INSIGHTS: InsightArticle[] = [
  {
    slug: "genai-pocs-fail-production",
    title: "Why most GenAI proofs of concept never reach production",
    excerpt:
      "Search interest in artificial intelligence solutions keeps rising — yet the hard problem is not the demo. It is the system that must hold after the slide deck ends.",
    publishedAt: "2026-11-04",
    readingMinutes: 9,
    keywords: [
      "GenAI production",
      "AI proof of concept",
      "custom software development",
      "AI automation",
    ],
    face: "software",
    heroTone: "navy",
    stats: [
      {
        value: 88,
        suffix: "%",
        label: "Organizations using AI in ≥1 function",
        source: "McKinsey State of AI 2025",
      },
      {
        value: 7,
        suffix: "%",
        label: "Report AI fully scaled enterprise-wide",
        source: "McKinsey",
      },
      {
        value: 13,
        suffix: "%",
        label: "EMEA GenAI PoCs that reached production (prior year)",
        source: "IDC EMEA FutureScape",
      },
    ],
    sections: [
      {
        heading: "The search signal is not the same as readiness",
        body: [
          "Google Trends and related market tracking show sustained interest in artificial intelligence solutions, business automation software, and digital transformation services through 2025 into 2026. Buyers are looking. That does not mean their stacks can absorb what they buy.",
          "McKinsey’s 2025 survey found 88% of respondents saying their organizations use AI in at least one business function — up from the prior year — while only about 7% report AI fully scaled across the enterprise. The gap between “we use AI” and “AI is a production system” is where most budgets burn.",
          "IDC’s EMEA FutureScape framing is even sharper on the PoC problem: a small minority of GenAI-focused proofs of concept made it into production in the prior twelve months. Experimentation is cheap relative to integration. Integration is where architecture, data contracts, security, and ownership collide.",
        ],
      },
      {
        heading: "What actually breaks between demo and deploy",
        body: [
          "PoCs succeed when the input is curated, the output is judged by a friendly audience, and failure is invisible. Production fails when latency, access control, audit trails, model drift, and human escalation paths become non-negotiable.",
          "Three structural failures recur. First, the model is bolted onto a process that was never redesigned — so the agent or assistant inherits broken handoffs. Second, data is incomplete, inconsistent, or legally constrained, so quality collapses outside the lab. Third, nobody owns the edge between software, website, automation, and service operations — so the “AI feature” has nowhere durable to live.",
          "Gartner’s 2025 survey of IT application leaders adds another constraint: while many organizations pilot some form of AI agent, only 15% were considering, piloting, or deploying fully autonomous agents. Governance, maturity, and agent sprawl keep autonomy gated — correctly so.",
        ],
      },
      {
        heading: "Treat the PoC as a face of a cube, not a floating experiment",
        body: [
          "A durable AI capability needs a volume first: goals, users, constraints, and the faces that must meet. The product face holds the workflow. The web face holds trust and intake. The automation face holds the agent loop. The services face holds strategy, measurement, and human escalation.",
          "If your PoC cannot name those edges — what data crosses them, who is accountable, what happens when the model is wrong — it is not ready for production. It is a presentation.",
          "Companies that ship are not the ones with the flashiest demos. They are the ones who design the contracts before the model ever sees a customer.",
        ],
      },
    ],
    takeaway:
      "Stop optimizing demos. Design the production geometry — structure, faces, and assemble — before the next GenAI pilot starts.",
    sources: [
      {
        label: "McKinsey — The State of AI: Global Survey 2025",
        href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2025",
      },
      {
        label: "McKinsey — AI at work but not at scale",
        href: "https://www.mckinsey.com/featured-insights/charts/ai-at-work-but-not-at-scale",
      },
      {
        label: "Gartner — Fully autonomous AI agents (Sept 2025)",
        href: "https://www.gartner.com/en/newsroom/press-releases/2025-09-30-gartner-survey-finds-just-15-percent-of-it-application-leaders-are-considering-piloting-or-deploying-fully-autonomous-ai-agents",
      },
      {
        label: "IDC — EMEA FutureScape 2026",
        href: "https://info.idc.com/rs/081-ATC-910/images/EUR-IDC-RE-2026-EMEA-FutureScape.pdf",
      },
    ],
  },
  {
    slug: "agentic-marketing-automation",
    title: "Agentic marketing automation: from chatbots to systems that act",
    excerpt:
      "Marketing teams are searching past “AI content tools.” The rising intent is agents that plan, execute, and report — with humans on the edges that matter.",
    publishedAt: "2026-10-28",
    readingMinutes: 10,
    keywords: [
      "agentic AI marketing",
      "marketing automation",
      "AI agents",
      "workflow automation",
    ],
    face: "automation",
    heroTone: "electric",
    stats: [
      {
        value: 23,
        suffix: "%",
        label: "Scaling an agentic AI system somewhere",
        source: "McKinsey State of AI 2025",
      },
      {
        value: 39,
        suffix: "%",
        label: "Experimenting with AI agents",
        source: "McKinsey",
      },
      {
        value: 75,
        suffix: "%",
        label: "Piloting or deploying some form of AI agent",
        source: "Gartner 2025",
      },
    ],
    sections: [
      {
        heading: "Why “automation” search intent is changing",
        body: [
          "Market scans of Google Trends-style interest through 2025–2026 show business automation software among the strongest risers alongside AI solutions and digital transformation services. In marketing specifically, the conversation in EMEA has shifted from one-shot generation to agents that carry ongoing responsibility.",
          "McKinsey reports 23% of organizations scaling agentic AI somewhere in the enterprise, with another 39% experimenting. That is early — and exactly when architecture choices either compound or collapse.",
          "Greek and EMEA marketing coverage of 2026 platform shifts (Google AI Mode / Overviews, agent tooling, conversational search) points the same direction: teams need systems that watch signals, propose actions, and execute under policy — not another chat window.",
        ],
      },
      {
        heading: "The failure mode: agents without edges",
        body: [
          "Agent sprawl is real. When every team spins a private agent against CRM, ads, and support queues, you get contradictory messages, unlogged spends, and no single source of truth.",
          "Gartner found most leaders expect significant productivity impact from agents, while few expect full autonomy soon. The mature pattern is supervised agency: agents operate inside contracts — budgets, brand rules, escalation paths — and humans own the irreversible moves.",
          "Technically, that means event streams from the website and product must feed workflows with clear schemas. Marketing automation that cannot read first-party events, or cannot write auditable actions back to CRM, is not agentic. It is a script with a better UI.",
        ],
      },
      {
        heading: "Build the automation face as a locked system",
        body: [
          "An agentic marketing face should answer four questions. What signals enter? What actions are allowed? What must a human approve? What metrics close the loop?",
          "Then connect those answers to the other faces: product logic that produces clean events, a website that captures intent without leaking trust, and a services layer that sets campaign strategy so the machine is steered — not abandoned.",
          "This is how automation stops being a tool purchase and becomes a durable capability.",
        ],
      },
    ],
    takeaway:
      "Agentic marketing is not a chatbot upgrade. It is a governed workflow system with edges designed on purpose.",
    sources: [
      {
        label: "McKinsey — The State of AI: Global Survey 2025",
        href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2025",
      },
      {
        label: "McKinsey — Seizing the agentic AI advantage",
        href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage",
      },
      {
        label: "Gartner — AI agents survey (Sept 2025)",
        href: "https://www.gartner.com/en/newsroom/press-releases/2025-09-30-gartner-survey-finds-just-15-percent-of-it-application-leaders-are-considering-piloting-or-deploying-fully-autonomous-ai-agents",
      },
    ],
  },
  {
    slug: "custom-software-vs-nocode-ai",
    title: "Custom software vs no-code when AI enters the stack",
    excerpt:
      "No-code accelerates demos. Custom software absorbs risk. The buyers searching “custom software development” in 2026 are usually deciding where AI is allowed to live.",
    publishedAt: "2026-10-21",
    readingMinutes: 8,
    keywords: [
      "custom software development",
      "no-code AI",
      "AI MVP",
      "software architecture",
    ],
    face: "software",
    heroTone: "grid",
    stats: [
      {
        value: 80,
        suffix: "%+",
        label: "Companies with GenAI but little earnings impact (paradox)",
        source: "McKinsey agentic AI analysis",
      },
      {
        value: 90,
        suffix: "%",
        label: "Vertical GenAI use cases stuck in pilot mode (approx.)",
        source: "McKinsey",
      },
      {
        value: 15,
        suffix: "%",
        label: "Leaders on fully autonomous agents path",
        source: "Gartner",
      },
    ],
    sections: [
      {
        heading: "The buyer question behind the keyword",
        body: [
          "“Custom software development” remains a high-intent commercial query because it maps to risk: ownership, security, scale, and differentiation. No-code and low-code win when the workflow is standard and the blast radius is small.",
          "When AI enters — copilots, retrieval, agents — the blast radius expands. Prompt injection, data leakage, incorrect actions, and vendor lock-in stop being theoretical. The stack must encode policy, not just screens.",
          "McKinsey’s “gen AI paradox” framing is useful here: widespread deployment of horizontal copilots with diffuse benefits, while higher-impact vertical use cases remain stuck in pilots. Escaping that paradox usually requires software that can own a vertical workflow end to end.",
        ],
      },
      {
        heading: "A decision framework that holds under pressure",
        body: [
          "Use no-code when the process is commodity, the data is low-sensitivity, and you can leave without rewriting your business. Use custom software when the workflow is your margin, when integrations are the product, or when AI actions must be audited and reversible by design.",
          "Hybrid is legitimate: no-code at the edges for speed, custom core for contracts. The mistake is letting the edge become the core because it shipped first.",
          "Architecture, UX, and scale are not phases you bolt on later. They are the volume of the cube — defined before faces are cut.",
        ],
      },
      {
        heading: "What “AI-ready custom software” actually means",
        body: [
          "It means typed interfaces between humans, models, and systems of record. It means observability for prompts, tools, and outcomes. It means product surfaces that make confidence and uncertainty visible — not a black box button labeled “magic.”",
          "If your AI feature cannot fail safely, it should not be in the customer path. That is an engineering statement, not a brand statement.",
        ],
      },
    ],
    takeaway:
      "Choose no-code for speed on commodity edges. Choose custom software where AI actions, data, and differentiation must be owned.",
    sources: [
      {
        label: "McKinsey — Seizing the agentic AI advantage",
        href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage",
      },
      {
        label: "Gartner — Autonomous AI agents survey",
        href: "https://www.gartner.com/en/newsroom/press-releases/2025-09-30-gartner-survey-finds-just-15-percent-of-it-application-leaders-are-considering-piloting-or-deploying-fully-autonomous-ai-agents",
      },
    ],
  },
  {
    slug: "disconnected-digital-faces",
    title: "Disconnected digital faces: when product, web, automation, and services don’t lock",
    excerpt:
      "Companies do not fail because they lack tools. They fail because software, website, automation, and strategy float as separate projects with no shared geometry.",
    publishedAt: "2026-10-14",
    readingMinutes: 9,
    keywords: [
      "digital transformation services",
      "product and website integration",
      "marketing operations",
      "systems thinking",
    ],
    face: "method",
    heroTone: "deep",
    stats: [
      {
        value: 51,
        suffix: "%",
        label: "EMEA orgs still “opportunistic” on AI maturity",
        source: "IDC EMEA FutureScape",
      },
      {
        value: 32,
        suffix: "%",
        label: "Reached “repeatable” AI stage",
        source: "IDC",
      },
      {
        value: 8,
        suffix: "%",
        label: "At “managed” AI maturity",
        source: "IDC",
      },
    ],
    sections: [
      {
        heading: "The symptom buyers feel",
        body: [
          "A product launches with incomplete CRM hooks. The website captures leads into a spreadsheet. Automation sends emails that contradict support. Strategy buys ads into a funnel nobody owns. Each vendor demo looked fine. The system does not.",
          "This is the disconnected-faces problem. Digital work was procured as projects, not as a body with edges.",
          "IDC’s EMEA maturity picture — most organizations opportunistic, few managed — maps cleanly onto this pattern: isolated wins without an enterprise structure that can scale them.",
        ],
      },
      {
        heading: "Edges are contracts",
        body: [
          "Where software meets website, the contract is identity, state, and trust. Where website meets automation, the contract is events and consent. Where automation meets services, the contract is strategy and escalation. Where services meet software, the contract is the next product face.",
          "If those contracts are informal, every hire and every tool change reopens the wound. Teams “align in Slack” because the system cannot speak for itself.",
          "A cube method forces the uncomfortable work early: define the volume, cut faces with precision, then assemble so nothing floats alone.",
        ],
      },
      {
        heading: "How to diagnose your cube in one workshop",
        body: [
          "Map one customer journey across all four service faces. For each handoff, write the data fields, the owner, the SLA, and the failure mode. The empty cells are your backlog — not another feature request.",
          "Then fund the edges before the decorations. A beautiful site on a broken pipeline is marketing debt. A powerful agent on unclean events is operational debt.",
        ],
      },
    ],
    takeaway:
      "Buy fewer floating tools. Design the edges where product, web, automation, and services lock — then build the face that unlocks the rest.",
    sources: [
      {
        label: "IDC — EMEA FutureScape 2026",
        href: "https://info.idc.com/rs/081-ATC-910/images/EUR-IDC-RE-2026-EMEA-FutureScape.pdf",
      },
      {
        label: "McKinsey — State of AI 2025",
        href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2025",
      },
    ],
  },
  {
    slug: "workflow-automation-failure-modes",
    title: "Workflow automation failure modes: RPA, APIs, and the edge problem",
    excerpt:
      "Automation search interest is surging. So are silent failures — brittle bots, unowned APIs, and “set and forget” flows that break the moment a form field changes.",
    publishedAt: "2026-10-07",
    readingMinutes: 8,
    keywords: [
      "workflow automation",
      "business automation software",
      "RPA",
      "API integration",
    ],
    face: "automation",
    heroTone: "pulse",
    stats: [
      {
        value: 50,
        suffix: "%+",
        label: "Businesses already using RPA (survey cited in trend reporting)",
        source: "Industry survey via Exploding Topics / RPA research",
      },
      {
        value: 28,
        suffix: "%",
        label: "EMEA orgs declaring agentic AI use (IDC)",
        source: "IDC EMEA FutureScape",
      },
      {
        value: 50,
        suffix: "%",
        label: "AI projects delivering measurable outcomes (approx., IDC)",
        source: "IDC",
      },
    ],
    sections: [
      {
        heading: "Why automation projects look successful until they are not",
        body: [
          "RPA and zap-style connectors create fast wins on repetitive tasks: data entry, notifications, lead routing. The failure arrives later — when the UI changes, the vendor rate-limits, or the exception path was never designed.",
          "API-first automation is more durable than UI scraping, but only if schemas are versioned, errors are observable, and humans have a queue for the cases machines should not decide.",
          "Half of AI projects delivering measurable outcomes is not a victory lap. It is a reminder that automation without measurement is theater.",
        ],
      },
      {
        heading: "The edge problem",
        body: [
          "Automation lives at the edges between systems. Those edges are where consent, identity, and commercial state change. If marketing automation can write to CRM without validation, you will invent customers. If support automation can refund without limits, you will invent losses.",
          "Design automation as a face with contracts: allowed actions, idempotency keys, retries, dead-letter queues, and clear ownership. Then connect it to product and web events so the machine is not guessing.",
        ],
      },
      {
        heading: "A production checklist before the next bot ships",
        body: [
          "Can you replay yesterday’s runs? Can you explain why an action fired? Can you stop the flow in under a minute? Can a non-engineer see the health of the system? If any answer is no, you own a liability, not an asset.",
        ],
      },
    ],
    takeaway:
      "Automate the contract, not just the click. Observable edges beat silent bots.",
    sources: [
      {
        label: "IDC — EMEA FutureScape 2026",
        href: "https://info.idc.com/rs/081-ATC-910/images/EUR-IDC-RE-2026-EMEA-FutureScape.pdf",
      },
      {
        label: "Exploding Topics — Software development trends (RPA context)",
        href: "https://explodingtopics.com/blog/software-development-trends",
      },
    ],
  },
  {
    slug: "first-party-data-websites",
    title: "First-party data after cookies: what your website must become",
    excerpt:
      "As third-party signals decay, the website stops being a brochure. It becomes the primary sensor for trust, consent, and commercial intent.",
    publishedAt: "2026-09-30",
    readingMinutes: 9,
    keywords: [
      "first-party data",
      "website conversion",
      "digital products",
      "CRM integration",
    ],
    face: "websites",
    heroTone: "electric",
    stats: [
      {
        value: 88,
        suffix: "%",
        label: "Orgs using AI somewhere — still starving for clean signals",
        source: "McKinsey",
      },
      {
        value: 79,
        suffix: "%",
        label: "Using gen AI in ≥1 function (2025)",
        source: "McKinsey",
      },
      {
        value: 1,
        suffix: "%",
        label: "Enterprises viewing gen AI strategy as mature (cited)",
        source: "McKinsey Superagency / related research",
      },
    ],
    sections: [
      {
        heading: "The marketing trend landing on the web face",
        body: [
          "EMEA digital marketing guidance for 2026 repeatedly elevates first-party data, hyper-personalization, and measurement integrity as platforms decide more of delivery. Your paid media can only optimize against what you can truthfully attribute.",
          "That makes the website a system of record for intent — forms, product tours, authenticated spaces, feedback loops — not a static campaign landing farm.",
          "If AI agents will later act on those signals, garbage in still means garbage out. The web face is where data quality begins.",
        ],
      },
      {
        heading: "Issues companies create for themselves",
        body: [
          "Shadow forms that never reach CRM. Consent banners that block analytics while ads still fire. Separate brand sites and product apps with no shared identity. Content that ranks but cannot convert because the next step is a PDF and a hope.",
          "These are not “web design” problems. They are system problems that look like design.",
        ],
      },
      {
        heading: "Build the surface as an edge of the cube",
        body: [
          "Define the events that matter: view, intent, qualify, convert, expand. Wire them into automation with schemas. Reflect state back into the UI so users see progress. Then let services steer campaigns against real outcomes instead of vanity metrics.",
          "A website that cannot speak to product and automation is incomplete — regardless of how it looks.",
        ],
      },
    ],
    takeaway:
      "Treat the website as the first-party sensor of the cube — consent, identity, events — or your AI and ads will optimize noise.",
    sources: [
      {
        label: "McKinsey — State of AI 2025",
        href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2025",
      },
      {
        label: "GIM Agency — Digital marketing trends 2026 (GR)",
        href: "https://www.gimagency.gr/blog/proothisi-istoselidon/digital-marketing-trends-2026/",
      },
    ],
  },
  {
    slug: "geo-ai-overviews-b2b",
    title: "GEO and AI Overviews: how B2B sites earn the citation, not just the click",
    excerpt:
      "Search is becoming an answer layer. If your expertise is not structured, sourced, and specific, agents and overviews will summarize someone else.",
    publishedAt: "2026-09-23",
    readingMinutes: 10,
    keywords: [
      "generative engine optimization",
      "AI Overviews SEO",
      "B2B content strategy",
      "AI search",
    ],
    face: "websites",
    heroTone: "grid",
    stats: [
      {
        value: 2026,
        label: "Year AI Mode / answer layers reshape EMEA search habits",
        source: "Industry coverage (Google / regional analysis)",
      },
      {
        value: 10,
        suffix: "+",
        label: "Markets expanding AI-answer ad surfaces (late 2026 reporting)",
        source: "Regional digital marketing analysis",
      },
      {
        value: 0,
        suffix: "",
        label: "Shortcut: no special GEO hack replaces clear, sourced expertise",
        source: "Google guidance paraphrased via industry reporting",
      },
    ],
    sections: [
      {
        heading: "What changed in the buyer journey",
        body: [
          "Users still search. Increasingly they also ask chat interfaces and receive synthesized overviews before a click. Regional 2026 coverage of Google Marketing Live EMEA and AI Mode availability describes a conversational, multimodal search surface — and a higher bar for being the source that gets cited.",
          "Generative Engine Optimization (GEO) is less a bag of tricks than a discipline: problem-solving content, technical clarity, verifiable sources, and precise data. The same foundations that make pages useful to humans make them usable to models.",
        ],
      },
      {
        heading: "What B2B sites get wrong",
        body: [
          "Thin service pages that say everything and prove nothing. Unsourced statistics. No author or company accountability. No structured answers to the actual jobs buyers search for — “why PoCs fail,” “how to integrate agents with CRM,” “custom vs no-code for AI.”",
          "If your page cannot stand as a primary source, it will not be selected as one.",
        ],
      },
      {
        heading: "A practical GEO checklist for service companies",
        body: [
          "Publish deep pieces against high-intent problems you can deliver. Cite primary research. Keep claims dated and specific. Connect every article to a real face of your system — software, web, automation, services — with a clear next step.",
          "Traffic without qualification is vanity. Traffic that arrives with the right problem statement is pipeline.",
        ],
      },
    ],
    takeaway:
      "Write like a source of record. Structure, cite, and connect content to the cube face you can actually deliver.",
    sources: [
      {
        label: "Advertising.gr — Google Marketing Live EMEA 2026 coverage",
        href: "https://www.advertising.gr/digital-mobile/google-marketing-live-emea-2026-search-creators-kai-commerce-stin-epoxi-tis-texnitis-noi-osynis",
      },
      {
        label: "CNCTECH — 2026 digital marketing changes",
        href: "https://www.cnctech.gr/en/blog/digital-marketing-2026-changes/",
      },
      {
        label: "GIM Agency — Digital marketing trends 2026",
        href: "https://www.gimagency.gr/blog/proothisi-istoselidon/digital-marketing-trends-2026/",
      },
    ],
  },
  {
    slug: "ai-native-mvp-architecture",
    title: "AI-native MVP architecture: ship the loop, not the feature",
    excerpt:
      "Trend reports show AI MVP development exploding in search and spend. The winners do not bolt a model onto a brittle prototype — they design feedback loops from day one.",
    publishedAt: "2026-09-16",
    readingMinutes: 9,
    keywords: [
      "AI MVP development",
      "MVP architecture",
      "product feedback loops",
      "startup software",
    ],
    face: "software",
    heroTone: "pulse",
    stats: [
      {
        value: 340,
        suffix: "%+",
        label: "Reported search growth around AI MVP development (trend analyses)",
        source: "SEO / product growth trend reports 2026",
      },
      {
        value: 70,
        suffix: "%",
        label: "New apps using AI from day one (cited market claims)",
        source: "Market trend summaries",
      },
      {
        value: 23,
        suffix: "%",
        label: "Orgs scaling agents somewhere (reality check)",
        source: "McKinsey",
      },
    ],
    sections: [
      {
        heading: "MVP no longer means “skip architecture”",
        body: [
          "When AI is in the critical path, the cheapest mistake is an unobservable prototype that teaches you the wrong lesson. You learn that “users liked the demo,” not whether the system can recover from bad outputs.",
          "An AI-native MVP still cuts scope. It does not cut contracts: evaluation sets, human review queues, logging, and a product surface that exposes uncertainty.",
        ],
      },
      {
        heading: "The loop is the product",
        body: [
          "Capture input → produce output → measure quality → improve the system. Whether you are shipping music feedback tools or B2B agents, the companies that compound are the ones that instrument the loop early.",
          "That is also why disconnected faces kill MVPs: if the web intake, the product core, and the automation layer do not share events, you cannot learn.",
        ],
      },
      {
        heading: "Scope like a cube",
        body: [
          "Pick one face that unlocks the rest. Ship the smallest volume that holds under pressure. Resist the urge to sprinkle AI on every screen. Depth beats decoration when search traffic arrives with real intent.",
        ],
      },
    ],
    takeaway:
      "Build the feedback loop into the MVP. AI without measurement is a demo with a longer runtime.",
    sources: [
      {
        label: "McKinsey — State of AI 2025",
        href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2025",
      },
      {
        label: "Sainam — SEO & Product Growth Trend Report 2026",
        href: "https://sainam.tech/blog/seo-product-growth-trend-report-2026/",
      },
    ],
  },
  {
    slug: "digital-transformation-that-holds",
    title: "Digital transformation that holds: structure, faces, assemble",
    excerpt:
      "“Digital transformation services” stays a durable search theme because most programs still stall. The ones that hold treat change as geometry — not a slide of initiatives.",
    publishedAt: "2026-09-09",
    readingMinutes: 8,
    keywords: [
      "digital transformation services",
      "digital strategy",
      "change management technology",
      "systems integration",
    ],
    face: "services",
    heroTone: "navy",
    stats: [
      {
        value: 35,
        suffix: "%",
        label: "Projected EMEA AI spend growth (2025, IDC framing)",
        source: "IDC EMEA FutureScape",
      },
      {
        value: 50,
        prefix: "$",
        suffix: "B",
        label: "EMEA AI spend reached (2024, IDC)",
        source: "IDC",
      },
      {
        value: 66,
        suffix: "%",
        label: "EMEA employees expecting job impact from automation by end-2025",
        source: "IDC",
      },
    ],
    sections: [
      {
        heading: "Spend is up. Outcomes are uneven.",
        body: [
          "IDC describes EMEA AI spend already at tens of billions with strong forward growth, while maturity remains low for most organizations. Money does not equal transformation.",
          "Transformation fails when technology projects outrun operating model changes — roles, incentives, data ownership, and customer journeys left untouched.",
        ],
      },
      {
        heading: "Services are the steering face",
        body: [
          "Strategy, campaigns, loyalty, and go-to-market are not decorations around the machine. They are how humans steer systems once automation exists. Without that face, agents optimize the wrong objective.",
          "A serious services engagement defines success metrics, maps the cube, and sequences faces so each delivery unlocks the next — instead of parallel workstreams that never meet.",
        ],
      },
      {
        heading: "Assemble is a discipline",
        body: [
          "Launch, measure, iterate. Keep the edges intentional. Retire tools that do not lock. Document the contracts so the next hire does not reinvent the system from tribal knowledge.",
        ],
      },
    ],
    takeaway:
      "Transformation holds when structure precedes features, faces lock on purpose, and assemble never stops.",
    sources: [
      {
        label: "IDC — EMEA FutureScape 2026",
        href: "https://info.idc.com/rs/081-ATC-910/images/EUR-IDC-RE-2026-EMEA-FutureScape.pdf",
      },
      {
        label: "McKinsey — State of AI 2025",
        href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2025",
      },
    ],
  },
  {
    slug: "app-reliability-ai-dependency",
    title: "App reliability when AI becomes a dependency",
    excerpt:
      "Once models sit in the customer path, reliability is no longer uptime alone. It is correctness, latency, cost, and a human path when the system is wrong.",
    publishedAt: "2026-09-02",
    readingMinutes: 9,
    keywords: [
      "AI reliability",
      "software architecture",
      "AI risk management",
      "production AI",
    ],
    face: "software",
    heroTone: "deep",
    stats: [
      {
        value: 15,
        suffix: "%",
        label: "On path for fully autonomous agents",
        source: "Gartner",
      },
      {
        value: 26,
        suffix: "%",
        label: "Expect transformative productivity from agents",
        source: "Gartner",
      },
      {
        value: 53,
        suffix: "%",
        label: "Expect significant but not transformative impact",
        source: "Gartner",
      },
    ],
    sections: [
      {
        heading: "New failure classes",
        body: [
          "Classic apps fail closed: 500s, timeouts, empty states. AI-augmented apps can fail open: fluent wrong answers, unsafe tool calls, silent quality drift. Users may not notice until trust is already spent.",
          "Reliability engineering must expand to evaluation harnesses, canary prompts, cost budgets, and kill switches — alongside the usual SLOs.",
        ],
      },
      {
        heading: "Design for supervised autonomy",
        body: [
          "Gartner’s data shows appetite for agents with caution on full autonomy. Product design should match: agents propose and prepare; humans approve irreversible actions; the UI makes confidence visible.",
          "Architecturally, isolate model providers behind interfaces, cache where safe, and keep a non-AI degraded mode for critical journeys.",
        ],
      },
      {
        heading: "The future path",
        body: [
          "As agentic systems spread, the competitive advantage will not be “who added AI first.” It will be who can run AI as a dependable face of a larger system — software, surface, automation, and service locking together under load.",
        ],
      },
    ],
    takeaway:
      "If AI is on the critical path, reliability means correctness and control — not just green uptime checks.",
    sources: [
      {
        label: "Gartner — AI agents survey (Sept 2025)",
        href: "https://www.gartner.com/en/newsroom/press-releases/2025-09-30-gartner-survey-finds-just-15-percent-of-it-application-leaders-are-considering-piloting-or-deploying-fully-autonomous-ai-agents",
      },
      {
        label: "McKinsey — State of AI 2025",
        href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2025",
      },
    ],
  },
];

export function getInsight(slug: string): InsightArticle | undefined {
  return INSIGHTS.find((a) => a.slug === slug);
}

export function getInsightSlugs(): string[] {
  return INSIGHTS.map((a) => a.slug);
}

export function formatInsightDate(iso: string, locale: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(locale === "el" ? "el-GR" : locale === "ar" ? "ar" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}
