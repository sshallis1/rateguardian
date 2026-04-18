"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Mic, MicOff, Send, Loader2, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpeechRecognitionInstance = any;

export function BoothMode() {
  const [input, setInput] = React.useState("");
  const [listening, setListening] = React.useState(false);
  const [ttsEnabled, setTtsEnabled] = React.useState(true);
  const [speaking, setSpeaking] = React.useState(false);
  const [ttsUnlocked, setTtsUnlocked] = React.useState(false);
  const recognitionRef = React.useRef<SpeechRecognitionInstance>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const lastSpokenRef = React.useRef<string>("");
  const voicesRef = React.useRef<SpeechSynthesisVoice[]>([]);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/rosie/booth" }),
  });

  const isStreaming = status === "streaming" || status === "submitted";

  // Unlock TTS on first user gesture (required by mobile browsers)
  function unlockTTS() {
    if (ttsUnlocked) return;
    const silent = new SpeechSynthesisUtterance("");
    silent.volume = 0;
    window.speechSynthesis.speak(silent);
    setTtsUnlocked(true);
  }

  // Load voices (they load async, especially on mobile)
  React.useEffect(() => {
    function loadVoices() {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) voicesRef.current = v;
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    // Some browsers need a delay
    const t = setTimeout(loadVoices, 500);
    return () => clearTimeout(t);
  }, []);

  // Pick the best available voice
  function pickVoice(): SpeechSynthesisVoice | undefined {
    const voices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
    // Prefer natural/enhanced female voices
    const priorities = [
      "Samantha", "Karen", "Zira", "Moira", "Tessa", "Fiona",
      "Google US English", "Microsoft Zira", "Female",
    ];
    for (const name of priorities) {
      const match = voices.find((v) => v.name.includes(name) && v.lang.startsWith("en"));
      if (match) return match;
    }
    return voices.find((v) => v.lang.startsWith("en"));
  }

  // Speak text, splitting long text into chunks for iOS compatibility
  function speakText(text: string) {
    window.speechSynthesis.cancel();
    const voice = pickVoice();

    // Split into sentences to avoid iOS 15-second cutoff
    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    // Group into chunks of ~2-3 sentences
    const chunks: string[] = [];
    let current = "";
    for (const s of sentences) {
      if (current.length + s.length > 200 && current.length > 0) {
        chunks.push(current.trim());
        current = s;
      } else {
        current += s;
      }
    }
    if (current.trim()) chunks.push(current.trim());

    setSpeaking(true);
    let i = 0;

    function speakNext() {
      if (i >= chunks.length) {
        setSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(chunks[i]);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      if (voice) utterance.voice = voice;
      utterance.onend = () => {
        i++;
        speakNext();
      };
      utterance.onerror = () => {
        setSpeaking(false);
      };
      window.speechSynthesis.speak(utterance);
    }

    speakNext();
  }

  // Auto-scroll
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // TTS: speak Rosie's latest response when streaming completes
  React.useEffect(() => {
    if (isStreaming || !ttsEnabled || messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (last.role !== "assistant") return;
    const text = last.parts?.map((p) => (p.type === "text" ? p.text : "")).join("") ?? "";
    if (!text || text === lastSpokenRef.current) return;
    lastSpokenRef.current = text;
    speakText(text);
  }, [messages, isStreaming, ttsEnabled]);

  function startListening() {
    unlockTTS(); // Unlock audio on first user gesture
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
    unlockTTS(); // Unlock audio on first user gesture
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <div className="min-h-screen bg-[#002855] text-white flex flex-col">
      {/* Booth header */}
      <div className="bg-[#D71E28] py-3 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src="/rosie/rate-guardian-logo.png"
              alt="Rosie"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-sm font-bold text-white">Rosie — Live</span>
            <span className="ml-2 text-xs text-white/70">Booth Mode</span>
          </div>
        </div>
        <button
          onClick={() => {
            setTtsEnabled(!ttsEnabled);
            if (ttsEnabled) window.speechSynthesis.cancel();
          }}
          className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors"
        >
          {ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          {ttsEnabled ? "Voice On" : "Voice Off"}
        </button>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="relative w-24 h-24">
              <Image
                src="/rosie/rate-guardian-logo.png"
                alt="Rosie"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-3">Hey Rosie...</h1>
              <p className="text-blue-200/60 text-lg max-w-sm">
                Tap the mic and introduce your prospect. Rosie will reply out loud.
              </p>
            </div>
            <div className="text-sm text-blue-200/40 max-w-md leading-relaxed">
              Try: &ldquo;Hey Rosie, say hi to Dr. Smith — she&apos;s a physician
              in LA looking for a new home.&rdquo;
            </div>
          </div>
        )}

        {messages.map((m) => {
          const isUser = m.role === "user";
          const text =
            m.parts?.map((p) => (p.type === "text" ? p.text : "")).join("") ??
            "";
          return (
            <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-3xl px-6 py-4 ${
                  isUser
                    ? "bg-white/10 text-white rounded-tr-sm"
                    : "bg-[#0e6b6d] text-white rounded-tl-sm shadow-lg"
                }`}
              >
                {!isUser && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#c8a550] uppercase tracking-wider">
                      Rosie
                    </span>
                    {speaking && (
                      <span className="flex items-center gap-1 text-xs text-white/50">
                        <Volume2 size={12} className="animate-pulse" />
                        speaking
                      </span>
                    )}
                  </div>
                )}
                <p className="text-lg leading-relaxed">
                  {text || (
                    <span className="inline-flex items-center gap-2 text-white/50">
                      <Loader2 size={16} className="animate-spin" />
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
            <div className="bg-[#0e6b6d] rounded-3xl rounded-tl-sm px-6 py-4 shadow-lg">
              <div className="flex gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-white/40 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full bg-white/40 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full bg-white/40 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="sticky bottom-0 bg-[#002855] border-t border-white/10 px-5 py-4 pb-[env(safe-area-inset-bottom,16px)]">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          {/* Mic button */}
          <button
            type="button"
            onClick={listening ? stopListening : startListening}
            disabled={isStreaming}
            className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              listening
                ? "bg-[#D71E28] animate-pulse shadow-lg shadow-red-500/30"
                : "bg-white/10 hover:bg-white/20"
            } disabled:opacity-50`}
          >
            {listening ? (
              <MicOff size={22} className="text-white" />
            ) : (
              <Mic size={22} className="text-white" />
            )}
          </button>

          {/* Text input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={listening ? "Listening..." : "Or type here..."}
              disabled={isStreaming}
              className="w-full h-14 px-5 pr-14 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#c8a550] focus:outline-none text-base disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="absolute right-2 top-2 w-10 h-10 rounded-full bg-[#c8a550] flex items-center justify-center text-[#002855] disabled:opacity-30 transition-opacity"
            >
              {isStreaming ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
