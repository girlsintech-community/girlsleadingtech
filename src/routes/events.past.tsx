import { createFileRoute, Link } from "@tanstack/react-router";
import { events } from "@/data/community";
import { youtubeThumb, getSpeakerImageByName } from "@/lib/event-helpers";
import { Calendar, Play } from "lucide-react";

export const Route = createFileRoute("/events/past")({
  component: PastEvents,
});

function PastEvents() {
  const list = events
    .filter((e) => e.status === "past")
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return (
    <section className="container mx-auto max-w-6xl px-6 py-14 pb-20">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => {
          const thumb = youtubeThumb(e.youtubeLink) || e.posterImage;
          const speakerImg = getSpeakerImageByName(e.speakerName);
          return (
            <Link key={e.id} to="/events/$eventId" params={{ eventId: e.id }} className="group">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-border/60 shadow-soft transition-all duration-500 hover:-translate-y-1.5">
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-pink-soft/40 via-lavender/30 to-peach/40">
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={e.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-display text-3xl text-primary/40">
                      {e.title.charAt(0)}
                    </div>
                  )}
                  <span className="absolute left-3 top-3 inline-block rounded-full bg-secondary/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur">
                    Past
                  </span>
                  {e.youtubeLink && (
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
                      <Play className="h-3 w-3" /> Recording
                    </span>
                  )}
                </div>
                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg leading-tight">{e.title}</h3>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border">
                      {speakerImg ? (
                        <img src={speakerImg} alt={e.speakerName} className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs font-semibold text-primary/50">
                          {e.speakerName?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-xs font-semibold text-foreground">{e.speakerName}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{e.speakerCompany}</div>
                    </div>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(e.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
