# seanshallis.com — Design Concepts

> 3 design directions for the Guardian Family platform hub.
> Each treats Sean's "micro circles as headers" idea differently.
> All share the same tech stack: Next.js 16 + shadcn/ui + Geist + Tailwind 4 + AI Gateway

---

## Shared Design DNA (All Concepts)

### Brand Tokens
```
--brand-sean:     #0E6B6D   (Deep Teal — carried from Ask Rosie)
--brand-gold:     #C8A550   (Authority Gold — warmth, premium)
--brand-navy:     #0F172A   (Deep Navy — trust, depth)
--brand-cream:    #F9F5EB   (Warmth — inherited from Rosie)
--surface-dark:   #09090B   (Zinc-950 — AI/dashboard surfaces)
--surface-card:   #18181B   (Zinc-900 — card backgrounds)
--border:         #27272A   (Zinc-800 — subtle borders)
--text-primary:   #FAFAFA   (Zinc-50 — headings on dark)
--text-muted:     #71717A   (Zinc-500 — secondary text)
--accent-green:   #22C55E   (Status: active/healthy)
--accent-red:     #EF4444   (Status: alert/urgent)
```

### Typography
- **Headings**: Geist Sans, -0.02em tracking, 700 weight
- **Body**: Geist Sans, 400 weight, 1.6 line-height
- **Data/Metrics**: Geist Mono, tabular-nums
- **Nav labels**: Geist Sans, 500 weight, 0.05em tracking, uppercase, 11-12px

### Guardian Spoke Colors (Each spoke has a signature color)
```
Rate Guardian:      #0E6B6D (Deep Teal)      — money, stability
Health Guardian:    #16A34A (Emerald)         — vitality, growth
Trade Guardian:     #2563EB (Royal Blue)      — markets, intelligence
Time Guardian:      #9333EA (Purple)          — focus, premium
Wealth Guardian:    #F59E0B (Amber)           — gold, prosperity
Risk Guardian:      #DC2626 (Red)             — protection, alerts
```

### Navigation — The Spoke Header System
Sean's key insight: each Guardian spoke = a top-level nav header.

```
┌──────────────────────────────────────────────────────────────────┐
│  [S] SEAN SHALLIS                                                │
│                                                                  │
│  Rate      Health    Trade     Time      Wealth    [Ask Rosie]  │
│  Guardian  Guardian  Guardian  Guardian  Guardian   ●            │
│  ─────     ─────     ─────     ─────     ─────                  │
│  (teal)    (green)   (blue)    (purple)  (amber)   (pulsing)   │
│  LIVE      SOON      SOON      FUTURE    FUTURE                │
└──────────────────────────────────────────────────────────────────┘
```

Rules:
- LIVE spokes: full color, clickable → expands to sub-world
- SOON spokes: 40% opacity, hover reveals "Coming Soon" tooltip
- FUTURE spokes: 20% opacity, non-interactive, visible but ghosted
- "Ask Rosie" is ALWAYS visible — floating CTA, pulsing dot, the universal entry point
- On mobile: horizontal scroll or dropdown with spoke icons

---

## CONCEPT 1: "The Authority Hub"
### Design philosophy: Personal brand FIRST, platform underneath

**Inspiration**: Hormozi (acquisition.com) + Robbins (tonyrobbins.com)
**Vibe**: "You came for Sean. You stay for the Guardians."
**Mode**: Light mode hero → dark mode below the fold

### Page Structure

```
┌─────────────────────────────────────────────┐
│ NAV: Sean Shallis | [Spoke Headers] | [Ask Rosie] │
├─────────────────────────────────────────────┤
│                                             │
│  HERO (Light mode, cream background)        │
│  ┌─────────────────────────────────────┐    │
│  │  [Sean's headshot — large, warm]    │    │
│  │                                     │    │
│  │  "30 Years Protecting Families'     │    │
│  │   Biggest Financial Decisions."     │    │
│  │                                     │    │
│  │  Private Wealth Mortgage Strategist │    │
│  │  Best-Selling Author | NLP Master   │    │
│  │                                     │    │
│  │  [Ask Rosie →]  [Watch the Story]   │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  TRUST BAR (logos, scrolling)               │
│  WSJ | NYT | Bloomberg | HousingWire | CNBC │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  THE GUARDIAN ECOSYSTEM (transition to dark) │
│  ┌──────────────────────────────────────┐   │
│  │  "One AI. Every Financial Blind Spot."│   │
│  │                                      │   │
│  │  [GEAR VISUALIZATION]               │   │
│  │  Central gear = Rosie AI (animated)  │   │
│  │  Surrounding gears = Guardian spokes │   │
│  │  Each gear rotates slowly on scroll  │   │
│  │  Click a gear → scroll to that spoke │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  SPOKE CARDS (horizontal scroll on mobile)  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│  │ Rate │ │Health│ │Trade │ │ Time │      │
│  │Guard.│ │Guard.│ │Guard.│ │Guard.│      │
│  │      │ │      │ │      │ │      │      │
│  │ACTIVE│ │ SOON │ │ SOON │ │FUTURE│      │
│  │[→]   │ │[notify]│[notify]│[notify]│     │
│  └──────┘ └──────┘ └──────┘ └──────┘      │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  RATE GUARDIAN SPOTLIGHT (first spoke)       │
│  ┌──────────────────────────────────────┐   │
│  │  "Stop Spending Thousands...         │   │
│  │   Spend Nothing, Save Thousands"     │   │
│  │                                      │   │
│  │  3 pillars:                          │   │
│  │  🔍 Monitor  🛡️ Protect  💰 Save    │   │
│  │                                      │   │
│  │  Mini-Rosie chat preview:            │   │
│  │  ┌────────────────────────────┐      │   │
│  │  │ Rosie: "Hi! I'm Rosie.    │      │   │
│  │  │ Tell me about your         │      │   │
│  │  │ mortgage and I'll see if   │      │   │
│  │  │ you're overpaying."        │      │   │
│  │  │ [Start Chat →]             │      │   │
│  │  └────────────────────────────┘      │   │
│  │                                      │   │
│  │  Stats: $X saved | Y families | Z%   │   │
│  └──────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  CONTENT HUB (blog, podcast, media)         │
│  Tabs: All | Podcast | Blog | Media         │
│  ┌────┐ ┌────┐ ┌────┐                      │
│  │EP45│ │Blog│ │WSJ │                      │
│  │    │ │    │ │    │                      │
│  └────┘ └────┘ └────┘                      │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  SOCIAL PROOF                               │
│  Testimonial carousel + Zillow/Google stars  │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  ABOUT / BIO (deeper story)                 │
│  Army Rangers → Real Estate → Coaching →    │
│  NLP → AI → Guardian Family                 │
│  Timeline visualization                     │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  FOOTER                                     │
│  Contact | NMLS | Legal | Social links      │
│                                             │
└─────────────────────────────────────────────┘
```

### Why This Works
- **First impression = authority** (Sean's face, credentials, media logos)
- **Second impression = platform** (Guardian ecosystem reveals itself)
- **Rosie is the universal CTA** — appears in nav, hero, spotlight section
- **Investor signal**: visitor sees 6 spokes = "this is a platform company"
- **Trust architecture**: media logos above the fold, testimonials below
- **Mobile**: hero stacks vertically, spoke cards become horizontal scroll

### Conversion Funnels
1. **Ask Rosie** (nav CTA, always visible) → `/rate-guardian/ask-rosie` (chat intake)
2. **Rate Guardian spotlight** → chat preview → full chat
3. **Coming soon spokes** → email capture → "Notify me when Health Guardian launches"
4. **Content hub** → authority building → organic SEO → chat conversion
5. **Contact/Work with Sean** → direct outreach (mortgage, coaching)

---

## CONCEPT 2: "The AI-First Platform"
### Design philosophy: Rosie is the STAR. Sean is the engine behind her.

**Inspiration**: ChatGPT + Lemonade + Wealthfront
**Vibe**: "Meet Rosie. She protects everything."
**Mode**: Full dark mode. AI product aesthetic. Premium.

### Page Structure

```
┌─────────────────────────────────────────────┐
│ NAV: [Rosie logo] The Guardian Family       │
│      [Spoke Headers] | [Sign In]            │
├─────────────────────────────────────────────┤
│                                             │
│  HERO (Full dark, gradient glow)            │
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │
│  │     ✦ (Rosie avatar, glowing)       │    │
│  │                                     │    │
│  │  "Guardians Watch What You Can't."  │    │
│  │                                     │    │
│  │  One AI relationship that monitors  │    │
│  │  your mortgage, health, wealth,     │    │
│  │  and time — so you don't have to.   │    │
│  │                                     │    │
│  │  ┌──────────────────────────────┐   │    │
│  │  │ Ask Rosie anything...    [→] │   │    │
│  │  └──────────────────────────────┘   │    │
│  │                                     │    │
│  │  "Is my mortgage rate too high?"    │    │
│  │  "What should I watch this week?"   │    │
│  │  "Am I overpaying on insurance?"    │    │
│  │  (clickable example prompts)        │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  TRUST (subtle, integrated)                 │
│  "From the mind of Sean Shallis"            │
│  30+ yrs | $1B+ transactions | WSJ | NYT   │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  HOW IT WORKS (3-step animation)            │
│  1. Ask Rosie → 2. She Monitors → 3. Alert │
│  (each step animates on scroll)             │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  GUARDIAN SPOKES (dark cards, glow borders) │
│                                             │
│  ┌─────────────────────┐ ┌────────────────┐│
│  │ ⬡ Rate Guardian     │ │ ⬡ Health Guard.││
│  │ ───────────── teal  │ │ ──────── green ││
│  │                     │ │                ││
│  │ "Your mortgage      │ │ "Your health   ││
│  │  never sleeps.      │ │  signals,      ││
│  │  Neither does       │ │  decoded."     ││
│  │  Rosie."            │ │                ││
│  │                     │ │ COMING SOON    ││
│  │ [Monitor My Rate →] │ │ [Get Notified] ││
│  └─────────────────────┘ └────────────────┘│
│                                             │
│  ┌─────────────────────┐ ┌────────────────┐│
│  │ ⬡ Trade Guardian    │ │ ⬡ Time Guard.  ││
│  │ ───────────── blue  │ │ ──────── purple││
│  │ ... (pattern repeats)                   ││
│  └─────────────────────┘ └────────────────┘│
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  LIVE DEMO (embedded chat preview)          │
│  ┌──────────────────────────────────────┐   │
│  │  Real-time Rosie conversation        │   │
│  │  Auto-plays a sample dialogue:       │   │
│  │                                      │   │
│  │  Rosie: "Looking at your 6.5% rate   │   │
│  │  from 2024... rates just dropped to  │   │
│  │  5.8%. That's $247/month you could   │   │
│  │  be saving."                         │   │
│  │                                      │   │
│  │  User: "Should I refinance?"         │   │
│  │                                      │   │
│  │  Rosie: "Let me run the numbers..."  │   │
│  │                                      │   │
│  │  [Try It Yourself →]                 │   │
│  └──────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  SEAN'S STORY (minimal, below the fold)     │
│  Small headshot + 3-line bio + "Learn more" │
│  Positioned as "the mind behind Rosie"      │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  FOOTER (dark, minimal)                     │
│  Guardian Family™ | NMLS #2362814 | Legal   │
│                                             │
└─────────────────────────────────────────────┘
```

### Why This Works
- **AI-native first impression** — feels like a product, not a bio page
- **Chat-first conversion** — the hero IS the funnel entry (input field)
- **Example prompts reduce friction** — visitor doesn't have to think
- **Dark mode = premium AI aesthetic** — same energy as ChatGPT, Claude
- **Sean is the authority behind** — not competing with the AI, empowering it
- **Each spoke card has its own color-coded glow border** — visual differentiation

### Conversion Funnels
1. **Hero input field** → Ask Rosie anything → full chat
2. **Example prompts** → pre-filled chat → conversion
3. **Spoke cards** → "Monitor My Rate" → chat or direct intake
4. **Coming soon spokes** → email capture waitlist
5. **Live demo** → "Try It Yourself" → full chat experience

---

## CONCEPT 3: "The Hybrid Command Center" (RECOMMENDED)
### Design philosophy: Sean's authority opens the door. Rosie runs the house.

**Inspiration**: Apple.com (product ecosystem) + Wealthfront (trust) + ChatGPT (AI aesthetic)
**Vibe**: "Looks like a world-class brand. Runs like a platform company."
**Mode**: Light hero (warmth) → dark platform section (tech) → light content (trust)

### Page Structure

```
┌─────────────────────────────────────────────┐
│ NAV (fixed, glass morphism on scroll)       │
│ ┌───────────────────────────────────────┐   │
│ │ SEAN SHALLIS                          │   │
│ │                                       │   │
│ │ Rate    Health   Trade   Time  Wealth │   │
│ │ ●teal   ○green   ○blue  ○purp  ○amber│   │
│ │                                       │   │
│ │                        [Ask Rosie 🐾] │   │
│ └───────────────────────────────────────┘   │
│                                             │
│ ● = active spoke  ○ = upcoming spoke        │
│ Each has a 4px bottom border in its color   │
│ Active: full opacity + colored underline    │
│ Upcoming: 40% opacity, hover for tooltip    │
├─────────────────────────────────────────────┤
│                                             │
│  HERO (cream/light background)              │
│  Split layout: 60% text / 40% visual        │
│  ┌───────────────────┬─────────────────┐    │
│  │                   │                 │    │
│  │ "Your Money Has   │  [Animated      │    │
│  │  Blind Spots.     │   gear system   │    │
│  │  Rosie Doesn't."  │   with Sean's   │    │
│  │                   │   photo in the  │    │
│  │  30+ years of     │   center gear]  │    │
│  │  financial wisdom,│                 │    │
│  │  powered by AI    │  Gears rotate   │    │
│  │  that never       │  slowly.        │    │
│  │  sleeps.          │  Each labeled   │    │
│  │                   │  with a spoke.  │    │
│  │  [Ask Rosie →]    │                 │    │
│  │  [See How It      │                 │    │
│  │   Works ↓]        │                 │    │
│  │                   │                 │    │
│  └───────────────────┴─────────────────┘    │
│                                             │
│  TRUST BAR (immediately under hero)         │
│  WSJ · NYT · Bloomberg · CNBC · HousingWire │
│  $1B+ Transactions · 1,000+ Families        │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  TRANSITION ZONE                            │
│  "One Relationship. Every Financial Domain."│
│  Subhead: "Meet the Guardian Family — AI    │
│  that monitors what matters most."          │
│                                             │
│  ↓↓↓ (background fades light → dark) ↓↓↓   │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  GUARDIAN SPOKES (DARK MODE SECTION)        │
│                                             │
│  Each spoke = full-width section with:      │
│  - Colored left border (4px, spoke color)   │
│  - Icon + name + tagline                    │
│  - 2-sentence description                   │
│  - CTA button (or "Coming Soon" badge)      │
│  - Mini-visualization (chart, metric, etc)  │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │ ▌Rate Guardian™               LIVE   │   │
│  │ ▌                                    │   │
│  │ ▌"Stop Spending Thousands...         │   │
│  │ ▌ Spend Nothing, Save Thousands"     │   │
│  │ ▌                                    │   │
│  │ ▌ AI that monitors your mortgage     │   │
│  │ ▌ 24/7 and alerts you the moment     │   │
│  │ ▌ a better rate appears.             │   │
│  │ ▌                                    │   │
│  │ ▌ ┌─────────────┐                   │   │
│  │ ▌ │ Your rate:   │ [Ask Rosie →]    │   │
│  │ ▌ │ 6.5% ███████│                   │   │
│  │ ▌ │ Market: 5.8% │                   │   │
│  │ ▌ │ Save: $247/mo│                   │   │
│  │ ▌ └─────────────┘                   │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │ ▌Health Guardian           COMING SOON│   │
│  │ ▌                                    │   │
│  │ ▌ "Your health signals, decoded."    │   │
│  │ ▌                                    │   │
│  │ ▌ AI that watches your vitals,       │   │
│  │ ▌ catches patterns, and keeps you    │   │
│  │ ▌ one step ahead.                    │   │
│  │ ▌                                    │   │
│  │ ▌ [Get Notified When It Launches →]  │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  (Trade, Time, Wealth follow same pattern)  │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  ROSIE CHAT PREVIEW (dark, centered)        │
│  ┌──────────────────────────────────────┐   │
│  │  "See Rosie in Action"               │   │
│  │                                      │   │
│  │  [Animated demo conversation]        │   │
│  │  Auto-types a sample Q&A             │   │
│  │  showing rate check → savings calc   │   │
│  │                                      │   │
│  │  ┌────────────────────────────────┐  │   │
│  │  │ Ask Rosie anything...      [→] │  │   │
│  │  └────────────────────────────────┘  │   │
│  └──────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  ↑↑↑ (background fades dark → light) ↑↑↑   │
│                                             │
│  ABOUT SEAN (light mode, warm)              │
│  ┌─────────────────────────────────────┐    │
│  │  [Photo]   Sean T. Shallis          │    │
│  │            Private Wealth Mortgage   │    │
│  │            Strategist               │    │
│  │                                     │    │
│  │  The story: Army → Real Estate →    │    │
│  │  Coaching → NLP → AI →              │    │
│  │  "Building the Guardian Family"     │    │
│  │                                     │    │
│  │  Key frameworks:                    │    │
│  │  • Billion Dollar Blind Spot™       │    │
│  │  • 10X Personal Success Formula™    │    │
│  │  • Internal Intelligence™ (I²)      │    │
│  │                                     │    │
│  │  [Read Sean's Story →]              │    │
│  └─────────────────────────────────────┘    │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  CONTENT HUB                                │
│  ┌─────────────────────────────────────┐    │
│  │ Tabs: Podcast | Blog | Media | Book │    │
│  │                                     │    │
│  │ ┌────────┐ ┌────────┐ ┌────────┐   │    │
│  │ │Latest  │ │Featured│ │WSJ     │   │    │
│  │ │Episode │ │Post    │ │Article │   │    │
│  │ └────────┘ └────────┘ └────────┘   │    │
│  └─────────────────────────────────────┘    │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  TESTIMONIALS (carousel)                    │
│  Zillow 5-star · Google reviews             │
│  Real quotes from real clients              │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  FOOTER                                     │
│  Guardian Family™ · Sean T. Shallis         │
│  NMLS #2362814 · Equal Housing Lender       │
│  [LinkedIn] [Podcast] [Book]                │
│                                             │
└─────────────────────────────────────────────┘
```

### Why This Is The Winner
1. **Dual identity**: Warm personal brand (light) + premium AI platform (dark) — both audiences served
2. **The light→dark→light transition** mirrors the user journey: trust → technology → proof
3. **Spoke headers in nav** show the full vision at first glance
4. **Active vs upcoming spokes** create anticipation without cluttering
5. **Gear visualization in hero** delivers the "aha moment" for the ecosystem
6. **Rosie chat is positioned twice**: nav CTA (always visible) + dedicated preview section (demo)
7. **Each spoke section is a mini-landing page** — can be deep-linked from ads, emails, social
8. **Content hub builds SEO authority** — Sean's media appearances + podcast + blog
9. **Mobile**: hero stacks, spokes become full-width cards, chat preview becomes bottom-sheet

### Conversion Architecture (5 funnels)
```
Funnel 1: Direct → Ask Rosie (nav CTA, always visible)
  Click → /rate-guardian/ask-rosie → Chat intake → GHL webhook → Follow-up

Funnel 2: Spoke → Rate Guardian spotlight
  Scroll/click → Rate Guardian section → "Ask Rosie" → Chat → GHL

Funnel 3: Coming Soon → Waitlist capture
  Spoke card → "Get Notified" → Email capture → Drip sequence

Funnel 4: Content → Authority → Conversion
  Blog/Podcast → SEO traffic → Read/Listen → Ask Rosie CTA → Chat

Funnel 5: Direct contact
  About section → "Work with Sean" → Direct booking/phone
```

---

## ROUTE ARCHITECTURE

```
seanshallis.com/
├── /                           ← Hub page (Concept 3 above)
├── /about                      ← Full bio, story, frameworks
├── /content                    ← Blog + Podcast + Media hub
│   ├── /content/podcast        ← Podcast episodes
│   ├── /content/blog           ← Blog posts
│   └── /content/media          ← Press, interviews
├── /rate-guardian              ← Rate Guardian landing
│   ├── /rate-guardian/ask-rosie ← Chat intake (the funnel)
│   ├── /rate-guardian/dashboard ← Existing ops dashboard (auth-gated)
│   └── /rate-guardian/monitor   ← Consumer monitoring dashboard (future)
├── /health-guardian            ← Coming soon page + waitlist
├── /trade-guardian             ← Coming soon page + waitlist
├── /time-guardian              ← Coming soon page + waitlist
├── /wealth-guardian            ← Coming soon page + waitlist
├── /book                       ← 10X House Selling Secrets
└── /api/rg/*                   ← Existing API routes (unchanged)
```

---

## MOBILE BREAKPOINTS

```
sm (640px):   Stack everything. Nav → hamburger + "Ask Rosie" stays visible.
              Spoke headers → horizontal pill scroll.
              Gear viz → simplified (Sean center + 2-3 visible spokes).
md (768px):   2-column layouts. Spoke cards side by side.
lg (1024px):  Full desktop layout.
xl (1280px):  Max-width container (1200px centered).
```

---

## IMPLEMENTATION PRIORITY

### Phase 1 — Ship This Week (MVP Hub)
1. Install shadcn/ui + Geist font optimization
2. Build spoke nav header component
3. Rebuild homepage with Concept 3 layout (simplified — skip animations)
4. Port Ask Rosie chat UI from Lovable → `/rate-guardian/ask-rosie`
5. Rewire chat backend from Supabase/Gemini → Next.js API route + AI Gateway + Claude

### Phase 2 — Polish (Week 2)
6. Gear visualization (CSS/SVG, can start simple)
7. Light→dark→light background transitions
8. Coming soon spoke pages with email capture
9. Content hub skeleton
10. Testimonial carousel

### Phase 3 — Scale (Week 3+)
11. Consumer monitoring dashboard (`/rate-guardian/monitor`)
12. Blog/Podcast CMS integration
13. Health Guardian placeholder buildout
14. SEO + OG images + structured data
15. Analytics + Speed Insights

---

## COMPONENTS NEEDED (from ask-rosie-ai audit)

### Port from Lovable (rewrite for Next.js 16 + React 19)
- `ChatInterface` → `app/rate-guardian/ask-rosie/page.tsx` (client component)
- `ChatBubble` → `components/chat/ChatBubble.tsx`
- `QuickReply` → `components/chat/QuickReply.tsx`
- `TypingIndicator` → `components/chat/TypingIndicator.tsx`
- `IntroSlides` → `components/chat/IntroSlides.tsx`
- `RatesWidget` → `components/chat/RatesWidget.tsx`

### New components to build
- `SpokeNav` — the header with Guardian spoke tabs
- `GearVisualization` — animated SVG gear system
- `SpokeCard` — individual Guardian spoke section
- `TrustBar` — media logos + stats strip
- `RosieAvatar` — reusable Rosie identity element (photo + glow)
- `ChatPreview` — auto-playing demo conversation
- `WaitlistCapture` — email input for coming-soon spokes
- `ContentCard` — blog/podcast/media preview cards
- `TestimonialCarousel` — review/testimonial slider

### shadcn components to install
button, card, input, dialog, sheet, tabs, badge, tooltip, avatar,
scroll-area, separator, skeleton, carousel, form, navigation-menu
