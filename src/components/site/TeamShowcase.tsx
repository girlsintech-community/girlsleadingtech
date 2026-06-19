import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronUp, ChevronDown, Heart } from "lucide-react";
import MemberProfileCard from "@/components/site/MemberProfileCard";
import type { TeamMember } from "@/data/types";

interface TeamShowcaseProps {
  filteredTeam: TeamMember[];
}

const CARDS_PER_PAGE = 6;

// Sliding-pill tab switcher — matches the gradient pill pattern on the site
function StatusTabs({
  active,
  onChange,
  currentCount,
  pastCount,
}: {
  active: "current" | "past";
  onChange: (value: "current" | "past") => void;
  currentCount: number;
  pastCount: number;
}) {
  const items: { key: "current" | "past"; label: string; count: number }[] = [
    { key: "current", label: "Current", count: currentCount },
    { key: "past", label: "Alumni", count: pastCount },
  ];

  return (
    <div className="inline-flex items-center gap-1 bg-white border border-black/10 rounded-full p-1.5 shadow-sm">
      {items.map((item) => {
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className="relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-2"
          >
            {isActive && (
              <motion.div
                layoutId="teamStatusPill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d955a4] to-[#5b2b4a]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className={`relative z-10 ${isActive ? "text-white" : "text-zinc-500 hover:text-zinc-700"}`}>
              {item.label}
            </span>
            {item.count > 0 && (
              <span
                className={`
                  relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center
                  ${isActive
                    ? "bg-white/20 text-white"
                    : "bg-zinc-100 text-zinc-400"
                  }
                `}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// Warm banner shown above Alumni grid — appreciates their contribution
function AlumniBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start gap-3 bg-gradient-to-r from-[#d955a4]/8 to-[#5b2b4a]/8 border border-[#d955a4]/20 rounded-xl px-4 py-3"
    >
      <Heart className="h-4 w-4 text-[#d955a4] shrink-0 mt-0.5" fill="currentColor" />
      <p className="text-sm text-zinc-500 leading-relaxed">
        <span className="font-semibold text-zinc-700">Grateful for every chapter.</span>{" "}
        These incredible humans helped shape Girls Leading Tech into what it is today.
        Their energy, effort, and ideas live on in everything we do. 🌸
      </p>
    </motion.div>
  );
}

export default function TeamShowcase({ filteredTeam }: TeamShowcaseProps) {
  const [page, setPage] = useState(0);
  const [statusTab, setStatusTab] = useState<"current" | "past">("current");

  // Reset to page 0 whenever tab changes
  useEffect(() => {
    setPage(0);
  }, [statusTab]);

  const currentMembers = useMemo(
    () => filteredTeam.filter((m) => (m.status ?? "current") === "current"),
    [filteredTeam]
  );

  const pastMembers = useMemo(
    () => filteredTeam.filter((m) => m.status === "past"),
    [filteredTeam]
  );

  const statusFilteredTeam = statusTab === "current" ? currentMembers : pastMembers;

  const totalPages = Math.max(1, Math.ceil(statusFilteredTeam.length / CARDS_PER_PAGE));
  const currentPage = Math.min(page, totalPages - 1);

  const visibleMembers = useMemo(() => {
    const start = currentPage * CARDS_PER_PAGE;
    return statusFilteredTeam.slice(start, start + CARDS_PER_PAGE);
  }, [statusFilteredTeam, currentPage]);

  const canGoUp = currentPage > 0;
  const canGoDown = currentPage < totalPages - 1;

  return (
    <div className="w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        @import url('https://fonts.cdnfonts.com/css/satoshi');
      `}</style>

      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">

        {/* LEFT COLUMN — Sticky header */}
        <div className="w-full lg:w-[35%] lg:sticky lg:top-32 flex flex-col justify-center pt-4">

          {/* MEET THE TEAM header */}
          <div className="relative min-h-[140px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[260px] flex items-center justify-center md:justify-start w-full mb-6">
            <div className="relative inline-block mx-auto md:mx-0">
              <h2 className="font-['Anton'] uppercase text-black leading-none tracking-[-0.02em] select-none pointer-events-none text-[6.5rem] sm:text-[7rem] md:text-[6rem] lg:text-[10rem] xl:text-[12rem] relative z-0">
                MEET
              </h2>
              <div className="absolute z-10 bottom-[5%] right-[-5%] sm:right-[-6%] md:right-[-10%] lg:right-[-12%] rotate-[-8deg] bg-[#d955a4] px-3 sm:px-4 md:px-5 py-1 shadow-lg whitespace-nowrap">
                <span className="font-['Anton'] uppercase text-black leading-none text-base sm:text-lg md:text-xl lg:text-2xl">
                  THE TEAM
                </span>
              </div>
            </div>
          </div>

          <p className="font-sans text-base md:text-lg text-zinc-400 mt-2 md:mt-3 max-w-xs md:max-w-sm text-center md:text-left mx-auto md:mx-0 leading-relaxed">
            Meet the core crew building Girls Leading Tech — mentors, organizers, contributors and volunteers united by purpose.
          </p>

          {/* Hover hint for desktop */}
          <p className="hidden md:block mt-4 text-xs text-zinc-300 text-center md:text-left">
            ✦ Hover a card to see their story
          </p>
        </div>

        {/* RIGHT COLUMN — Tabs + Grid + Pagination */}
        <div className="w-full lg:w-[65%] flex flex-col gap-6">

          {/* Tab switcher with counts */}
          <div className="self-center md:self-start">
            <StatusTabs
              active={statusTab}
              onChange={setStatusTab}
              currentCount={currentMembers.length}
              pastCount={pastMembers.length}
            />
          </div>

          {/* Alumni appreciation banner */}
          {statusTab === "past" && pastMembers.length > 0 && (
            <AlumniBanner />
          )}

          <div className="flex items-start gap-4">

            {/* Cards grid */}
            <div className="flex-1 min-h-0">
              {statusFilteredTeam.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center gap-3">
                  <p className="text-sm text-muted-foreground">
                    {statusTab === "past"
                      ? "No alumni to show yet."
                      : "No matches. Try a different search."}
                  </p>
                </div>
              ) : (
                <motion.div
                  key={`${statusTab}-${currentPage}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5"
                >
                  {visibleMembers.map((member, index) => (
                    <MemberProfileCard
                      key={member.id}
                      name={member.name}
                      role={member.role}
                      location={
                        member.city && member.state
                          ? `${member.city}, ${member.state}`
                          : member.city || member.state
                      }
                      locationType="location"
                      delay={index}
                      linkedin={member.linkedin}
                      twitter={member.twitter}
                      image={member.image}
                      description={member.description}
                      isPast={member.status === "past"}
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Vertical pagination arrows */}
            {statusFilteredTeam.length > CARDS_PER_PAGE && (
              <div className="flex flex-col items-center gap-3 pt-16 sticky top-1/3">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={!canGoUp}
                  className={`
                    h-10 w-10 flex items-center justify-center rounded-full border-2 transition-all duration-200
                    ${canGoUp
                      ? "border-[#d955a4] text-[#d955a4] hover:bg-[#d955a4] hover:text-white cursor-pointer shadow-sm"
                      : "border-gray-200 text-gray-300 cursor-not-allowed"
                    }
                  `}
                  aria-label="Previous page"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>

                {/* Page dots */}
                <div className="flex flex-col items-center gap-1.5 py-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={`
                        h-2 w-2 rounded-full transition-all duration-300 cursor-pointer
                        ${i === currentPage
                          ? "bg-[#d955a4] scale-125"
                          : "bg-gray-300 hover:bg-[#d955a4]/50"
                        }
                      `}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={!canGoDown}
                  className={`
                    h-10 w-10 flex items-center justify-center rounded-full border-2 transition-all duration-200
                    ${canGoDown
                      ? "border-[#d955a4] text-[#d955a4] hover:bg-[#d955a4] hover:text-white cursor-pointer shadow-sm"
                      : "border-gray-200 text-gray-300 cursor-not-allowed"
                    }
                  `}
                  aria-label="Next page"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}