import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { testimonials } from "@/data/community";
import mascotImpact from "@/assets/main-mascot/showing-impact.png";
import DotBackground from "@/components/shared/DotBackground";
import RetroCard from "../shared/RetroCard";


function TestimonialsMarquee() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // We repeat the testimonials array to support seamless infinite loop.
  // With 6 testimonials, duplicating 4 times (24 cards) ensures no gaps on extremely wide viewports.
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let speed = 1.0; // smooth scrolling speed
    let animationId: number;

    const tick = () => {
      if (!el) return;

      if (!isDown.current && !isInteracting) {
        el.scrollLeft += speed;

        // Reset seamlessly when scrolled halfway through
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationId);
  }, [isInteracting]);

  // Seamless looping check during manual interactions (drag/scroll)
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    if (el.scrollLeft >= halfWidth) {
      el.scrollLeft -= halfWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += halfWidth;
    }
  };

  // Mouse Drag Event Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    setIsInteracting(true);
    startX.current = e.pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeft.current = containerRef.current?.scrollLeft || 0;
  };

  const handleMouseLeaveOrUp = () => {
    isDown.current = false;
    setIsInteracting(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Touch Event Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    isDown.current = true;
    setIsInteracting(true);
    startX.current = e.touches[0].pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeft.current = containerRef.current?.scrollLeft || 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDown.current || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseLeaveOrUp}
      onMouseLeave={handleMouseLeaveOrUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleMouseLeaveOrUp}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsInteracting(true)}
      className="flex gap-8 overflow-x-auto select-none py-10 px-8 cursor-grab active:cursor-grabbing w-full
        [&::-webkit-scrollbar]:hidden
        [scrollbar-width:none]"
      style={{
        maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
      }}
    >
      {marqueeItems.map((card, idx) => (
  <RetroCard key={`${card.id}-${idx}`}>
    <div className="flex-1 flex flex-col justify-start bg-[#ffc8e3] p-6 sm:p-7 gap-5">
      <p
        className="text-gray-900 font-bold"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontWeight: 700,
          fontSize: "clamp(0.74rem, 1.4vw, 0.84rem)",
          lineHeight: 1.8,
          margin: 0,
        }}
      >
        &ldquo;{card.quote}&rdquo;
      </p>

      <div className="flex flex-col gap-3">
        <div className="w-10 h-[2.5px] bg-[#d955a4] rounded" />

        <div>
          <p
            className="text-gray-900 font-bold"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.88rem, 1.7vw, 1.1rem)",
              margin: 0,
            }}
          >
            {card.name}
          </p>

          <p
            className="text-gray-900 font-normal mt-1"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.76rem, 1.4vw, 0.9rem)",
              margin: "4px 0 0",
            }}
          >
            {card.role}
          </p>
        </div>
      </div>
    </div>
  </RetroCard>
))}
    </div>
  );
}

export function TestimonialsGrid() {
  return (
    <section className="relative pt-16 md:pt-20 pb-16 md:pb-24 overflow-hidden w-full bg-[#fdf9f5] flex flex-col justify-center">
      {/* Canvas dotted background */}
      <DotBackground />

      <style>{`
        @keyframes mascot-breathe {
          0%, 100% { transform: translateY(0px) rotate(-0.8deg); }
          40%      { transform: translateY(-9px) rotate(0.8deg); }
          70%      { transform: translateY(-4px) rotate(-0.3deg); }
        }
        .mascot-breathe {
          animation: mascot-breathe 3.6s ease-in-out infinite;
          transform-origin: bottom center;
          will-change: transform;
        }
      `}</style>

    {/* HEADER AREA */}
<div className="relative z-10 flex justify-center px-6 mb-4">
  <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">

    <img
      src={mascotImpact}
      alt="GLT Mascot"
      className="
        w-20
        sm:w-24
        md:w-36
        lg:w-44
        h-auto
        object-contain
        mascot-breathe
        shrink-0
      "
    />
  
    <div className="flex flex-col items-center text-center">
      <p
        className="text-[10px] sm:text-xs md:text-lg uppercase tracking-[0.3em] text-[#d955a4] font-bold"
        style={{
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        OUR STORIES
      </p>

      <h2
        className="
          font-sans
          text-[1.9rem]
          sm:text-[2.5rem]
          md:text-5xl
          font-bold
          text-foreground
          leading-tight
          whitespace-nowrap
        "
      >
        What{" "}
        <span
          className="mx-1 md:mx-2 italic font-medium text-[#5b2b4a]"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          People
        </span>{" "}
        Say.
      </h2>
    </div>

  </div>
</div>
      {/* MARQUEE */}
      <div className="relative z-10 w-full overflow-visible">
        <TestimonialsMarquee />
      </div>
    </section>
  );
}
