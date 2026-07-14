import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, ContactForm } from "@/components/site";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Pixel Brook — Let's Build" },
      {
        name: "description",
        content:
          "Contact Pixel Brook at pixelbrookstudio@gmail.com or call +91 82188 28273. We reply within 24 hours.",
      },
      { property: "og:title", content: "Contact — Pixel Brook" },
      {
        property: "og:description",
        content: "Let's build the future — reach out and we'll get back within a day.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  return (
    <SiteShell>
      <div className="pt-16">
        <ContactForm />
      </div>
    </SiteShell>
  );
}
