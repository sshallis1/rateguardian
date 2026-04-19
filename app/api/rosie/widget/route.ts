import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getRosieSystemPrompt } from "@/lib/rosie/system-prompt";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: "anthropic/claude-sonnet-4.6",
      system: getRosieSystemPrompt("widget"),
      messages: await convertToModelMessages(messages),
      temperature: 0.75,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[rosie/widget] error:", error);
    return new Response(
      JSON.stringify({
        error: "Rosie is taking a nap. Try again in a moment.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
