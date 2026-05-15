import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { GlassCard } from "@/components/site/GlassCard";
import { peopleToFollow } from "@/data/community";
import { Linkedin, Twitter, Globe } from "lucide-react";

export const Route = createFileRoute("/resources/people")({
  head: () => ({
    meta: [
      { title: "People to Follow — Girls Leading Tech" },
      { name: "description", content: "Influential voices in tech worth following." },
    ],
  }),
  component: PeoplePage,
});

function PeoplePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources / People"
        title="Voices worth following."
        description="Curated thought leaders shaping the future of tech, AI and business."
      />
      <section className="container mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {peopleToFollow.map((p) => (
            <GlassCard key={p.id} glow className="p-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-lg font-medium text-white shadow-soft">
                {p.name.charAt(0)}
              </div>
              <h3 className="mt-4 font-display text-xl">{p.name}</h3>
              <span className="text-xs font-medium uppercase tracking-widest text-primary">{p.domain}</span>
              {p.summary && <p className="mt-3 text-sm text-muted-foreground">{p.summary}</p>}
              <div className="mt-5 flex gap-2">
                {p.linkedin && (
                  <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full glass hover:scale-110 transition">
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {p.twitter && (
                  <a href={p.twitter} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full glass hover:scale-110 transition">
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {p.portfolio && (
                  <a href={p.portfolio} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full glass hover:scale-110 transition">
                    <Globe className="h-4 w-4" />
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
        <p className="mt-12 text-center text-sm text-muted-foreground">
          More voices being curated by our team — check back soon.
        </p>
      </section>
    </>
  );
}
