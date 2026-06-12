import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import pixelStarImg from "@/assets/pixelstar.png";

// Import actual timeline mascots t1 to t5
import t1 from "@/assets/timeline/t1.png";
import t2 from "@/assets/timeline/t2.png";
import t3 from "@/assets/timeline/t3.png";
import t4 from "@/assets/timeline/t4.png";
import t5 from "@/assets/timeline/t5.png";

interface MilestoneCard {
  date: string;
  title: string;
  description: string;
  mascot: string;
}

const milestones: MilestoneCard[] = [
  {
    date: "June 2024",
    title: "The Beginning",
    description: "It began with just 5 girls attending a WTM session, sparking a vision for a community for girls in STEM.",
    mascot: t1,
  },
  {
    date: "Diwali 2024",
    title: "The Community Launch",
    description: "Girls in Tech officially opened its doors to girls across India, and within weeks, over 500 girls had joined the movement.",
    mascot: t2,
  },
  {
    date: "December 2024",
    title: "Momentum Takes Off",
    description: "In just a few months, the community doubled from 500 to 1000 members, proving how many girls were looking for a space to build, lead and learn.",
    mascot: t3,
  },
  {
    date: "April 2025",
    title: "Girls Leading Tech",
    description: "As the vision expanded beyond opportunity sharing, Girls in Tech became Girls Leading Tech. We also began launching our own initiatives, events, and programs for the community.",
    mascot: t4,
  },
  {
    date: "Aug  2025",
    title: "3,000+ Girls & Growing",
    description: "From mentorship cohorts and fellowships to hackathons, learning programs, and community-led initiatives, Girls Leading Tech continues empowering thousands of girls to rise together.",
    mascot: t5,
  },
];

const pinkFilter = "brightness(0) saturate(100%) invert(47%) sepia(51%) saturate(1450%) hue-rotate(285deg) brightness(93%) contrast(93%)";

export default function OurJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate horizontal translation for 6 slides:
  // 6 slides total = 600vw.
  // We translate from 0% to -83.333% (which translates 5 slides out of the viewport)
  // Animation happens when scroll progress is between 0.05 and 0.95
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-83.333%"]);

  // Hook to monitor scroll progress and set active card indicator for controls/dots
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.05) {
      setActiveCard(0);
    } else if (latest > 0.95) {
      setActiveCard(5); // Concluding slide is index 5
    } else {
      const relativeProgress = (latest - 0.05) / (0.95 - 0.05);
      const index = Math.min(5, Math.max(0, Math.round(relativeProgress * 5)));
      setActiveCard(index);
    }
  });

  // Scroll to a specific slide by translating to the corresponding vertical page offset
  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const containerTop = rect.top + scrollTop;
    const stickyHeight = window.innerHeight * 0.82;
    const totalScrollable = rect.height - window.innerHeight;
    
    // Map index [0..5] to the scroll range [0.05, 0.95]
    const progress = 0.05 + (index / 5) * (0.95 - 0.05);
    const targetScroll = containerTop + progress * totalScrollable;
    
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  // Helper to dynamically highlight numbers like 1,000+ or 3,000+
  const highlightNumbers = (text: string) => {
    const parts = text.split(/(\b\d{1,3}(?:,\d{3})*\+?)/g);
    return parts.map((part, i) => {
      if (/^\d{1,3}(?:,\d{3})*\+?$/.test(part)) {
        return (
          <span key={i} className="text-[#d955a4] font-black underline decoration-[#d955a4] decoration-2 underline-offset-4">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#ffed95] z-10 w-full overflow-visible -mt-8 md:-mt-12 lg:-mt-16">
      
      {/* Sticky viewport content - Increased height to provide vertical breathing room */}
      <div className="sticky top-0 h-[80vh] md:h-[82vh] lg:h-[85vh] overflow-hidden flex flex-col justify-between z-10 pt-16 md:pt-20 pb-4 bg-[#ffed95]">
        
        {/* Sticky decorative pixel stars in background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.4] z-0">
          <motion.img
            src={pixelStarImg}
            alt="pixel star 1"
            className="absolute w-8 h-8"
            style={{ left: "12%", top: "18%", filter: pinkFilter }}
            animate={{ rotate: [0, 360], y: [0, -6, 0] }}
            transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.img
            src={pixelStarImg}
            alt="pixel star 2"
            className="absolute w-6 h-6"
            style={{ left: "38%", top: "72%", filter: pinkFilter }}
            animate={{ rotate: [0, -360], y: [0, 8, 0] }}
            transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.img
            src={pixelStarImg}
            alt="pixel star 3"
            className="absolute w-10 h-10"
            style={{ left: "62%", top: "25%", filter: pinkFilter }}
            animate={{ rotate: [0, 360], y: [0, -8, 0] }}
            transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.img
            src={pixelStarImg}
            alt="pixel star 4"
            className="absolute w-8 h-8"
            style={{ left: "84%", top: "68%", filter: pinkFilter }}
            animate={{ rotate: [0, -360], y: [0, 6, 0] }}
            transition={{ rotate: { duration: 14, repeat: Infinity, ease: "linear" }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } }}
          />
        </div>

        {/* Scrollable horizontal track - Common layout with pb-12/16 ensuring a clean gap before controls */}
        <div className="flex-grow flex items-center overflow-hidden pb-12 md:pb-16 z-10">
          <motion.div style={{ x }} className="flex h-full w-[600vw] select-none">
            
            {/* Slides 1-5: The Milestones */}
            {milestones.map((card, idx) => {
              const isLastMascot = idx === 4;
              return (
                <div
                  key={idx}
                  className="w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-6 sm:px-12 md:px-24 text-center relative"
                >
                  {/* Content Container (Mascot and Texts Stacked Vertically & Centered) */}
                  <div className="max-w-2xl w-full flex flex-col items-center justify-center relative">
                    
                    {/* Fixed Mascot Zone - Consistent sizing with absolute contain bounds */}
                    <div className="w-32 h-32 md:w-44 md:h-44 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={card.mascot}
                        alt="Mascot"
                        className={
                          isLastMascot
                            ? "w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 object-contain"
                            : "w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain"
                        }
                      />
                    </div>

                    {/* Spacing: Mascot -> Date */}
                    <div className="h-4 md:h-6" />

                    {/* Date Heading */}
                    <h2 className="text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-none font-sans">
                      {card.date}
                    </h2>
                    
                    {/* Spacing: Date -> Title */}
                    <div className="h-2 md:h-3" />

                    {/* Subheading (Title - Large typography) */}
                    <h3 className="text-[#d955a4] text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight font-sans text-center">
                      {highlightNumbers(card.title)}
                    </h3>
                    
                    {/* Spacing: Title -> Content */}
                    <div className="h-3 md:h-5" />

                    {/* Description (Paragraph - Large typography) */}
                    <p className="text-gray-900 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-xl sm:max-w-2xl md:max-w-3xl font-sans font-bold text-center">
                      {highlightNumbers(card.description)}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Slide 6: Concluding Tag (Our Journey Continues With You) */}
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center px-6 sm:px-12 md:px-24 relative">
              <div className="max-w-2xl w-full flex flex-col items-center text-center justify-center relative">
                
                {/* Paper plane icon */}
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: 15 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[#d955a4] flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#d955a4] filter drop-shadow-[0_4px_12px_rgba(217,85,164,0.25)]"
                    style={{ transform: "rotate(-15deg)" }}
                  >
                    <path d="M22 2L2 12L11 13L22 2Z" fill="currentColor" fillOpacity="0.1" />
                    <path d="M22 2L11 13L15 22L22 2Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M11 13V19L14 16" />
                  </svg>
                </motion.div>

                {/* Spacing: Icon -> Capsule */}
                <div className="h-4 md:h-6" />

                {/* Capsule tag */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="rounded-full bg-[#d955a4]/10 px-6 py-2 md:px-8 md:py-3 border border-[#d955a4]/30 shadow-md"
                >
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-[#d955a4] uppercase tracking-widest leading-none font-sans">
                    Our Journey Continues With You
                  </h3>
                </motion.div>

                {/* Spacing: Capsule -> Content */}
                <div className="h-4 md:h-6" />

                {/* Concluding subtext */}
                <p className="text-gray-900 text-sm sm:text-base md:text-lg font-bold max-w-xl leading-relaxed font-sans">
                  Together, we're building a future where every girl in tech can thrive.
                </p>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Footer Navigation Controls - Structured cleanly in the normal flex flow */}
        <div className="w-full flex flex-col items-center justify-center gap-2 md:gap-3 pb-3 md:pb-4 z-20 select-none">
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => activeCard > 0 && scrollToSlide(activeCard - 1)}
              disabled={activeCard === 0}
              className={`w-11 h-8 md:w-14 md:h-10 border-2 border-black bg-white flex items-center justify-center transition-all cursor-pointer rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                activeCard === 0 ? "opacity-30 cursor-not-allowed shadow-none" : "hover:bg-[#ffeaf5] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)]"
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-black stroke-[2.5]" />
            </button>
            <button
              onClick={() => activeCard < 5 && scrollToSlide(activeCard + 1)}
              disabled={activeCard === 5}
              className={`w-11 h-8 md:w-14 md:h-10 border-2 border-black bg-white flex items-center justify-center transition-all cursor-pointer rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                activeCard === 5 ? "opacity-30 cursor-not-allowed shadow-none" : "hover:bg-[#ffeaf5] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)]"
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-black stroke-[2.5]" />
            </button>
          </div>

          {/* Progress dots indicators */}
          <div className="flex items-center gap-2 md:gap-2.5">
            {Array.from({ length: 6 }).map((_, idx) => {
              const dotColors = ["#FF8FAB", "#d955a4", "#f0b158", "#FF8FAB", "#d955a4", "#f0b158"];
              const color = dotColors[idx];
              const isActive = activeCard === idx;
              return (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full border border-black/30 transition-all duration-350 cursor-pointer ${
                    isActive
                      ? "scale-125 opacity-100 shadow-[1px_1px_0px_rgba(0,0,0,1)] border-black"
                      : "opacity-40 hover:opacity-60 scale-100"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

        </div>

      </div>

      {/* Decorative Wave Divider at the bottom of the timeline scroll track */}
      <div className="absolute bottom-0 left-0 w-full h-[120px] md:h-[160px] z-20 pointer-events-none overflow-visible bg-transparent">
        {/* Layered SVG Waves */}
        <svg 
          viewBox="0 0 1440 160" 
          preserveAspectRatio="none" 
          className="absolute inset-0 w-full h-full"
        >
          {/* Wave 1: Blush Pink */}
          <path d="M 0 90 Q 360 30 720 100 T 1440 80 L 1440 160 L 0 160 Z" fill="#ffc8e3" />
          {/* Wave 2: Soft Yellow Accent */}
          <path d="M 0 110 Q 320 50 720 120 T 1440 95 L 1440 160 L 0 160 Z" fill="#fff4d2" />
          {/* Wave 3: Cream (Seamless bottom blend) */}
          <path d="M 0 130 Q 400 80 800 145 T 1440 120 L 1440 160 L 0 160 Z" fill="#fdf9f5" />
        </svg>

        {/* Handwritten Story Transition Overlay */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-between px-8 sm:px-16 md:px-24 lg:px-36 select-none overflow-visible">
          {/* Left Text */}
          <div className="flex flex-col items-start translate-y-[-20px] md:translate-y-[-30px]">
            <span 
              className="text-[#24101F]/60 text-lg md:text-2xl font-bold italic opacity-75"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Our Story
            </span>
            <div className="w-12 h-[2px] bg-[#24101F]/30 mt-1 rounded-full" />
          </div>

          {/* Loop doodle arrow */}
          <div className="flex-grow flex items-center justify-center translate-y-[-10px] md:translate-y-[-20px] opacity-40">
            <svg 
              viewBox="0 0 100 30" 
              className="w-16 sm:w-24 md:w-32 h-auto text-[#24101F]"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            >
              <path d="M 10 15 C 30 5, 40 25, 60 15 C 70 10, 80 10, 90 15 M 82 8 L 90 15 L 82 22" />
            </svg>
          </div>

          {/* Right Text */}
          <div className="flex flex-col items-end translate-y-[20px] md:translate-y-[10px]">
            <span 
              className="text-[#d955a4] text-2xl md:text-4xl font-extrabold tracking-wide transform rotate-[-2deg] drop-shadow-sm"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Your Story
            </span>
            <span 
              className="text-[#24101F]/70 text-[10px] md:text-xs font-semibold tracking-wider uppercase mt-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Begins Next
            </span>
          </div>
        </div>

        {/* Load Caveat Font */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
        `}</style>
      </div>

    </div>
  );
}
