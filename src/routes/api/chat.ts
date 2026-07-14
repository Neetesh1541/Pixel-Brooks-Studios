import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: ChatMessage[] };
        try {
          body = (await request.json()) as { messages?: ChatMessage[] };
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        const { messages } = body;
        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response("messages required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("AI is not configured. Please contact pixelbrookstudio@gmail.com.", {
            status: 500,
          });
        }

        const system: ChatMessage = {
          role: "system",
          content:
            "You are Pixel Brook AI — the friendly concierge assistant for Pixel Brook, a premium digital agency that builds websites, SaaS platforms, brands, mobile apps and AI automations. Be warm, concise (2-4 sentences), and helpful. Ask smart follow-up questions about the visitor's project (goal, timeline, budget). For serious inquiries, direct them to email pixelbrookstudio@gmail.com or call +91 82188 28273 / +91 80770 67635.",
        };

        let upstream: Response;
        try {
          upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [system, ...messages],
              stream: true,
            }),
          });
        } catch (err) {
          console.error("chat upstream fetch failed", err);
          return new Response("Failed to reach AI gateway", { status: 502 });
        }

        if (!upstream.ok || !upstream.body) {
          const text = await upstream.text().catch(() => "");
          console.error("chat upstream error", upstream.status, text);
          return new Response(text || "upstream error", { status: upstream.status });
        }

        return new Response(upstream.body, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            "X-Accel-Buffering": "no",
          },
        });
      },
    },
  },
});
