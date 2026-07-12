import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Process } from "@/components/site";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () => ({
    meta: [
      { title: "Process — Pixel Brook" },
      { name: "description", content: "How Pixel Brook takes products from idea to launch in weeks: discover, research, design, develop, launch, grow." },
      { property: "og:title", content: "Process — Pixel Brook" },
      { property: "og:description", content: "A six-step process built for founders who ship." },
      { property: "og:url", content: "/process" },
    ],
    links: [{ rel: "canonical", href: "/process" }],
  }),
});

function ProcessPage() {
  return (
    <SiteShell>
      <div className="pt-24"><Process /></div>
    </SiteShell>
  );
}
