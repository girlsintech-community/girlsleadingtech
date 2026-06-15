// initiatives/index.tsx — redesigned: no stickers, no CTA, equal cards, rich animations
import { createFileRoute, Link } from "@tanstack/react-router";
import { initiatives } from "@/data/initiatives";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export const Route = createFileRoute("/initiatives")({
  head: () => ({
    meta: [
      { title: "Initiatives — Girls Leading Tech" },
      { name: "description", content: "Programs and initiatives by Girls Leading Tech." },
    ],
  }),
  component: InitiativesPage,
});

// ── Grid background ───────────────────────────────────────────────────────────

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute left-1/2 top-1/2 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,240,190,0.15), transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217, 85, 164, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217, 85, 164, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

// ── Card config — no sticker field ───────────────────────────────────────────

const SCRAPBOOK_SLUGS = [
  "empowerher",
  "global-ai-buildathon",
  "hack-aura",
  "code-at-christmas",
];

const cardStyles: Record<string, { bar: string; tagline: string; cta: string; accent: string }> = {
  empowerher: {
    bar: "bg-[#7EB5A6]",
    tagline: "text-[#2F5D50]",
    cta: "bg-[#7EB5A6] hover:bg-[#6BA393] text-white",
    accent: "rgba(126,181,166,0.15)",
  },
  "global-ai-buildathon": {
    bar: "bg-[#A9B7FF]",
    tagline: "text-[#4B57A8]",
    cta: "bg-[#A9B7FF] hover:bg-[#95A5F5] text-white",
    accent: "rgba(169,183,255,0.15)",
  },
  "hack-aura": {
    bar: "bg-[#FF8A5B]",
    tagline: "text-[#A64B28]",
    cta: "bg-[#FF8A5B] hover:bg-[#F67848] text-white",
    accent: "rgba(255,138,91,0.15)",
  },
  "code-at-christmas": {
    bar: "bg-[#D8B4E8]",
    tagline: "text-[#7B4F92]",
    cta: "bg-[#D8B4E8] hover:bg-[#C89DDB] text-white",
    accent: "rgba(216,180,232,0.15)",
  },
};

const fallbackStyle = {
  bar: "bg-[#d955a4]",
  tagline: "text-[#5b2b4a]",
  cta: "bg-[#d955a4] hover:bg-[#c0448f] text-white",
  accent: "rgba(217,85,164,0.15)",
};

// ── Desktop card — fixed equal height, no sticker ─────────────────────────────

function InitiativeCard({
  initiative,
  index,
}: {
  initiative: (typeof initiatives)[number];
  index: number;
}) {
  const s = cardStyles[initiative.slug] ?? fallbackStyle;
  const directions = [
    { x: -80, y: 0 },
    { x: 80, y: 0 },
    { x: -80, y: 0 },
    { x: 80, y: 0 },
  ];
  const dir = directions[index] ?? { x: 0, y: 40 };

  return (
    <motion.div
      initial={{ x: dir.x, y: dir.y, opacity: 0 }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 55, damping: 14, delay: index * 0.08 }}
      className="h-full"
    >
      <Link to="/initiatives/$slug" params={{ slug: initiative.slug }} className="block group h-full">
        <div
          className="w-full h-full bg-white shadow-lg ring-1 ring-black/5 flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_-8px_rgba(217,85,164,0.22)]"
        >
          {/* Accent glow top-right */}
          <div
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none"
            style={{ background: `radial-gradient(circle, ${s.accent}, transparent 70%)` }}
          />

          {/* Colour bar */}
          <div className={`h-[6px] w-full flex-shrink-0 ${s.bar}`} />

          <div className="p-6 flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <h3
                className="text-xl font-black uppercase leading-tight tracking-tight text-gray-900"
                style={{ fontFamily: "'Satoshi', 'Montserrat', sans-serif" }}
              >
                {initiative.name}
              </h3>
              <p
                className={`text-[10px] font-extrabold tracking-[0.05em] uppercase ${s.tagline}`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {initiative.tagline}
              </p>
              <p
                className="mt-2 text-gray-600 leading-relaxed line-clamp-3 text-[11px]"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {initiative.description}
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-5 self-start"
              onClick={
                initiative.url
                  ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(initiative.url, "_blank", "noopener,noreferrer");
                    }
                  : undefined
              }
            >
              <span
                className={`inline-flex items-center gap-1.5 rounded-full ${s.cta} px-4 py-1.5 text-xs font-bold transition-colors duration-200 cursor-pointer`}
              >
                Explore
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Mobile card ───────────────────────────────────────────────────────────────

function InitiativeCardMobile({
  initiative,
  index,
}: {
  initiative: (typeof initiatives)[number];
  index: number;
}) {
  const s = cardStyles[initiative.slug] ?? fallbackStyle;
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 55, damping: 14, delay: index * 0.1 }}
      className="w-full max-w-[360px]"
    >
      <Link to="/initiatives/$slug" params={{ slug: initiative.slug }} className="block group">
        <div className="w-full bg-white shadow-xl ring-1 ring-black/5 flex flex-col">
          <div className={`h-[6px] w-full flex-shrink-0 ${s.bar}`} />
          <div className="p-6 flex flex-col gap-3">
            <h3
              className="text-2xl font-black uppercase leading-tight tracking-tight text-gray-900"
              style={{ fontFamily: "'Satoshi', 'Montserrat', sans-serif" }}
            >
              {initiative.name}
            </h3>
            <p
              className={`text-[11px] font-extrabold tracking-[0.04em] uppercase ${s.tagline}`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {initiative.tagline}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {initiative.description}
            </p>
            <div className={`mt-2 inline-flex items-center gap-1.5 self-start rounded-full ${s.cta} px-4 py-2 text-xs font-bold`}>
              Explore <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Extra initiative card ─────────────────────────────────────────────────────

function ExtraInitiativeCard({
  initiative,
  idx,
}: {
  initiative: (typeof initiatives)[number];
  idx: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <Link to="/initiatives/$slug" params={{ slug: initiative.slug }} className="group block h-full">
        <div
          className="relative bg-white border-2 border-gray-100 p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:border-[#d955a4]/60 hover:shadow-[0_20px_40px_-5px_rgba(217,85,164,0.2)]"
          style={{ borderRadius: 16 }}
        >
          <h3
            className="text-lg font-black uppercase text-gray-900 tracking-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {initiative.name}
          </h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#d955a4]">
            {initiative.tagline}
          </p>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">
            {initiative.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#d955a4]">
            Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Animated page header ──────────────────────────────────────────────────────

function PageHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative z-10 pt-32 md:pt-40 pb-16 px-6">
      <div ref={ref} className="container mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-base md:text-lg uppercase tracking-[0.3em] text-[#d955a4] font-bold mb-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          INITIATIVES
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-sans text-5xl md:text-7xl font-bold text-gray-900 leading-tight tracking-tight"
        >
          Programs powering{" "}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="italic font-medium text-[#5b2b4a]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            the movement.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="mt-6 md:mt-8 text-lg md:text-xl font-sans text-gray-500 leading-relaxed max-w-2xl mx-auto font-light"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Flagship summits, hackathons, fellowships and seasonal celebrations — all under one roof.
        </motion.p>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0.5 }}
          className="mt-8 mx-auto h-[3px] w-40 rounded-full bg-gradient-to-r from-[#d955a4] to-[#e879c0]"
        />
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

function InitiativesPage() {
  const extraCards = initiatives;

  return (
    <div className="relative w-full min-h-screen bg-[#fef9f4] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800;900&family=Playfair+Display:ital,wght@1,500&display=swap');
        @import url('https://fonts.cdnfonts.com/css/satoshi');
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: 200%;
          animation: ticker-scroll 22s linear infinite;
        }
      `}</style>

      <GridBackground />

      {/* HEADER */}
      <PageHeader />

      {/* TICKER */}
      <div className="relative z-10 w-full overflow-hidden bg-[#fef9f4] border-y border-[#f0e4d8] py-4 flex mt-6">
        <div className="ticker-track">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex whitespace-nowrap items-center px-4 w-1/2 justify-around">
              <span className="text-[#d955a4] font-bold text-xs md:text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                LEARN. BUILD. LEAD.
              </span>
              <span className="text-[#e879c0] text-lg mx-6">✦</span>
              <span className="text-[#d955a4] font-bold text-xs md:text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                SUMMITS & HACKATHONS
              </span>
              <span className="text-[#e879c0] text-lg mx-6">✦</span>
              <span className="text-[#d955a4] font-bold text-xs md:text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                FELLOWSHIPS
              </span>
              <span className="text-[#e879c0] text-lg mx-6">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* EXTRA INITIATIVES */}
      {extraCards.length > 0 && (
        <section className="relative z-10 py-20 px-6 bg-[#fcf5ef]">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center max-w-2xl mx-auto"
            >
              <p
                className="text-base uppercase tracking-[0.3em] text-[#d955a4] font-bold mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                ALL PROGRAMS
              </p>
              <h2 className="font-sans text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                Explore every initiative.
              </h2>
              <p className="mt-4 text-base text-gray-500 font-light">
                Every program is built with one goal — getting more women into tech.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3" style={{ gridAutoRows: "1fr" }}>
              {extraCards.map((initiative, idx) => (
                <ExtraInitiativeCard key={initiative.slug} initiative={initiative} idx={idx} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// ── Named export for homepage ─────────────────────────────────────────────────

export function InitiativesScrapbook() {
  const cards = SCRAPBOOK_SLUGS
    .map((slug) => initiatives.find((i) => i.slug === slug))
    .filter(Boolean) as (typeof initiatives);

  return (
    <>
      {/* Desktop: equal 2×2 */}
      <div
        className="hidden md:grid md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto"
        style={{ gridAutoRows: "280px" }}
      >
        {cards.map((initiative, index) => (
          <InitiativeCard key={initiative.slug} initiative={initiative} index={index} />
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col items-center gap-6 w-full py-4">
        {cards.map((initiative, index) => (
          <InitiativeCardMobile key={initiative.slug} initiative={initiative} index={index} />
        ))}
      </div>
    </>
  );
}