"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Loader2, Shield, Clock, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { scoreIntent } from "@/lib/chat/intent-detector";
import { ProgressiveCapture, CapturedConfirmation } from "./ProgressiveCapture";
import { SavingsScoreTeaser } from "./SavingsScoreTeaser";
import { ValueInjection, getValueInjectionType } from "./ValueInjection";

const QUICK_REPLIES = [
  { label: "I'm buying my first home", value: "I'm just starting my home buying journey. Help me understand rates." },
  { label: "I'm shopping rates", value: "I'm already under contract and shopping for the best rate." },
  { label: "I own my home — can I save?", value: "I already own my home. Can you help me see if I'm overpaying?" },
  { label: "Just monitor my rate", value: "I'd like Rosie to monitor my rate and alert me if I'm overpaying." },
];

export function AskRosieChat() {
  const [started, setStarted] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [captured, setCaptured] = React.useState(false);
  const [capturedName, setCapturedName] = React.useState<string | undefined>();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/rosie/chat" }),
  });

  const isStreaming = status === "streaming" || status === "submitted";

  // Compute intent score from user messages
  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => m.parts?.map((p) => (p.type === "text" ? p.text : "")).join("") ?? "");
  const userMsgCount = userMessages.length;
  const { score: intentScore, signals } = scoreIntent(userMessages);

  // Determine value injection points
  const valueInjectionType = getValueInjectionType(userMsgCount, signals);

  // Show savings teaser when intent is strong enough — the teaser itself
  // gates the score behind email capture, so it can appear pre-capture
  const showSavingsTeaser = intentScore > 40 && userMsgCount >= 3;

  // Auto-scroll to latest message
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, captured]);

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    sendMessage({ text: trimmed });
    setInput("");
    setStarted(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSend(input);
  }

  function handleCaptured(data: { email: string; firstName?: string; phone?: string }) {
    setCaptured(true);
    if (data.firstName) setCapturedName(data.firstName);
  }

  return (
    <div className="flex-1 flex flex-col">
      <Container className="flex-1 flex flex-col py-6 md:py-10 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-200">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[color:var(--brand-teal)] to-[color:var(--brand-teal-dark)] flex items-center justify-center text-white text-xl font-bold shadow-lg">
              R
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[color:var(--status-success)] border-2 border-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg">Rosie</h1>
              <span className="text-xs text-[color:var(--status-success)] font-mono font-bold uppercase">
                · Watching
              </span>
            </div>
            <p className="text-sm text-neutral-500">Your Rate Guardian · Free Forever</p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> 90 sec
            </span>
            <span className="flex items-center gap-1.5">
              <Shield size={12} /> No credit impact
            </span>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-4 mb-6 min-h-[400px] md:min-h-[480px]"
        >
          {/* Welcome state */}
          {!started && messages.length === 0 && (
            <div className="py-8 space-y-6 animate-fade-in">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  R
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm border border-neutral-200 px-5 py-4 shadow-sm max-w-[85%]">
                  <p className="text-neutral-800 leading-relaxed">
                    Hi — I'm Rosie. I watch mortgage rates multiple times a day
                    so my people never overpay. Tell me where you are and I'll
                    give you a free Savings Score.
                  </p>
                  <p className="text-neutral-800 leading-relaxed mt-3">
                    Where should we start?
                  </p>
                </div>
              </div>

              {/* Quick reply intents */}
              <div className="pl-11 space-y-2">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => handleSend(q.value)}
                    className="block w-full max-w-md text-left px-5 py-3 rounded-2xl border-2 border-neutral-200 bg-white hover:border-[color:var(--brand-teal)] hover:bg-[color:var(--brand-teal)]/5 transition-all text-sm font-medium text-neutral-800"
                  >
                    {q.label}
                  </button>
                ))}
              </div>

              {/* Trust strip */}
              <div className="pl-11 pt-4 flex flex-wrap gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Heart size={12} className="text-[color:var(--status-error)]" />
                  Named after Sean's dog — a real guardian
                </span>
              </div>
            </div>
          )}

          {/* Rendered messages with value injection */}
          {messages.map((m, idx) => {
            const isUser = m.role === "user";
            const text = m.parts
              ?.map((p) => (p.type === "text" ? p.text : ""))
              .join("") ?? "";

            // Count user messages up to this point for injection timing
            const userMsgsToHere = messages
              .slice(0, idx + 1)
              .filter((x) => x.role === "user").length;

            // Determine if we should inject a value card after this message
            const injectionType = isUser
              ? null
              : getValueInjectionType(userMsgsToHere, signals);
            // Only inject once per type
            const shouldInject =
              injectionType &&
              !captured &&
              userMsgsToHere === (injectionType === "savings_stat" ? 2 : injectionType === "social_proof" ? 5 : 3);

            return (
              <React.Fragment key={m.id}>
                <div
                  className={cn(
                    "flex gap-3 animate-fade-in",
                    isUser && "justify-end"
                  )}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      R
                    </div>
                  )}
                  <div
                    className={cn(
                      "px-5 py-3 rounded-2xl max-w-[85%] shadow-sm leading-relaxed",
                      isUser
                        ? "bg-[color:var(--brand-teal)] text-white rounded-tr-sm"
                        : "bg-white text-neutral-800 border border-neutral-200 rounded-tl-sm"
                    )}
                  >
                    {text || (
                      <span className="inline-flex items-center gap-2 text-neutral-400">
                        <Loader2 size={14} className="animate-spin" />
                        thinking...
                      </span>
                    )}
                  </div>
                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      You
                    </div>
                  )}
                </div>
                {shouldInject && <ValueInjection type={injectionType} />}
              </React.Fragment>
            );
          })}

          {/* Typing indicator */}
          {isStreaming && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                R
              </div>
              <div className="bg-white border border-neutral-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {/* Progressive capture — replaces old static LeadCapture */}
          {!captured && !isStreaming && started && (
            <ProgressiveCapture
              intentScore={intentScore}
              messageCount={userMsgCount}
              onCaptured={handleCaptured}
            />
          )}

          {/* Post-capture confirmation */}
          {captured && !showSavingsTeaser && (
            <CapturedConfirmation firstName={capturedName} />
          )}

          {/* Savings score teaser — gates score behind email capture */}
          {showSavingsTeaser && (
            <SavingsScoreTeaser
              captured={captured}
              onEmailGate={(email) => {
                setCaptured(true);
                // Also submit to intake
                fetch("/api/rg/intake/askrosie", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, source: "savings_score_gate" }),
                }).catch(() => {});
              }}
            />
          )}

          {error && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[color:var(--status-error)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                !
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl rounded-tl-sm px-5 py-3 text-sm text-red-800">
                Rosie is taking a nap. Try again in a moment, or reach Sean
                directly: (973) 457-2278
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="sticky bottom-0 bg-[color:var(--brand-cream)] pt-4"
        >
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell Rosie what's on your mind..."
                disabled={isStreaming}
                className="w-full h-14 px-6 pr-14 rounded-full border-2 border-neutral-300 bg-white focus:border-[color:var(--brand-teal)] focus:outline-none text-base disabled:opacity-50 shadow-sm"
              />
              <Button
                type="submit"
                disabled={isStreaming || !input.trim()}
                size="icon"
                className="absolute right-2 top-2 !h-10 !w-10 !rounded-full"
                aria-label="Send message"
              >
                {isStreaming ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </Button>
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-3 text-center">
            Rosie is free forever. Your info only goes to Sean — never third
            parties.
          </p>
        </form>
      </Container>
    </div>
  );
}
