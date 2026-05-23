import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { GlassCard } from "@/components/site/GlassCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Marquee } from "@/components/site/Marquee";
import { SpeakerCard } from "@/components/site/SpeakerCard";
import { ArrowRight, Heart, Users, Sparkle, Star, Flower2, Linkedin } from "lucide-react";
import { stats } from "@/data/stats";
import { initiatives } from "@/data/initiatives";
import { speakers, testimonials } from "@/data/community";
import { communityPartners, industryPartners, ecosystemPartners } from "@/data/partners";
import { useState } from "react";
import { colleges } from "@/data/colleges";
import testimonialCard from "@/assets/testimonial-card.png"


import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.webp";
import gallery4 from "@/assets/gallery-4.webp";
import gallery5 from "@/assets/gallery-5.webp";
import gallery6 from "@/assets/gallery-6.webp";
import gallery7 from "@/assets/gallery-7.webp";
import gallery8 from "@/assets/gallery-8.webp";
import gallery9 from "@/assets/gallery-9.webp";
import Hero from "@/components/home/hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Girls Leading Tech — Empowering Women in Tech" },
      { name: "description", content: "Join 4000+ women across 1000+ colleges in India building, learning and leading in tech together." },
    ],
  }),
  component: HomePage,
});

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9];

const initiativeStyles: Record<string, { grad: string; ring: string; chip: string; emoji: string }> = {
  pink:     { grad: "from-rose-400 via-pink-500 to-fuchsia-500",   ring: "ring-rose-300/50",     chip: "bg-rose-100 text-rose-700",         emoji: "🌸" },
  lavender: { grad: "from-violet-400 via-fuchsia-500 to-pink-500", ring: "ring-violet-300/50",   chip: "bg-violet-100 text-violet-700",     emoji: "✨" },
  peach:    { grad: "from-amber-300 via-orange-400 to-rose-500",   ring: "ring-orange-300/50",   chip: "bg-orange-100 text-orange-700",     emoji: "🧡" },
  rose:     { grad: "from-pink-400 via-rose-500 to-red-500",       ring: "ring-pink-300/50",     chip: "bg-pink-100 text-pink-700",         emoji: "💖" },
  violet:   { grad: "from-purple-500 via-fuchsia-500 to-pink-500", ring: "ring-purple-300/50",   chip: "bg-purple-100 text-purple-700",     emoji: "🔮" },
};

<style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');`}</style>

function HeroDecor() {
  return (
    <>
      <div className="pointer-events-none absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.78_0.2_25_/_0.55)] blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -right-32 top-20 h-[30rem] w-[30rem] rounded-full bg-[oklch(0.7_0.22_350_/_0.5)] blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
      <div className="pointer-events-none absolute left-1/3 -bottom-20 h-[24rem] w-[24rem] rounded-full bg-[oklch(0.78_0.18_60_/_0.5)] blur-3xl animate-blob" style={{ animationDelay: "6s" }} />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-50" />
    </>
  );
}

// auto photo carousel + user constrolled
function AutoCarousel({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const el = ref.current;
  if (!el) return;

  let speed = 1.4; // faster scroll
  let animationId: number;
  let paused = false;

  const loop = () => {
    if (!el) return;

    if (!paused) {
      el.scrollLeft += speed;

      // infinite loop
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
    }

    animationId = requestAnimationFrame(loop);
  };

  animationId = requestAnimationFrame(loop);

  // pause/resume helpers
  const pause = () => (paused = true);
  const resume = () => (paused = false);

  // hover + touch pause
  el.addEventListener("mouseenter", pause);
  el.addEventListener("mouseleave", resume);
  el.addEventListener("touchstart", pause);
  el.addEventListener("touchend", resume);

  // resume when user scrolls back into view
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        paused = false; // restart when visible again
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(el);

  return () => {
    cancelAnimationFrame(animationId);
    observer.disconnect();

    el.removeEventListener("mouseenter", pause);
    el.removeEventListener("mouseleave", resume);
    el.removeEventListener("touchstart", pause);
    el.removeEventListener("touchend", resume);
  };
}, []);

  // drag support
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  return (
    <div
      ref={ref}
      className="flex gap-6 px-8 overflow-x-auto scroll-smooth
    cursor-grab active:cursor-grabbing
    select-none
    [&::-webkit-scrollbar]:hidden
    [scrollbar-width:none]"
      onMouseDown={(e) => {
        isDown.current = true;
        startX.current = e.pageX;
        scrollLeft.current = ref.current!.scrollLeft;
      }}
      onMouseLeave={() => (isDown.current = false)}
      onMouseUp={() => (isDown.current = false)}
      onMouseMove={(e) => {
        if (!isDown.current) return;
        e.preventDefault();

        const walk = (e.pageX - startX.current) * 1.2;
        ref.current!.scrollLeft = scrollLeft.current - walk;
      }}
      onTouchStart={(e) => {
        startX.current = e.touches[0].pageX;
        scrollLeft.current = ref.current!.scrollLeft;
      }}
      onTouchMove={(e) => {
        const walk = (e.touches[0].pageX - startX.current) * 1.2;
        ref.current!.scrollLeft = scrollLeft.current - walk;
      }}
    >
      {[...images, ...images].map((src, i) => (
        <div
          key={i}
          className="h-56 w-80 shrink-0 overflow-hidden rounded-3xl md:h-72 md:w-96"
        >
          <img
            src={src}
            className="h-full w-full object-cover pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
}

function TestimonialPixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const grid = 28;
      for (let x = 0; x < width; x += grid) {
        for (let y = 0; y < height; y += grid) {
          ctx.fillStyle = "rgba(180, 55, 120, 0.18)";
          ctx.fillRect(x, y, 2.5, 2.5);
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />;
}

// testimonials 
function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [key, setKey] = useState(0);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
    setKey((k) => k + 1);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setKey((k) => k + 1);
  };

  const t = testimonials[index];

  return (
    <section className="relative py-10 md:py-14">
      <TestimonialPixelBackground />
      <div className="container mx-auto max-w-5xl px-6">

        {/* HEADING */}
        <div className="text-center mb-4">
          <p
            className="uppercase tracking-[0.35em] font-black font-bold"
            style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)" }}
          >
            Stories
          </p>
        </div>

        {/* CARD */}
        <div className="flex justify-center overflow-hidden">
          <motion.div
            key={key}
            initial={{
              opacity: 0,
              rotate: direction === 1 ? 18 : -18,
              x: direction === 1 ? 320 : -320,
              y: -60,
              scale: 0.85,
            }}
            animate={{ opacity: 1, rotate: 0, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "clamp(280px, 48vw, 480px)",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(217,85,164,0.13), 0 2px 8px rgba(0,0,0,0.07)",
              border: "1.5px solid #000000",
            }}
          >
            {/* YELLOW BAR */}
            <div
              style={{
                background: "#ffed95",
                height: "clamp(28px, 5vw, 38px)",
                width: "100%",
                display: "flex",
                alignItems: "center",
                paddingLeft: "clamp(14px, 4%, 22px)",
                gap: 7,
              }}
            >
              {/* three dots for fun */}
              {["#FF8FAB", "#d955a4", "#f0b158"].map((c, i) => (
                <span
                  key={i}
                  style={{
                    width: 10, height: 10,
                    borderRadius: "50%",
                    background: c,
                    display: "inline-block",
                  }}
                />
              ))}
            </div>

            {/* PINK BODY */}
            <div
              style={{
                background: "#ffc8e3",
                padding: "clamp(1.2rem, 6%, 2rem) clamp(1.2rem, 6%, 2rem)",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(0.8rem, 3%, 1.2rem)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontWeight: 600,
                  fontSize: "clamp(0.82rem, 2vw, 1.05rem)",
                  lineHeight: 1.55,
                  color: "#1a1a1a",
                  margin: 0,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* divider */}
              <div style={{ width: 36, height: 2, background: "#d955a4", borderRadius: 2 }} />

              <div>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(0.75rem, 1.6vw, 0.92rem)",
                    color: "#1a1a1a",
                    margin: 0,
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "clamp(0.65rem, 1.3vw, 0.78rem)",
                    color: "rgb(0, 0, 0)",
                    margin: "3px 0 0",
                    fontWeight: 400,
                  }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ARROWS */}
        <div className="mt-6 flex justify-center gap-5">
          {[{ fn: prev, label: "←" }, { fn: next, label: "→" }].map(({ fn, label }) => (
            <button
              key={label}
              onClick={fn}
              style={{
                height: 44, width: 44,
                background: "#fff",
                border: "1.5px solid #e879c0",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "transform 0.15s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
            >
              {label}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
// -------- HOME PAGE --------
function HomePage() {
  return (
    <>
      <Hero />

      {/* PICTURES SECTION */}
      <section className="relative overflow-hidden pt-8 pb-24 bg-[#fdf9f5]">

        {/* CENTER CREAM / YELLOW GLOW */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,236,179,0.38) 0%, rgba(255,248,220,0.18) 35%, transparent 70%)",
          }}
        />

        {/* LEFT PINK EDGE */}
        <div
          className="
            pointer-events-none
            absolute left-0 top-0
            h-full w-[22vw]
            z-0
          "
          style={{
            background:
              "linear-gradient(to right, rgba(255,120,180,0.22), rgba(255,180,220,0.10), transparent)",
          }}
        />

        {/* RIGHT PINK EDGE */}
        <div
          className="
            pointer-events-none
            absolute right-0 top-0
            h-full w-[22vw]
            z-0
          "
          style={{
            background:
              "linear-gradient(to left, rgba(245,130,255,0.20), rgba(255,190,230,0.08), transparent)",
          }}
        />

        
        {/* HEADING */}
        <div className="relative z-10 mb-12 flex flex-col items-center text-center pt-0">

          <p className="text-xs md:text-lg uppercase tracking-[0.3em] text-[#d955a4] font-bold"
          style={{ fontFamily: "'Montserrat', 'sans serif'"}}
          >
            COMMUNITY MOMENTS
          </p>

        </div>

        {/* MARQUEE */}
        <div className="relative z-10">
          <AutoCarousel images={galleryImages} />
        </div>

      </section>

    
      {/* ABOUT / VISION / MISSION */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="About us"
            title="Built for women in tech."
            description="Girls Leading Tech is a movement for every girl who's ever wondered if she belongs in this room. Spoiler: she leads it."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <GlassCard glow className="p-8 md:p-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-soft">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-2xl">Our Vision</h3>
              <p className="mt-3 text-muted-foreground">
                A world where every girl who dreams in code, design or data has a
                community, a mentor and a runway to lead. No gatekeeping. Just
                glow-ups.
              </p>
            </GlassCard>
            <GlassCard glow className="p-8 md:p-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-sunset shadow-soft">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-2xl">Our Mission</h3>
              <p className="mt-3 text-muted-foreground">
                To equip 100,000 women in tech across India with the resources,
                mentorship and confidence to ship the products and lead the teams
                of tomorrow.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* INITIATIVES — bolder, animated, creative cards */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Initiatives"
            title="Programs powering the movement."
            description="From flagship summits to year-round fellowships, every initiative is designed to push you forward."
          />
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {initiatives.slice(0, 6).map((i, idx) => {
              const s = initiativeStyles[i.color] ?? initiativeStyles.pink;
              return (
                <Link
                  key={i.slug}
                  to="/initiatives/$slug"
                  params={{ slug: i.slug }}
                  className="group relative block animate-fade-up"
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  {/* gradient halo */}
                  <div className={`pointer-events-none absolute -inset-[2px] rounded-[2rem] bg-gradient-to-br ${s.grad} opacity-60 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg`} />

                  <div className={`relative h-full overflow-hidden rounded-[1.85rem] bg-white/85 p-7 backdrop-blur-xl ring-1 ${s.ring} shadow-soft transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-soft`}>
                    {/* decorative blob */}
                    <div className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${s.grad} opacity-30 blur-2xl transition-transform duration-700 group-hover:scale-125`} />
                    {/* big rotating emoji */}
                    <div className="pointer-events-none absolute -right-2 -top-2 select-none text-7xl opacity-20 transition-all duration-700 group-hover:rotate-12 group-hover:opacity-40">
                      {s.emoji}
                    </div>

                    <div className="relative">
                      <span className={`inline-block rounded-full ${s.chip} px-3 py-1 text-[10px] font-bold uppercase tracking-widest`}>
                        Program {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-5 font-serif text-3xl leading-tight">{i.name}</h3>
                      <p className={`mt-2 text-sm font-semibold bg-gradient-to-r ${s.grad} bg-clip-text text-transparent`}>
                        {i.tagline}
                      </p>
                      <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                        {i.description}
                      </p>

                      <div className="mt-6 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                          Explore
                          <span className={`inline-block rounded-full bg-gradient-to-br ${s.grad} p-1.5 text-white shadow-soft transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-[-12deg]`}>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">GLT</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link to="/initiatives" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              See all initiatives <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SPEAKERS — featured static grid */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Speakers"
            title="Voices who've graced our stages."
            description="A glimpse of the engineers, founders and leaders who've shared their stories with us."
          />
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {speakers
              .filter((s) => ["s99","s100","s102","s19","s20","s18","s17","s45","s50","s46","s96","s97"].includes(s.id))
              .map((s, idx) => (
                <SpeakerCard
                  key={s.id}
                  name={s.name}
                  designation={s.designation}
                  company={s.company}
                  image={s.image}
                  linkedin={s.linkedin}
                  delay={idx}
                />
              ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/humans"
              className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:scale-105"
            >
              See more speakers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsCarousel />

      {/* COLLEGES REACHED */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Reach"
            title="1000+ campuses, one community."
            description="A glimpse at the colleges where GLT members lead clubs, hackathons and chapters across India."
          />
          <div className="mt-14 flex flex-wrap justify-center gap-2">
            {colleges.slice(0, 36).map((c, i) => (
              <span
                key={c}
                className="rounded-full glass px-4 py-2 text-xs font-medium text-foreground/80 shadow-soft animate-fade-up"
                style={{ animationDelay: `${(i % 18) * 0.04}s` }}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/impact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              See all colleges <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* PARTNERS — smooth marquee */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Partners"
            title="The companies cheering us on."
            description="Ecosystem, industry and community partners amplifying the movement."
          />
        </div>
        <div className="mt-14 space-y-6">
          {[
            { label: "Ecosystem", list: ecosystemPartners },
            { label: "Industry", list: industryPartners },
            { label: "Community", list: communityPartners },
          ].map((group, gi) => (
            <Marquee key={group.label} reverse={gi % 2 === 1}>
              {group.list.map((p) => {
                const inner = (
                  <div className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl glass p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-soft">
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} loading="lazy" className="max-h-14 max-w-[80%] object-contain" />
                    ) : (
                      <span className="text-center text-xs font-display text-foreground/70">{p.name}</span>
                    )}
                  </div>
                );
                return p.website ? (
                  <a key={p.id} href={p.website} target="_blank" rel="noopener noreferrer" title={p.name}>
                    {inner}
                  </a>
                ) : (
                  <div key={p.id} title={p.name}>{inner}</div>
                );
              })}
            </Marquee>
          ))}
        </div>
        <div className="container mx-auto mt-10 max-w-6xl px-6 text-center">
          <Link to="/partners" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See all partners <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] gradient-sunset p-12 text-center shadow-soft md:p-16">
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-2xl animate-blob" />
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/20 blur-2xl animate-blob" style={{ animationDelay: "3s" }} />
            <h2 className="relative font-serif text-4xl text-white md:text-6xl">
              Your seat at the table is waiting.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/90">
              Become part of a community that builds, learns and lifts each other up.
            </p>
            <Link
              to="/join"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-primary shadow-soft transition hover:scale-105"
            >
              Join Girls Leading Tech <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
