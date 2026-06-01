import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import designerMascot from "@/assets/characters/designer/idle.png";
import designBtn from "@/assets/characters/designer/design-button.png";

export default function DesignerCard() {
  const accentColor = "#8b5cf6"; // Violet
  
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden select-none"
    style={{
      background: `
  linear-gradient(
    to bottom,
    #faf9f6 0%,
    #faf9f6 30%,
    #ddf5f7 55%,
    #beecf0 100%
  )
`
    }}
    >
      {/* Dotted texture background inside card */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(circle, #8b5cf6 1.2px, transparent 1.2px)`,
          backgroundSize: "20px 20px"
        }}
      />

      {/* Backdrop glowing sphere behind mascot */}
      <div 
        className="absolute right-[15%] top-[25%] w-[450px] h-[450px] rounded-full blur-3xl opacity-[0.22] pointer-events-none -z-10 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          animationDuration: "8s"
        }}
      />

      {/* Centered content wrapper */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between z-10 h-full gap-8 md:gap-0">
        
        {/* Left Side: Content Column */}
<div className="flex flex-col flex-1 justify-center pr-0 md:pr-12 z-10">

  {/* HERO TITLE (centered, slightly higher) */}
  <div className="w-full flex justify-center -mt-10 md:-mt-18 ml-60">
    <h2 className="font-sans font-black text-5xl md:text-7xl text-[#20182f] tracking-tight text-center">
      THE DESIGNER
    </h2>
  </div>

  {/* CONTENT BLOCK (left aligned) */}
  <div className="mt-20 flex flex-col items-start text-left max-w-md ml-50">

    <div className="max-w-sm">
  
  <p className="font-sans font-bold text-lg md:text-xl text-[#20182f] leading-snug">
    Designs experiences. Tells stories.
  </p>
<br> 
</br>
  <p className="font-sans font-bold text-lg md:text-xl text-[#20182f] leading-snug">
    She gives life to ideas through visuals, content and creative expression.
  </p>

</div>

    {/* BUTTON */}
    <div className="mt-10">
      <Link
        to="/resources/roadmaps"
        className="relative inline-block active:scale-95 transition-transform duration-100"
      >
        <img
          src={designBtn}
          alt="Explore Button"
          className="w-[200px] h-auto"
        />

        <span
          className="absolute inset-0 flex items-center justify-center text-black font-bold"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
            letterSpacing: "0.08em",
          }}
        >
          Design →
        </span>
      </Link>
    </div>

  </div>
</div>

        {/* Right Side: Image and Floating UI Column */}
        <div className="relative flex flex-1 items-center justify-center h-56 md:h-full w-full max-w-sm md:max-w-none">
          
          

          {/* Mascot Character Image */}
          <motion.img
            src={designerMascot}
            alt="The Designer"
            className="relative z-10 h-56 sm:h-64 md:h-80 lg:h-[22rem] object-contain 
             -translate-x-20 md:-translate-x-24 translate-y-3 md:translate-y-6
             filter drop-shadow-[0_12px_28px_rgba(59,130,246,0.22)]"
            
          />
        </div>

      </div>
    </div>
  );
}
