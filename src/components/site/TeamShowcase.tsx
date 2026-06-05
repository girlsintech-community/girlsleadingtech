import { useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown, Linkedin, MapPin } from "lucide-react";
import LBorderCard from "@/components/shared/LBorderCard";
import DotBackground from "@/components/shared/DotBackground";
import type { TeamMember } from "@/data/types";

interface TeamShowcaseProps {
  filteredTeam: TeamMember[];
}

export default function TeamShowcase({ filteredTeam }: TeamShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScrollingProgrammatically = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync active index if filteredTeam changes
  useEffect(() => {
    setActiveIndex(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [filteredTeam]);

  // Handle scroll to detect active card in the center (Desktop only)
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isScrollingProgrammatically.current) return;

    const container = e.currentTarget;
    const containerCenter = container.scrollTop + container.clientHeight / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    const children = container.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const childCenter = child.offsetTop + child.clientHeight / 2;
      const distance = Math.abs(containerCenter - childCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    setActiveIndex(closestIndex);
  };

  const selectCard = (index: number) => {
    setActiveIndex(index);
    if (!containerRef.current) return;

    const cardElement = containerRef.current.children[index] as HTMLElement;
    if (cardElement) {
      isScrollingProgrammatically.current = true;
      
      const containerHeight = containerRef.current.clientHeight;
      const cardHeight = cardElement.clientHeight;
      const targetScrollTop = cardElement.offsetTop - (containerHeight / 2) + (cardHeight / 2);

      containerRef.current.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 500);
    }
  };

  const handlePrev = () => {
    if (filteredTeam.length === 0) return;
    const prevIndex = (activeIndex - 1 + filteredTeam.length) % filteredTeam.length;
    selectCard(prevIndex);
  };

  const handleNext = () => {
    if (filteredTeam.length === 0) return;
    const nextIndex = (activeIndex + 1) % filteredTeam.length;
    selectCard(nextIndex);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 py-16 md:py-24 bg-card/40 border-y border-[#d955a4]/10 overflow-hidden mt-8 animate-fade-up">
      {/* DOT BACKGROUND (Full-bleed screen width) */}
      <DotBackground />

      <div className="relative z-10 container mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* LEFT COLUMN: Large Editorial Heading */}
          <div className="md:col-span-5 flex flex-col justify-center text-center items-center md:text-left md:items-start">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
              @media (max-width: 767px) {
                .mobile-card-adjust > div > div {
                  padding: 1rem 0.75rem !important;
                }
                .mobile-card-adjust div.absolute.-top-4.-left-4 {
                  display: none !important;
                }
              }
              @media (min-width: 768px) and (max-width: 1023px) {
                .tablet-card-adjust > div > div {
                  padding: 1.25rem 1rem !important;
                }
              }
            `}</style>

      <div
        className="
          relative
          min-h-[140px]
          sm:min-h-[180px]
          md:min-h-[220px]
          lg:min-h-[260px]
          flex
          items-center
          justify-center
          md:justify-start
          w-full
        "
      >
        {/* Anchored wrapper */}
        <div className="relative inline-block mx-auto md:mx-0">
          {/* BIG WORD */}
          <h2
            className="
              font-['Anton']
              uppercase
              text-black
              leading-none
              tracking-[-0.02em]
              select-none
              pointer-events-none

              text-[6.5rem]
              sm:text-[7rem]
              md:text-[6rem]
              lg:text-[10rem]
              xl:text-[12rem]

              relative
              z-0
            "
          >
            MEET
          </h2>

          {/* PINK LABEL */}
          <div
            className="
              absolute
              z-10

              bottom-[5%]
              right-[-5%]
              sm:right-[-6%]
              md:right-[-10%]
              lg:right-[-12%]

              rotate-[-8deg]

              bg-[#d955a4]

              px-3
              sm:px-4
              md:px-5

              py-1

              shadow-lg
              whitespace-nowrap
            "
          >
            <span
              className="
                font-['Anton']
                uppercase
                text-black
                leading-none

                text-base
                sm:text-lg
                md:text-xl
                lg:text-2xl
              "
            >
              THE TEAM
            </span>
          </div>
        </div>
      </div>

      <p className="font-sans text-base md:text-lg text-zinc-400 mt-2 md:mt-3 max-w-xs md:max-w-sm text-center md:text-left mx-auto md:mx-0 leading-relaxed">
        The builders, designers, and community leaders powering Girls Leading Tech every day.
      </p>
        
          </div>

          {/* RIGHT COLUMN: User-Controlled List of Cards */}
          <div className="md:col-span-7 w-full">
            {filteredTeam.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-12">
                No matches. Try a different search.
              </p>
            ) : (
              <div className="flex flex-row items-center gap-6 md:gap-8 w-full">
                {/* Carousel Container */}
                <div
                  ref={containerRef}
                  onScroll={handleScroll}
                  className="
                    flex-grow flex flex-col gap-6
                    md:h-[550px] md:overflow-hidden md:py-6 md:px-4
                    /* Hide Scrollbars */
                    [&::-webkit-scrollbar]:hidden
                    [scrollbar-width:none]
                    scroll-smooth
                  "
                >
                  {filteredTeam.map((m, index) => {
                    const isActive = activeIndex === index;
                    const initials = m.name
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();
                    
                    const locationText = m.city && m.state
                      ? `${m.city}, ${m.state}`
                      : m.city || m.state || "";

                    return (
                      <div
                        key={m.id}
                        onClick={() => selectCard(index)}
                        className={`
                          mobile-card-adjust
                          tablet-card-adjust
                          transition-all duration-500 transform cursor-pointer w-full flex-shrink-0
                          max-w-[calc(100vw-2.5rem)] xs:max-w-sm sm:max-w-md mx-auto md:max-w-none md:mx-0
                          md:opacity-100 md:scale-95
                          ${isActive ? "md:opacity-100 md:scale-100 md:translate-x-3" : ""}
                          hover:opacity-100 hover:scale-100
                        `}
                      >
                        <LBorderCard>
                          {/* Dark card background overlay to make it almost black without modifying LBorderCard */}
                          <div className="absolute top-0 left-0 right-[6px] bottom-[6px] bg-[#0c0c0e] -z-10" />

                          {/* Card Content - styled in white/zinc to pop on dark background */}
                          <div className="relative z-10 flex flex-row items-center gap-3 xs:gap-4 md:gap-3 lg:gap-8">
                            
                            {/* Left Side: Avatar Image */}
                            <div className="w-14 h-14 xs:w-16 xs:h-16 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0 shadow-inner relative z-10">
                              {m.image ? (
                                <img
                                  src={m.image}
                                  alt={m.name}
                                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#d955a4]/20 to-[#5b2b4a]/20 text-[#d955a4] font-bold text-base xs:text-lg md:text-lg lg:text-xl">
                                  {initials}
                                </div>
                              )}
                            </div>

                            {/* Right Side: Text & LinkedIn */}
                            <div className="flex-grow flex flex-col justify-center min-w-0">
                              <div className="flex items-start justify-between gap-4 w-full">
                                <div className="min-w-0">
                                  <h3 className="font-sans text-base xs:text-lg md:text-[1.15rem] lg:text-2xl font-bold text-white leading-tight truncate">
                                    {m.name}
                                  </h3>
                                  <p className="text-[10px] xs:text-xs md:text-[0.75rem] lg:text-sm font-semibold uppercase tracking-wider text-[#d955a4] mt-1 truncate">
                                    {m.role}
                                  </p>
                                </div>
                                
                                {m.linkedin && (
                                  <a
                                    href={m.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()} // Prevent card selection when clicking link
                                    className="inline-flex h-7.5 w-7.5 xs:h-8 xs:w-8 md:h-7.5 md:w-7.5 lg:h-9 lg:w-9 items-center justify-center rounded-full bg-[#0A66C2]/20 text-[#0A66C2] transition-colors hover:bg-[#0A66C2] hover:text-white shrink-0"
                                    aria-label={`${m.name} on LinkedIn`}
                                  >
                                    <Linkedin className="h-3.5 w-3.5 md:h-3.5 md:w-3.5 lg:h-4.5 lg:w-4.5" />
                                  </a>
                                )}
                              </div>

                              {locationText && (
                                <div className="mt-3 flex items-center gap-1.5 text-[10px] xs:text-xs md:text-[0.75rem] lg:text-sm text-zinc-400 truncate">
                                  <MapPin className="h-3 w-3 xs:h-3.5 xs:w-3.5 md:h-3 md:w-3 lg:h-3.5 lg:w-3.5 shrink-0 text-zinc-500" />
                                  <span className="truncate">{locationText}</span>
                                </div>
                              )}
                            </div>

                          </div>
                        </LBorderCard>
                      </div>
                    );
                  })}
                </div>

                {/* Arrow Controls (Desktop & Tablet only) */}
                <div className="hidden md:flex flex-col gap-4 items-center shrink-0">
                  <button
                    onClick={handlePrev}
                    className="
                      flex items-center justify-center w-12 h-12 rounded-lg border
                      border-[#d955a4] text-[#d955a4] hover:bg-[#d955a4]/10 active:scale-95 cursor-pointer
                      transition-all duration-300
                    "
                    aria-label="Previous Team Member"
                  >
                    <ChevronUp className="h-6 w-6" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="
                      flex items-center justify-center w-12 h-12 rounded-lg border
                      border-[#d955a4] text-[#d955a4] hover:bg-[#d955a4]/10 active:scale-95 cursor-pointer
                      transition-all duration-300
                    "
                    aria-label="Next Team Member"
                  >
                    <ChevronDown className="h-6 w-6" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
