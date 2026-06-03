import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight, GraduationCap, Trophy, BookOpen, Newspaper,
  Video, Users, UserPlus, Map, BriefcaseBusiness, Library,
  Award, Wrench, Rocket, Star,
} from "lucide-react";
import designerIdle from "@/assets/characters/designer/idle.png";
import communityIdle from "@/assets/characters/community-girl/idle.png";
import pixelBtn from "@/assets/pixel-button.png";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources — Girls Leading Tech" },
      {
        name: "description",
        content: "Curated scholarships, hackathons, courses, articles, books and more for women in tech.",
      },
    ],
  }),
  component: ResourcesHub,
});

const categories = [
  { to: "/resources/scholarships",   label: "Scholarships",    desc: "Funding programs for women in tech.", Icon: GraduationCap,     accent: "#d955a4", tape: "rgba(255,215,55,0.80)",   emoji: "🎓" },
  { to: "/resources/hackathons",     label: "Hackathons",      desc: "Build, compete and win.",             Icon: Trophy,            accent: "#7c3aed", tape: "rgba(240,100,175,0.65)",  emoji: "🏆" },
  { to: "/resources/programs",       label: "Programs",        desc: "Fellowships & cohorts to apply to.",  Icon: Rocket,            accent: "#f97316", tape: "rgba(175,135,255,0.70)",  emoji: "🚀" },
  { to: "/resources/courses",        label: "Courses",         desc: "Curated learning paths.",             Icon: BookOpen,          accent: "#d955a4", tape: "rgba(255,215,55,0.80)",   emoji: "📚" },
  { to: "/resources/tools",          label: "Tools",           desc: "The stack we swear by.",              Icon: Wrench,            accent: "#0ea5e9", tape: "rgba(240,100,175,0.65)",  emoji: "🛠️" },
  { to: "/resources/articles",       label: "Articles",        desc: "Reading worth your time.",            Icon: Newspaper,         accent: "#7c3aed", tape: "rgba(175,135,255,0.70)",  emoji: "📰" },
  { to: "/resources/videos",         label: "Videos",          desc: "Watch and learn.",                    Icon: Video,             accent: "#d955a4", tape: "rgba(255,215,55,0.80)",   emoji: "🎥" },
  { to: "/resources/books",          label: "Books",           desc: "Books we love.",                      Icon: Library,           accent: "#f97316", tape: "rgba(240,100,175,0.65)",  emoji: "📖" },
  { to: "/resources/role-models",    label: "Role Models",     desc: "Indian women leading in tech.",       Icon: Star,              accent: "#d955a4", tape: "rgba(175,135,255,0.70)",  emoji: "⭐" },
  { to: "/resources/people",         label: "People to Follow",desc: "Voices worth listening to.",          Icon: UserPlus,          accent: "#7c3aed", tape: "rgba(255,215,55,0.80)",   emoji: "🙌" },
  { to: "/resources/communities",    label: "Communities",     desc: "Find your tribe.",                    Icon: Users,             accent: "#0ea5e9", tape: "rgba(240,100,175,0.65)",  emoji: "💜" },
  { to: "/resources/roadmaps",       label: "Roadmaps",        desc: "Career playbooks.",                   Icon: Map,               accent: "#f97316", tape: "rgba(175,135,255,0.70)",  emoji: "🗺️" },
  { to: "/resources/interview-prep", label: "Interview Prep",  desc: "Ace the interview.",                  Icon: BriefcaseBusiness, accent: "#d955a4", tape: "rgba(255,215,55,0.80)",   emoji: "💼" },
  { to: "/resources/certifications", label: "Certifications",  desc: "Validate your skills.",               Icon: Award,             accent: "#7c3aed", tape: "rgba(240,100,175,0.65)",  emoji: "🏅" },
] as const;

/* rotation pattern cycles through cards */
const rotations = [-2.5, 2, -1.5, 3, -3, 1.5, -2, 2.5, -1, 3, -2.5, 1, -3, 2];

function ResourcesHub() {
  return (
    <div className="relative w-full min-h-screen bg-[#fef9f4] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700&display=swap');

        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-run {
          display: flex;
          width: 200%;
          animation: ticker 28s linear infinite;
        }

        /* subtle dot texture on bg */
        .cork-bg::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(180,100,60,0.10) 1px, transparent 0);
          background-size: 28px 28px;
        }
      `}</style>

      <div className="cork-bg" />

      {/* ───────────── HERO ───────────── */}
      <section className="relative z-10 pt-28 md:pt-36 pb-0 px-6 overflow-hidden">

        {/* blobs */}
        <div className="absolute -left-24 top-10 h-[30rem] w-[30rem] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,120,180,0.4), transparent 70%)" }} />
        <div className="absolute right-0 top-0 h-[22rem] w-[22rem] rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(160,100,255,0.35), transparent 70%)" }} />
        <div className="absolute left-1/2 bottom-0 h-[18rem] w-[40rem] -translate-x-1/2 blur-3xl opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,230,100,0.3), transparent 70%)" }} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-0 items-end">

            {/* left: text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#d955a4] font-black mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                ✦ curated for you ✦
              </motion.p>

              {/* stacked heading — different from home's pink-bar style */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="font-black text-gray-900 uppercase leading-[0.92]"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "clamp(3.4rem, 10vw, 8.5rem)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  Every
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                  className="italic font-semibold text-[#d955a4] leading-[0.92]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(3.4rem, 10vw, 8.5rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  resource
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
                  className="font-black text-gray-900 uppercase leading-[0.92]"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "clamp(3.4rem, 10vw, 8.5rem)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  you need.
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.5 }}
                className="mt-6 text-sm md:text-[15px] text-gray-500 max-w-sm leading-relaxed font-medium"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Hand-picked. No fluff. Scholarships to roadmaps — pinned here for you.
              </motion.p>
            </div>

            {/* right: designer mascot sitting at edge */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="hidden md:flex items-end justify-end self-end"
            >
              <img
                src={designerIdle}
                alt="designer mascot"
                className="w-[160px] lg:w-[200px] object-contain pointer-events-none"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ───────────── TICKER ───────────── */}
      <div className="relative z-10 w-full overflow-hidden border-y border-[#edd8e8] py-3 mt-10">
        <div className="ticker-run">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex whitespace-nowrap items-center px-4 w-1/2 justify-around">
              {[
                "Scholarships ✦", "Hackathons ✦", "Courses ✦",
                "Roadmaps ✦", "Role Models ✦", "Communities ✦",
                "Interview Prep ✦", "Books ✦", "Tools ✦",
              ].map((t) => (
                <span
                  key={t}
                  className="text-[#d955a4] font-black text-[9px] md:text-[11px] tracking-[0.18em] uppercase mx-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ───────────── SCRAPBOOK BOARD ───────────── */}
      <section className="relative z-10 py-16 md:py-24 px-6">

        {/* faint center glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[60rem] blur-3xl opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,200,230,0.4), transparent 70%)" }} />

        <div className="container mx-auto max-w-7xl relative z-10">

          {/* divider label */}
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <div className="flex-1 h-px bg-gray-200" />
            <span
              className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-gray-400 font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              📌 pinned for you
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* card grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
            {categories.map(({ to, label, desc, Icon, accent, tape, emoji }, idx) => {
              const rot = rotations[idx] ?? 0;
              return (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 36, rotate: rot * 1.5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: rot }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: (idx % 5) * 0.06,
                    type: "spring",
                    stiffness: 72,
                    damping: 14,
                  }}
                  whileHover={{ rotate: 0, scale: 1.06, zIndex: 50 }}
                  className="relative"
                  style={{ zIndex: 10 }}
                >
                  <Link to={to} className="block h-full">
                    <div
                      className="relative pt-9 pb-6 px-5 bg-white rounded-2xl border border-gray-100 shadow-[3px_5px_18px_rgba(0,0,0,0.09)] group transition-shadow duration-300 hover:shadow-[4px_10px_28px_rgba(217,85,164,0.18)]"
                    >
                      {/* tape strip */}
                      <div
                        className="absolute -top-3 left-1/2 w-11 h-5 rounded-sm z-20"
                        style={{
                          background: tape,
                          transform: "translateX(-50%) rotate(-1deg)",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.10)",
                        }}
                      />

                      {/* emoji sticker top-right corner */}
                      <span className="absolute top-2 right-3 text-base select-none">{emoji}</span>

                      {/* icon */}
                      <div
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, ${accent}22, ${accent}44)`,
                          border: `1.5px solid ${accent}33`,
                        }}
                      >
                        <Icon className="h-4 w-4" style={{ color: accent }} />
                      </div>

                      {/* label */}
                      <h3
                        className="mt-3 text-[13px] font-black text-gray-900 leading-tight"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {label}
                      </h3>

                      {/* desc */}
                      <p
                        className="mt-1.5 text-[11px] text-gray-400 leading-relaxed"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {desc}
                      </p>

                      {/* explore link */}
                      <span
                        className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold transition-all duration-200 group-hover:gap-2"
                        style={{ color: accent, fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Explore
                        <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>

                      {/* bottom accent line */}
                      <div
                        className="absolute bottom-0 inset-x-0 h-[3px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── CTA — clean white card, no pink block ───────────── */}
      <section className="relative z-10 py-16 md:py-20 px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative bg-white rounded-3xl border border-gray-100 shadow-[0_6px_30px_rgba(0,0,0,0.07)] overflow-visible"
          >
            <div className="flex flex-col md:flex-row items-center md:items-end gap-0">

              {/* text content */}
              <div className="flex-1 px-8 py-10 md:px-12 md:py-12">
                <p
                  className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#d955a4] font-bold mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Missing something?
                </p>
                <h2
                  className="text-2xl md:text-3xl font-black text-gray-900 leading-tight"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Know a resource{" "}
                  <br className="hidden md:block" />
                  <span
                    className="italic font-semibold text-[#d955a4]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    we should add?
                  </span>
                </h2>
                <p
                  className="mt-3 text-sm text-gray-500 max-w-sm leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Help us build the most complete stack for women in tech across India.
                </p>

                <div className="mt-8">
                  <a
                    href="mailto:girlsleadingtech@gmail.com"
                    className="relative inline-block active:scale-95 transition-transform duration-100"
                  >
                    <img src={pixelBtn} alt="Suggest a Resource" className="w-[196px] h-auto" />
                    <span
                      className="absolute inset-0 flex items-center justify-center text-black font-bold"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: "clamp(0.58rem, 0.9vw, 0.82rem)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Suggest one →
                    </span>
                  </a>
                </div>
              </div>

              {/* community-girl mascot sitting at bottom-right of card */}
              <div className="hidden md:block w-[160px] lg:w-[190px] shrink-0 self-end">
                <img
                  src={communityIdle}
                  alt="community mascot"
                  className="w-full h-auto object-contain"
                />
              </div>

            </div>

            {/* mobile mascot */}
            <div className="md:hidden flex justify-center pb-6">
              <img src={communityIdle} alt="community mascot" className="w-32 h-auto object-contain" />
            </div>

          </motion.div>
        </div>
      </section>

    </div>
  );
}