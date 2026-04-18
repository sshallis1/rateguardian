import { NextRequest } from "next/server";

export const maxDuration = 30;

// ElevenLabs voice IDs — swap to a custom Rosie clone later
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "EXAVITQu4vr4xnSDxMaL"; // Sarah (warm, professional)
const MODEL_ID = "eleven_turbo_v2"; // Low-latency for real-time booth use

export async function POST(req: NextRequest) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return new Response("ElevenLabs API key not configured", { status: 500 });
  }

  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return new Response("Missing text", { status: 400 });
    }

    // Stream audio from ElevenLabs
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: MODEL_ID,
          voice_settings: {
            stability: 0.6, // Slightly more expressive for booth energy
            similarity_boost: 0.8,
            style: 0.4, // Natural warmth
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("[rosie/speak] ElevenLabs error:", response.status, err);
      return new Response("Voice generation failed", { status: 502 });
    }

    // Pass through the audio stream
    return new Response(response.body, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("[rosie/speak] error:", error);
    return new Response("Internal error", { status: 500 });
  }
}
