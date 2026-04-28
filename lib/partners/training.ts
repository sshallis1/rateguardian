// Partner Training Library — content structure for RealtyCoach material

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: TrainingCategory;
  duration: string; // e.g. "45 min", "1h 20min"
  type: "video" | "audio" | "document" | "worksheet";
  thumbnail?: string;
  videoUrl?: string; // Vimeo/YouTube unlisted, or Vercel Blob
  documentUrl?: string;
  order: number;
  featured?: boolean;
}

export type TrainingCategory =
  | "mindset"
  | "lead-generation"
  | "listing-mastery"
  | "buyer-conversion"
  | "negotiation"
  | "scripts-dialogues"
  | "business-planning"
  | "marketing"
  | "coaching-frameworks";

export interface CategoryInfo {
  id: TrainingCategory;
  label: string;
  description: string;
  icon: string; // lucide icon name
  color: string;
}

export const TRAINING_CATEGORIES: CategoryInfo[] = [
  {
    id: "mindset",
    label: "Mindset & Performance",
    description:
      "Billion Dollar Blind Spots, Success Addiction Framework, NLP for producers",
    icon: "Brain",
    color: "#9333ea",
  },
  {
    id: "lead-generation",
    label: "Lead Generation",
    description: "Database mining, sphere activation, referral systems",
    icon: "Target",
    color: "#2563eb",
  },
  {
    id: "listing-mastery",
    label: "Listing Mastery",
    description: "Pre-listing, presentation, pricing strategy, objection handling",
    icon: "Home",
    color: "#0e6b6d",
  },
  {
    id: "buyer-conversion",
    label: "Buyer Conversion",
    description: "Buyer consultations, showing strategy, closing techniques",
    icon: "Users",
    color: "#059669",
  },
  {
    id: "negotiation",
    label: "Negotiation",
    description: "Advanced negotiation, multiple offers, escalation clauses",
    icon: "Handshake",
    color: "#c2410c",
  },
  {
    id: "scripts-dialogues",
    label: "Scripts & Dialogues",
    description: "Proven scripts for every scenario — cold calls to closing table",
    icon: "MessageSquare",
    color: "#dc2626",
  },
  {
    id: "business-planning",
    label: "Business Planning",
    description: "Annual planning, goal setting, accountability systems, AIDA model",
    icon: "BarChart3",
    color: "#f59e0b",
  },
  {
    id: "marketing",
    label: "Marketing & Branding",
    description: "Personal brand, social media, content strategy, farming",
    icon: "Megaphone",
    color: "#ec4899",
  },
  {
    id: "coaching-frameworks",
    label: "Coaching Frameworks",
    description: "10X Formula, CP², Internal Intelligence, One Thing methodology",
    icon: "Compass",
    color: "#6366f1",
  },
];

// Placeholder modules — replace with real content as Sean uploads
export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: "bdbs-intro",
    title: "Billion Dollar Blind Spots — The Hidden Constraint",
    description:
      "Discover the single limiting belief that silently caps your production. The framework that changed everything.",
    category: "mindset",
    duration: "52 min",
    type: "video",
    order: 1,
    featured: true,
  },
  {
    id: "10x-formula",
    title: "10X Personal Success Formula",
    description:
      "Sean's proprietary system for 10X-ing results without 10X-ing effort. Systems thinking applied to real estate.",
    category: "mindset",
    duration: "1h 15min",
    type: "video",
    order: 2,
    featured: true,
  },
  {
    id: "success-addiction",
    title: "Success Addiction — Building the Habit",
    description:
      "Success isn't an outcome — it's a habit. How to wire your daily routine for compound growth.",
    category: "mindset",
    duration: "38 min",
    type: "video",
    order: 3,
  },
  {
    id: "sphere-activation",
    title: "Sphere Activation System",
    description:
      "Turn your existing database into a referral machine. The 33-touch system that actually works.",
    category: "lead-generation",
    duration: "45 min",
    type: "video",
    order: 1,
    featured: true,
  },
  {
    id: "listing-presentation",
    title: "The Listing Presentation That Wins",
    description:
      "Pre-listing package, CMA mastery, and the presentation flow that converts at 80%+.",
    category: "listing-mastery",
    duration: "1h 05min",
    type: "video",
    order: 1,
  },
  {
    id: "buyer-consultation",
    title: "Buyer Consultation Blueprint",
    description:
      "The consultation that locks in buyer loyalty before the first showing.",
    category: "buyer-conversion",
    duration: "50 min",
    type: "video",
    order: 1,
  },
  {
    id: "cold-call-scripts",
    title: "Cold Call Scripts That Convert",
    description:
      "Exact word tracks for expired, FSBO, circle prospecting, and past client reactivation.",
    category: "scripts-dialogues",
    duration: "35 min",
    type: "video",
    order: 1,
  },
  {
    id: "annual-planning",
    title: "Annual Business Plan — AIDA Model",
    description:
      "Build your business plan using Sean's AIDA Strategic Execution Model.",
    category: "business-planning",
    duration: "1h 30min",
    type: "video",
    order: 1,
  },
];

export function getModulesByCategory(category: TrainingCategory): TrainingModule[] {
  return TRAINING_MODULES.filter((m) => m.category === category).sort(
    (a, b) => a.order - b.order
  );
}

export function getFeaturedModules(): TrainingModule[] {
  return TRAINING_MODULES.filter((m) => m.featured);
}

export function getModuleById(id: string): TrainingModule | undefined {
  return TRAINING_MODULES.find((m) => m.id === id);
}

export function getCategoryById(id: string): CategoryInfo | undefined {
  return TRAINING_CATEGORIES.find((c) => c.id === id);
}
