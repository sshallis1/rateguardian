// seanshallis.com — Brand constants
// Single source of truth for Guardian spokes, copy, and identity.

export type GuardianStatus = "live" | "launching" | "soon" | "future";

export interface Guardian {
  id: string;
  name: string;
  shortName: string;
  protects: string;
  tagline: string;
  description: string;
  status: GuardianStatus;
  color: string;
  colorClass: string;
  borderClass: string;
  textClass: string;
  href: string;
  icon: string; // lucide name
  cta?: { label: string; href: string };
}

// The Four Pillars — ordered by ecosystem narrative
export const GUARDIANS: Guardian[] = [
  {
    id: "rate",
    name: "Rate Guardian",
    shortName: "Rate",
    protects: "Protects the financing.",
    tagline: "Watches your rate so you don't have to.",
    description:
      "AI that monitors your mortgage multiple times a day. When a savings window opens, Rosie alerts you. When it's time to act, Sean closes it. Free. Forever.",
    status: "live",
    color: "#0e6b6d",
    colorClass: "text-spoke-rate",
    borderClass: "border-spoke-rate",
    textClass: "text-spoke-rate",
    href: "/rate-guardian",
    icon: "Shield",
    cta: { label: "Check My Rate — Free", href: "/rate-guardian/ask-rosie" },
  },
  {
    id: "project",
    name: "Project Guardian",
    shortName: "Project",
    protects: "Protects the project.",
    tagline: "Your reno. Your budget. Your rules.",
    description:
      "AI project management for renovations — from first-walkthrough cost estimate to resale prep. Keep the 15-20% GC markup in your pocket.",
    status: "live",
    color: "#c2410c",
    colorClass: "text-spoke-project",
    borderClass: "border-spoke-project",
    textClass: "text-spoke-project",
    href: "/project-guardian",
    icon: "Hammer",
    cta: { label: "See How It Works", href: "/project-guardian" },
  },
  {
    id: "trade",
    name: "Trade Guardian",
    shortName: "Trade",
    protects: "Protects the capital.",
    tagline: "Market signal, not market noise.",
    description:
      "Weekly intelligence that connects mortgage rates to financial markets. What to watch, what it means, and what to do about it.",
    status: "launching",
    color: "#2563eb",
    colorClass: "text-spoke-trade",
    borderClass: "border-spoke-trade",
    textClass: "text-spoke-trade",
    href: "/trade-guardian",
    icon: "TrendingUp",
    cta: { label: "Get the Free Brief", href: "/trade-guardian" },
  },
  {
    id: "home",
    name: "Home Guardian",
    shortName: "Home",
    protects: "Protects the homeowner.",
    tagline: "Your home's brain. From dream to done.",
    description:
      "The lifecycle platform for homeownership — buying, renovating, living, and selling. Every document, every contractor, every decision in one place.",
    status: "soon",
    color: "#16a34a",
    colorClass: "text-spoke-home",
    borderClass: "border-spoke-home",
    textClass: "text-spoke-home",
    href: "/home-guardian",
    icon: "Home",
    cta: { label: "Join the Waitlist", href: "/home-guardian" },
  },
];

// Future spokes — not shown on homepage, available for dedicated pages
export const FUTURE_GUARDIANS: Guardian[] = [
  {
    id: "health",
    name: "Health Guardian",
    shortName: "Health",
    protects: "Protects your health.",
    tagline: "Your health signals, decoded.",
    description:
      "AI that watches your vitals, catches patterns early, and keeps you one step ahead of the curve.",
    status: "future",
    color: "#059669",
    colorClass: "text-spoke-health",
    borderClass: "border-spoke-health",
    textClass: "text-spoke-health",
    href: "/health-guardian",
    icon: "Heart",
  },
  {
    id: "time",
    name: "Time Guardian",
    shortName: "Time",
    protects: "Protects your time.",
    tagline: "Protect what matters most.",
    description:
      "AI that guards your attention, decision bandwidth, and execution time — so you spend it where it counts.",
    status: "future",
    color: "#9333ea",
    colorClass: "text-spoke-time",
    borderClass: "border-spoke-time",
    textClass: "text-spoke-time",
    href: "/time-guardian",
    icon: "Clock",
  },
  {
    id: "wealth",
    name: "Wealth Guardian",
    shortName: "Wealth",
    protects: "Protects your wealth.",
    tagline: "Your AI family CFO.",
    description:
      "AI that ties mortgage, investments, tax strategy, and asset allocation into one continuous plan.",
    status: "future",
    color: "#f59e0b",
    colorClass: "text-spoke-wealth",
    borderClass: "border-spoke-wealth",
    textClass: "text-spoke-wealth",
    href: "/wealth-guardian",
    icon: "Gem",
  },
];

export const BRAND = {
  name: "Sean Shallis",
  company: "Guardian Family",
  headline: "Eliminate Financial Blind Spots. Automatically.",
  subheadline:
    "AI-powered systems that watch your money, your rate, and your opportunities — so you don't have to.",
  tagline: "Guardians watch what you can't.",
  ecosystemLine:
    "Project Guardian protects the project. Rate Guardian protects the financing. Home Guardian protects the homeowner. Trade Guardian protects the capital.",
  rosieTagline: "Rosie watches your rate so you don't have to.",
  nmls: "NMLS #2362814",
  bank: "U.S. Bank",
  contact: {
    phone: "(973) 457-2278",
    mobile: "(973) 461-6955",
    email: "sean.shallis@usbank.com",
    location: "Chatham, NJ",
  },
  mediaLogos: [
    "The Wall Street Journal",
    "The New York Times",
    "Bloomberg",
    "CNBC",
    "HousingWire",
  ],
  stats: {
    years: "30+",
    transactions: "$1B+",
    families: "1,000+",
    book: "#1 Best Seller",
  },
  threeCs: [
    { letter: "C", word: "Clarity", blurb: "Clear the financial fog." },
    { letter: "C", word: "Confidence", blurb: "Never miss the opportunity." },
    { letter: "C", word: "Comfort", blurb: "Sleep while Rosie watches." },
  ],
  moat: [
    {
      title: "Rosie's Proprietary Algorithm",
      description:
        "Custom-designed monitoring that watches your rate multiple times per day.",
    },
    {
      title: "30 Years of Mortgage Wisdom",
      description:
        "Three decades of market cycles, deal structures, and physician lending expertise.",
    },
    {
      title: "Backed by U.S. Bank",
      description:
        "The 5th largest bank in the world. Products, services, and speed of execution.",
    },
    {
      title: "Private Wealth Expert on Speed Dial",
      description:
        "When Rosie finds the opportunity, Sean closes it — personally.",
    },
    {
      title: "Multi-Daily Monitoring",
      description:
        "Rosie never sleeps. Listening for opportunities and concerns, 24/7.",
    },
  ],
};
