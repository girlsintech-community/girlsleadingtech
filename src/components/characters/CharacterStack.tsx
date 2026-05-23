import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";
import BuilderCard from "./BuilderCard";
import OrganizerCard from "./OrganizerCard";
import ConnectorCard from "./ConnectorCard";
import DesignerCard from "./DesignerCard";

interface CharacterCardWrapperProps {
  children: React.ReactNode;
  index: number;
  scrollProgress: MotionValue<number>;
}

function CharacterCardWrapper({ children, index, scrollProgress }: CharacterCardWrapperProps) {
  // We have 4 panels. The scroll progress of the parent container goes from 0 to 1 over a total scroll length of 300vh.
  // Card 0 (Builder) is active and gets covered during progress [0, 0.33]
  // Card 1 (Organizer) is active and gets covered during progress [0.33, 0.66]
  // Card 2 (Connector) is active and gets covered during progress [0.66, 1.0]
  // Card 3 (Designer) is the final card and never gets covered, so it stays at full scale and opacity.
  
  let scale: MotionValue<number> | number = 1;
  let opacity: MotionValue<number> | number = 1;
  let y: MotionValue<number> | number = 0;

  if (index === 0) {
    scale = useTransform(scrollProgress, [0, 0.33], [1, 0.93]);
    opacity = useTransform(scrollProgress, [0, 0.33], [1, 0.5]);
    y = useTransform(scrollProgress, [0, 0.33], [0, -30]);
  } else if (index === 1) {
    scale = useTransform(scrollProgress, [0.33, 0.66], [1, 0.93]);
    opacity = useTransform(scrollProgress, [0.33, 0.66], [1, 0.5]);
    y = useTransform(scrollProgress, [0.33, 0.66], [0, -30]);
  } else if (index === 2) {
    scale = useTransform(scrollProgress, [0.66, 1.0], [1, 0.93]);
    opacity = useTransform(scrollProgress, [0.66, 1.0], [1, 0.5]);
    y = useTransform(scrollProgress, [0.66, 1.0], [0, -30]);
  }

  return (
    <div 
      className="sticky top-0 h-screen w-full overflow-hidden"
      style={{
        zIndex: (index + 1) * 10
      }}
    >
      <motion.div 
        style={{ scale, opacity, y }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function CharacterStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the entire cards container relative to the viewport.
  // offset: ["start start", "end end"] means progress 0 is when the top of the container hits the top of the viewport,
  // and progress 1 is when the bottom of the container hits the bottom of the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
  <>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');`}</style>
    <div className="relative w-full">
      {/* Introduction Title spacer in continuous scroll */}
      <div className="w-full bg-[#d955a4] flex items-center justify-center py-2 mt-0">
        <div className="text-sm md:text-lg font-bold uppercase tracking-[0.25em] text-white">
          Meet Our Ecosystem Roles
        </div>
      </div>

      {/* Cards stack container: height 400vh to accommodate 4 pages at 100vh each */}
      <div ref={containerRef} className="relative w-full h-[400vh] flex flex-col">
        <CharacterCardWrapper index={0} scrollProgress={scrollYProgress}>
          <BuilderCard />
        </CharacterCardWrapper>

        <CharacterCardWrapper index={1} scrollProgress={scrollYProgress}>
          <OrganizerCard />
        </CharacterCardWrapper>

        <CharacterCardWrapper index={2} scrollProgress={scrollYProgress}>
          <ConnectorCard />
        </CharacterCardWrapper>

        <CharacterCardWrapper index={3} scrollProgress={scrollYProgress}>
          <DesignerCard />
        </CharacterCardWrapper>
      </div>

     
    </div>
    </>
  );
}
