// Ask Rosie — Intent/buying signal scoring
// Returns 0-100 based on mortgage-related signals in conversation

const RATE_PATTERNS = [
  /\d+\.?\d*\s*%/,           // percentage mentions
  /\d{1,2}\.\d{1,3}/,        // decimal numbers (likely rates)
  /rate/i,
  /refi(nance)?/i,
  /mortgage/i,
  /interest/i,
  /apr/i,
  /arm/i,
  /fixed/i,
];

const DOLLAR_PATTERNS = [
  /\$[\d,]+/,                 // dollar amounts
  /\d{3,}k/i,                // 500k, 800K
  /loan\s*amount/i,
  /balance/i,
  /equity/i,
  /down\s*payment/i,
  /purchase\s*price/i,
];

const TIMELINE_PATTERNS = [
  /this\s*(month|week|year)/i,
  /next\s*(month|week|year)/i,
  /looking\s*to\s*(buy|close|refi)/i,
  /ready\s*to/i,
  /asap/i,
  /soon/i,
  /closing\s*(date|in)/i,
  /under\s*contract/i,
  /pre-?approv/i,
];

const COMPARISON_PATTERNS = [
  /better\s*(rate|deal)/i,
  /compare/i,
  /shopping/i,
  /quoted/i,
  /offer/i,
  /current\s*(lender|rate|bank)/i,
  /switch/i,
  /lock/i,
];

interface IntentScore {
  score: number;
  signals: string[];
}

export function scoreIntent(messages: string[]): IntentScore {
  const combined = messages.join(" ");
  const signals: string[] = [];
  let score = 0;

  // Rate mentions (high signal)
  const rateHits = RATE_PATTERNS.filter((p) => p.test(combined)).length;
  if (rateHits > 0) {
    score += Math.min(rateHits * 10, 25);
    signals.push("rate_mention");
  }

  // Dollar amounts (high signal)
  const dollarHits = DOLLAR_PATTERNS.filter((p) => p.test(combined)).length;
  if (dollarHits > 0) {
    score += Math.min(dollarHits * 12, 25);
    signals.push("financial_details");
  }

  // Timeline urgency (very high signal)
  const timelineHits = TIMELINE_PATTERNS.filter((p) => p.test(combined)).length;
  if (timelineHits > 0) {
    score += Math.min(timelineHits * 15, 30);
    signals.push("timeline_urgency");
  }

  // Comparison shopping (high signal)
  const compHits = COMPARISON_PATTERNS.filter((p) => p.test(combined)).length;
  if (compHits > 0) {
    score += Math.min(compHits * 10, 20);
    signals.push("comparison_shopping");
  }

  // Message volume bonus (engagement signal)
  if (messages.length >= 3) score += 5;
  if (messages.length >= 5) score += 5;
  if (messages.length >= 8) score += 5;

  return { score: Math.min(score, 100), signals };
}
