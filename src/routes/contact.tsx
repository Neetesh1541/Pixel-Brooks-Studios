import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, ContactForm } from "@/components/site";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — NexGen" },
      { name: "description", content: "Tell us about your project. We reply within 24 hours." },
      { property: "og:title", content: "Contact — NexGen" },
      { property: "og:description", content: "Let's build the future — reach out and we'll get back within a day." },
    ],
  }),
});

function ContactPage() {
  return (
    <SiteShell>
      <div className="pt-16"><ContactForm /></div>
    </SiteShell>
  );
}
