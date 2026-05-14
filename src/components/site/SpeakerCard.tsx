import { Linkedin } from "lucide-react";

export interface SpeakerCardProps {
  name: string;
  designation?: string;
  company?: string;
  image?: string;
  linkedin?: string;
  delay?: number;
}

export function SpeakerCard({ name, designation, company, image, linkedin, delay = 0 }: SpeakerCardProps) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <article
      className="group relative animate-fade-up overflow-hidden rounded-[2rem] bg-card ring-1 ring-border/60 shadow-soft transition-all duration-500 hover:-translate-y-1.5"
      style={{ animationDelay: `${(delay % 12) * 0.05}s` }}
    >
      {/* Portrait */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-muted via-pink-soft/40 to-lavender/30">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-6xl text-primary/40">
            {initials}
          </div>
        )}

        {/* Gradient veil at bottom for legibility on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* LinkedIn pill — top right */}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#0A66C2] backdrop-blur-md ring-1 ring-white/70 transition hover:bg-[#0A66C2] hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* Caption */}
      <div className="relative px-5 pb-5 pt-4">
        <h3 className="font-display text-lg leading-tight tracking-tight">{name}</h3>
        {designation && (
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            {designation}
          </p>
        )}
        {company && (
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{company}</p>
        )}
      </div>
    </article>
  );
}
