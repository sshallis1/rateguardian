"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, Loader2 } from "lucide-react";

const QUICK_REPLIES = [
  "Is this estimate high?",
  "What should this cost locally?",
  "Can I reduce this?",
  "Should I get another bid?",
  "What questions should I ask this contractor?",
  "Can your team help me source this cheaper?",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function RosiePGChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Rosie, your renovation advocate. I can help you understand estimates, compare costs locally, flag potential overpays, and suggest smarter ways to get the work done. What can I help with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/rosie/widget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Chat request failed");

      // Handle streaming response
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let assistantContent = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantContent,
          };
          return updated;
        });
      }

      // If streaming didn't produce content, try JSON fallback
      if (!assistantContent) {
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = {
            role: "assistant",
            content:
              "I'm having trouble connecting right now. Try refreshing or come back in a moment.",
          };
          return updated;
        });
      }
    } catch {
      setMessages((m) => [
        ...m.filter((msg) => msg.content !== ""),
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. The AI backend may not be configured yet. Try again later.",
        },
      ]);
    }
    setLoading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
      {/* Chat Messages */}
      <div className="h-[500px] overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-orange-600 text-white"
                  : "bg-neutral-100 text-neutral-900"
              }`}
            >
              {m.role === "assistant" && (
                <div className="flex items-center gap-1.5 mb-1">
                  <MessageCircle size={12} className="text-orange-600" />
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                    Rosie
                  </span>
                </div>
              )}
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-neutral-100 rounded-2xl px-4 py-3">
              <Loader2 size={16} className="animate-spin text-neutral-400" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-6 pb-3">
          <div className="flex flex-wrap gap-2">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                disabled={loading}
                className="text-xs bg-neutral-50 border border-neutral-200 rounded-full px-3 py-1.5 text-neutral-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-neutral-200 p-4 flex gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Rosie about your project..."
          disabled={loading}
          className="flex-1 px-4 py-3 border border-neutral-300 rounded-xl text-sm focus:border-orange-500 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 transition-colors disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
