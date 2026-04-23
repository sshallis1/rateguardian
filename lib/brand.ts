// seanshallis.com — Brand constants
// Single source of truth for Guardian spokes, copy, and identity.

export type GuardianStatus = "live" | "soon" | "future";

export interface Guardian {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  status: GuardianStatus;
  color: string;
  colorClass: string;
  borderClass: string;
  textClass: string;
  href: string;
  icon: string; // lucide name
}

export const GUARDIANS: Guardian[] = [
  {
    id: "rate",
    name: "Rate Guardian",
    shortName: "Rate",
    tagline: "Watches your rate so you don't have to.",
    description:
      "AI that monitors your mortgage multiple times a day and alerts you the moment a better rate appears. Clarity, confidence, and comfort — backed by 30 years of wisdom.",
    status: "live",
    color: "#0e6b6d",
    colorClass: "text-spoke-rate",
    borderClass: "border-spoke-rate",
    textClass: "text-spoke-rate",
    href: "/rate-guardian",
    icon: "Home",
  },
  {
    id: "health",
    name: "Health Guardian",
    shortName: "Health",
    tagline: "Your health signals, decoded.",
    description:
      "AI that watches your vitals, catches patterns early, and keeps you one step ahead of the curve.",
    status: "soon",
    color: "#16a34a",
    colorClass: "text-spoke-health",
    borderClass: "border-spoke-health",
    textClass: "text-spoke-health",
    href: "/health-guardian",
    icon: "Heart",
  },
  {
    id: "trade",
    name: "Trade Guardian",
    shortName: "Trade",
    tagline: "Market signal, not market noise.",
    description:
      "AI that filters the financial fog — tracking sentiment, weighting signals, and surfacing real opportunities.",
    status: "soon",
    color: "#2563eb",
    colorClass: "text-spoke-trade",
    borderClass: "border-spoke-trade",
    textClass: "text-spoke-trade",
    href: "/trade-guardian",
    icon: "TrendingUp",
  },
  {
    id: "time",
    name: "Time Guardian",
    shortName: "Time",
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
  {
    id: "project",
    name: "Project Guardian",
    shortName: "Project",
    tagline: "Your reno. Your budget. Your rules.",
    description:
      "AI project management for your renovation — from first-walkthrough cost estimate to resale prep. Keep the 15–20% general-contractor markup in your pocket, not someone else's.",
    status: "live",
    color: "#c2410c",
    colorClass: "text-spoke-project",
    borderClass: "border-spoke-project",
    textClass: "text-spoke-project",
    href: "/project-guardian",
    icon: "Hammer",
  },
];

export const BRAND = {
  name: "Sean Shallis",
  company: "Guardian Family",
  tagline: "Guardians watch what you can't.",
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
      description: "Custom-designed monitoring that watches your rate multiple times per day.",
    },
    {
      title: "30 Years of Mortgage Wisdom",
      description: "Three decades of market cycles, deal structures, and physician lending expertise.",
    },
    {
      title: "Backed by U.S. Bank",
      description: "The 5th largest bank in the world. Products, services, and speed of execution.",
    },
    {
      title: "Private Wealth Expert on Speed Dial",
      description: "When Rosie finds the opportunity, Sean closes it — personally.",
    },
    {
      title: "Multi-Daily Monitoring",
      description: "Rosie never sleeps. Listening for opportunities and concerns, 24/7.",
    },
  ],
};
