"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Mic,
  MicOff,
  Send,
  Loader2,
  Volume2,
  VolumeX,
  X,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpeechRecognitionInstance = any;

/**
 * Floating Rosie AI chat widget — same brain as BoothMode,
 * but rendered as a bottom-right panel overlay.
 */
export function RosieChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [listening, setListening] = React.useState(false);
  const [ttsEnabled, setTtsEnabled] = React.useState(false);
  const [speaking, setSpeaking] = React.useState(false);
  const recognitionRef = React.useRef<SpeechRecognitionInstance>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const lastSpokenRef = React.useRef<string>("");
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/rosie/widget" }),
  });

  const isStreaming = status === "streaming" || status === "submitted";

  // ── TTS ──────────────────────────────────────────────
  async function speakText(text: string) {
    stopSpeaking();
    setSpeaking(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/rosie/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`speak failed: ${res.status}`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        setSpeaking(false);
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setSpeaking(false);
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };
      await audio.play();
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      console.warn("[RosieChatWidget] ElevenLabs failed, falling back to browser TTS:", err);
      fallbackSpeak(text);
    }
  }

  function fallbackSpeak(text: string) {
    if (!window.speechSynthesis) {
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();
    const priorities = [
      "Samantha", "Karen", "Zira", "Moira", "Tessa", "Fiona",
      "Google US English", "Microsoft Zira", "Female",
    ];
    let voice: SpeechSynthesisVoice | undefined;
    for (const name of priorities) {
      voice = voices.find((v) => v.name.includes(name) && v.lang.startsWith("en"));
      if (voice) break;
    }
    if (!voice) voice = voices.find((v) => v.lang.startsWith("en"));

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    if (voice) utterance.voice = voice;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    abortRef.current?.abort();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }

  // ── Auto-scroll ──────────────────────────────────────
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // ── TTS on new response ──────────────────────────────
  React.useEffect(() => {
    if (isStreaming || !ttsEnabled || messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (last.role !== "assistant") return;
    const text = last.parts?.map((p) => (p.type === "text" ? p.text : "")).join("") ?? "";
    if (!text || text === lastSpokenRef.current) return;
    lastSpokenRef.current = text;
    speakText(text);
  }, [messages, isStreaming, ttsEnabled]);

  // ── Speech recognition ───────────────────────────────
  function startListening() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SpeechRecognitionCtor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      alert("Speech recognition not supported in this browser. Try Chrome or Safari.");
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results as ArrayLike<{ 0: { transcript: string }; isFinal: boolean }>)
        .map((r) => r[0].transcript)
        .join("");
      setInput(transcript);

      if (event.results[event.results.length - 1].isFinal) {
        const trimmed = transcript.trim();
        if (trimmed) {
          sendMessage({ text: trimmed });
          setInput("");
        }
        setListening(false);
      }
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setListening(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  // ── Floating button (closed state) ───────────────────
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#0e6b6d] text-white shadow-2xl hover:scale-105 transition-transform flex items-center justify-center group"
        aria-label="Chat with Rosie"
      >
        <div className="relative w-9 h-9">
          <Image
            src="/rosie/rate-guardian-logo.png"
            alt="Rosie"
            fill
            className="object-contain"
          />
        </div>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-[#0e6b6d] animate-ping opacity-30" />
      </button>
    );
  }

  // ── Chat panel (open state) ──────────────────────────
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[min(400px,calc(100vw-2rem))] h-[min(600px,calc(100vh-3rem))] rounded-2xl shadow-2xl border border-white/10 bg-[#002855] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-[#D71E28] py-2.5 px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7">
            <Image
              src="/rosie/rate-guardian-logo.png"
              alt="Rosie"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-sm font-bold text-white">Ask Rosie</span>
            <span className="ml-1.5 text-[10px] text-white/60">AI Rate Guardian</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const next = !ttsEnabled;
              setTtsEnabled(next);
              if (!next) stopSpeaking();
            }}
            className="flex items-center gap-1 text-[10px] text-white/70 hover:text-white transition-colors"
          >
            {ttsEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
          <button
            onClick={() => {
              setOpen(false);
              stopSpeaking();
            }}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[200px] text-center space-y-4 py-8">
            <div className="relative w-16 h-16">
              <Image
                src="/rosie/rate-guardian-logo.png"
                alt="Rosie"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Hey, I&apos;m Rosie!</h2>
              <p className="text-blue-200/60 text-sm max-w-[280px]">
                Your personal Rate Guardian. Ask me about your mortgage, rates, or how I can save you money.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "Check my rate",
                "How does this work?",
                "I have an ARM loan",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    sendMessage({ text: q });
                  }}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => {
          const isUser = m.role === "user";
          const text =
            m.parts?.map((p) => (p.type === "text" ? p.text : "")).join("") ?? "";
          return (
            <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  isUser
                    ? "bg-white/10 text-white rounded-tr-sm"
                    : "bg-[#0e6b6d] text-white rounded-tl-sm shadow-md"
                }`}
              >
                {!isUser && (
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-bold text-[#c8a550] uppercase tracking-wider">
                      Rosie
                    </span>
                    {speaking && (
                      <span className="flex items-center gap-1 text-[10px] text-white/50">
                        <Volume2 size={10} className="animate-pulse" />
                      </span>
                    )}
                  </div>
                )}
                <p className="text-sm leading-relaxed">
                  {text || (
                    <span className="inline-flex items-center gap-1.5 text-white/50">
                      <Loader2 size={14} className="animate-spin" />
                      thinking...
                    </span>
                  )}
                </p>
              </div>
            </div>
          );
        })}

        {isStreaming && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-[#0e6b6d] rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-white/10 px-3 py-3 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <button
            type="button"
            onClick={listening ? stopListening : startListening}
            disabled={isStreaming}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              listening
                ? "bg-[#D71E28] animate-pulse shadow-lg shadow-red-500/30"
                : "bg-white/10 hover:bg-white/20"
            } disabled:opacity-50`}
          >
            {listening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={listening ? "Listening..." : "Ask Rosie anything..."}
              disabled={isStreaming}
              className="w-full h-10 px-4 pr-10 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#c8a550] focus:outline-none text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="absolute right-1.5 top-1.5 w-7 h-7 rounded-full bg-[#c8a550] flex items-center justify-center text-[#002855] disabled:opacity-30 transition-opacity"
            >
              {isStreaming ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Send size={12} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
