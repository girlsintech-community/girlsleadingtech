import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { GlassCard } from "@/components/site/GlassCard";
import { GradientMesh } from "@/components/site/GradientMesh";
import { socials } from "@/data/socials";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join — Girls Leading Tech" },
      { name: "description", content: "Apply to join the Girls Leading Tech community." },
    ],
  }),
  component: JoinPage,
});

function JoinPage() {
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.href = socials.joinForm;
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6">
      <GradientMesh />
      <GlassCard strong glow className="max-w-md p-10 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
        <h1 className="mt-6 font-display text-3xl text-gradient">Welcome aboard ✨</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Redirecting you to our application form...
        </p>
        <a
          href={socials.joinForm}
          className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-soft"
        >
          Open form now <ArrowRight className="h-4 w-4" />
        </a>
      </GlassCard>
    </section>
  );
}
