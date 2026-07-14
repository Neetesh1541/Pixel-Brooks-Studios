import { createFileRoute } from "@tanstack/react-router";

type ContactPayload = { name?: string; email?: string; project?: string; message?: string };

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: ContactPayload;
        try {
          body = (await request.json()) as ContactPayload;
        } catch {
          return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
            status: 400,
          });
        }

        const name = (body.name ?? "").trim();
        const email = (body.email ?? "").trim();
        const project = (body.project ?? "").trim();
        const message = (body.message ?? "").trim();

        if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return new Response(JSON.stringify({ ok: false, error: "Missing or invalid fields" }), {
            status: 400,
          });
        }

        // Always log server-side so inquiries are never silently lost, even
        // if no outbound email provider is configured yet.
        console.log("New contact inquiry", { name, email, project, message });

        const webhook = process.env.CONTACT_WEBHOOK_URL;
        if (webhook) {
          try {
            const upstream = await fetch(webhook, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                to: "pixelbrookstudio@gmail.com",
                subject: `New project inquiry — ${project || "General"}`,
                name,
                email,
                project,
                message,
              }),
            });
            if (upstream.ok) {
              return new Response(JSON.stringify({ ok: true }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
              });
            }
          } catch (err) {
            console.error("contact webhook failed", err);
          }
        }

        // No email provider configured — tell the client so it can fall back
        // to opening a pre-filled mailto link, which always works.
        return new Response(JSON.stringify({ ok: false, error: "No email provider configured" }), {
          status: 501,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
