import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Process } from "@/components/site";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () => ({
    meta: [
      { title: "Process — NexGen" },
      { name: "description", content: "How we take products from idea to launch in weeks: discover, research, design, develop, launch, grow." },
      { property: "og:title", content: "Process — NexGen" },
      { property: "og:description", content: "A six-step process built for founders who ship." },
    ],
  }),
});

function ProcessPage() {
  return (
    <SiteShell>
      <div className="pt-24"><Process /></div>
    </SiteShell>
  );
}
