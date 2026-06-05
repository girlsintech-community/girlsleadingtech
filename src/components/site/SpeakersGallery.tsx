import { Linkedin } from "lucide-react";

interface Speaker {
  id: string;
  name: string;
  designation?: string;
  company?: string;
  image?: string;
  linkedin?: string;
}

interface SpeakersGalleryProps {
  filteredSpeakers: Speaker[];
}

function SpeakerCardItem({ speaker, delay }: { speaker: Speaker; delay: number }) {
  const { name, designation, company, image, linkedin } = speaker;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="group relative w-full flex flex-col items-center gap-3 sm:gap-4 select-none animate-fade-up transition-all duration-300 ease-out hover:scale-[1.04] z-10 hover:z-30"
      style={{
        animationDelay: `${(delay % 10) * 0.05}s`,
      }}
    >
      {/* PERFECT CIRCULAR SPEAKER IMAGE (Always colorful, static on hover) */}
      <div className="w-full aspect-square rounded-full overflow-hidden shadow-md bg-white border border-border/10">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-display text-2xl text-white bg-gradient-to-br from-[#d955a4] to-[#c64393]">
            {initials}
          </div>
        )}
      </div>

      {/* PINK INFO CARD CONTAINER (Saves layout space in grid) */}
      <div className="relative w-[88%] h-[60px] sm:h-[72px] md:h-[82px] z-20">
        
        {/* PINK CARD (Expands absolutely downwards on hover to reveal full multi-line text) */}
        <div
          className="
            absolute top-0 left-0 right-0
            h-full min-h-full
            flex flex-col justify-center
            bg-gradient-to-br from-[#d955a4] to-[#c64393]
            rounded-none p-2 px-4 sm:px-5 shadow-md
            transition-all duration-300 ease-out
            group-hover:h-auto group-hover:min-h-[100%] group-hover:py-4
            group-hover:shadow-[0_10px_25px_rgba(217,85,164,0.4)]
            z-30
          "
        >
          {/* LINKEDIN ICON - TOP RIGHT OF THE CONTENT CARD */}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevent card selection click bubble
              aria-label={`${name} on LinkedIn`}
              className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 z-40 bg-[#0077b5] text-white hover:bg-white hover:text-[#0077b5] transition-all duration-200 p-0.5 sm:p-1 flex items-center justify-center rounded-none shadow-sm"
            >
              <Linkedin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
            </a>
          )}

          <div className="text-center min-w-0">
            {/* Speaker Name */}
            <h4
              className="text-white font-bold leading-tight truncate group-hover:whitespace-normal group-hover:overflow-visible"
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(11px, 2vw, 15px)",
              }}
            >
              {name}
            </h4>
            
            {/* Title / Company */}
            <p
              className="text-white/95 mt-0.5 leading-tight font-normal truncate group-hover:whitespace-normal group-hover:overflow-visible"
              style={{
                fontFamily: "sans-serif",
                fontSize: "clamp(8.5px, 1.8vw, 12px)",
              }}
            >
              {designation}
              {company && designation ? ` @ ${company}` : company ? company : ""}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function SpeakersGallery({ filteredSpeakers }: SpeakersGalleryProps) {
  return (
    <div className="w-full mt-10">
      {filteredSpeakers.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-12">
          No matches. Try a different search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10">
          {filteredSpeakers.map((s, index) => (
            <SpeakerCardItem key={s.id} speaker={s} delay={index} />
          ))}
        </div>
      )}
    </div>
  );
}
