import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { colleges } from "@/data/colleges";
import { useHydrated } from "@/hooks/use-hydrated";
import impactImg from "@/assets/impact.png";
import pixelBtn from "@/assets/pixel-button.png";

function DesktopCollegesScrollSection() {
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: desktopScrollY } = useScroll({
    target: desktopContainerRef,
    offset: ["start start", "end end"],
  });

  const desktopProgress = useTransform(desktopScrollY, [0.02, 0.75], [0, 1]);
  const desktopWidth = useTransform(desktopProgress, (v: number) => `calc(100vw - 45vw * ${v})`);
  const desktopHeight = useTransform(desktopProgress, (v: number) => `calc(100vh - (100vh - 31vw) * ${v})`);
  const desktopTop = useTransform(desktopProgress, (v: number) => `calc((100vh - 31vw) / 2 * ${v})`);

  return (
    <div
      ref={desktopContainerRef}
      className="relative w-full h-[230vh] bg-[#fdf9f5] hidden lg:block"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{
            width: desktopWidth,
            height: desktopHeight,
            left: 0,
            top: desktopTop,
            borderRadius: 0,
          }}
          className="absolute overflow-hidden z-20 shrink-0 border-2 border-black rounded-none shadow-lg"
        >
          <img
            src={impactImg}
            alt="Colleges reached map/banner"
            className="w-full h-full object-cover"
            style={{ borderRadius: 0 }}
          />
        </motion.div>

        <DesktopCollegesContent />
      </div>
    </div>
  );
}

function DesktopCollegesStaticSection() {
  return (
    <div className="relative w-full min-h-screen bg-[#fdf9f5] hidden lg:block">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          style={{ width: "55vw", height: "31vw", left: 0, top: "calc((100vh - 31vw) / 2)" }}
          className="absolute overflow-hidden z-20 shrink-0 border-2 border-black rounded-none shadow-lg"
        >
          <img
            src={impactImg}
            alt="Colleges reached map/banner"
            className="w-full h-full object-cover"
            style={{ borderRadius: 0 }}
          />
        </div>
        <DesktopCollegesContent />
      </div>
    </div>
  );
}

function DesktopCollegesContent() {
  return (
    <div
      style={{ width: "45vw" }}
      className="absolute right-0 top-0 h-full flex flex-col justify-center pt-[6vh] pl-20 pr-6 xl:pr-16 bg-[#fdf9f5] z-10 overflow-hidden"
    >
      <div className="max-w-[520px] w-full">
        <p
          className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#d955a4] font-bold"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          REACH
        </p>

        <h2 className="font-sans text-4xl xl:text-5xl font-bold text-foreground leading-tight mt-4">
          1000+ campuses,{" "}
          <span
            className="mx-2 italic font-medium text-[#5b2b4a]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            one
          </span>{" "}
          community.
        </h2>

        <p className="mt-4 font-sans text-muted-foreground text-sm leading-relaxed">
          A glimpse at the colleges where GLT members lead clubs, hackathons and chapters across India.
        </p>

        <div className="mt-8 flex flex-wrap gap-2 justify-start">
          {colleges.slice(0, 15).map((c, idx) => {
            const visibilityClass = idx >= 12 ? "hidden xl:inline-block" : "";
            return (
              <span
                key={c}
                className={`rounded-full glass px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-soft border border-black/5 bg-white/50 backdrop-blur-sm ${visibilityClass}`}
              >
                {c}
              </span>
            );
          })}
        </div>

        <div className="relative z-[100] mt-6 md:mt-10 flex justify-center items-center w-full px-4">
          <Link
            to="/impact"
            className="relative inline-block z-[100] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <img
              src={pixelBtn}
              alt="See All Colleges"
              className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[250px] h-auto object-contain"
            />
            <span
              className="absolute inset-0 flex items-center justify-center text-black text-center font-bold pointer-events-none"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(0.6rem, 1.1vw, 1.15rem)",
                letterSpacing: "0.08em",
                lineHeight: "1.0",
              }}
            >
              See All <br className="sm:hidden" />
              Colleges →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CollegesReachedSection() {
  const hydrated = useHydrated();

  return (
    <>
      {/* MOBILE & TABLET */}
      <div className="block lg:hidden w-full bg-[#fdf9f5]">
        <div className="w-full">
          <img
            src={impactImg}
            alt="Colleges reached map/banner"
            className="w-full h-auto block border-2 border-black object-contain"
            style={{ borderRadius: 0 }}
          />
        </div>

        <div className="w-full flex flex-col items-center justify-start text-center px-6 py-12 sm:px-12 sm:py-16 bg-[#fdf9f5]">
          <p
            className="text-xs md:text-lg uppercase tracking-[0.3em] text-[#d955a4] font-bold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            REACH
          </p>

          <h2 className="font-sans text-4xl md:text-5xl xl:text-6xl font-bold text-foreground leading-tight mt-4">
            1000+ campuses, <br />
            <span
              className="mx-2 italic font-medium text-[#5b2b4a]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              one{" "}
            </span>
            community.
          </h2>
          <p className="mt-4 font-sans text-muted-foreground text-sm leading-relaxed">
            A glimpse at the colleges where GLT members lead clubs, hackathons and chapters across India.
          </p>

          <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-2xl">
            {colleges.slice(0, 10).map((c) => (
              <span
                key={c}
                className="rounded-full glass px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-soft border border-black/5 bg-white/50 backdrop-blur-sm"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-8 flex justify-center items-center w-full">
            <Link
              to="/impact"
              className="relative inline-block transition-transform duration-200 active:scale-95 hover:scale-105"
            >
              <img
                src={pixelBtn}
                alt="See All Colleges"
                className="w-[160px] sm:w-[180px] h-auto object-contain"
              />
              <span
                className="absolute inset-0 flex items-center justify-center text-black font-bold pointer-events-none whitespace-nowrap"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "clamp(0.55rem, 0.9vw, 0.85rem)",
                  letterSpacing: "0.06em",
                }}
              >
                See All Colleges →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* DESKTOP — scroll animation only after client hydration */}
      {hydrated ? <DesktopCollegesScrollSection /> : <DesktopCollegesStaticSection />}
    </>
  );
}
