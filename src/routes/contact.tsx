import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { GlassCard } from "@/components/site/GlassCard";
import { Mail, Send } from "lucide-react";
import { socials } from "@/data/socials";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Girls Leading Tech" },
      { name: "description", content: "Reach out to the Girls Leading Tech team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say hi. We'll be quick."
        description="Partnerships, press, mentor offers, or just a 'hello' — our inbox is always open."
      />
      <section className="container mx-auto max-w-2xl px-6 pb-20">
        <GlassCard glow className="p-8 text-center md:p-12">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-soft">
            <Mail className="h-7 w-7 text-white" />
          </div>
          <h2 className="mt-6 font-display text-2xl">Email us</h2>
          <a href={`mailto:${socials.email}`} className="mt-2 inline-block text-lg font-medium text-primary hover:underline">
            {socials.email}
          </a>
          <a
            href={`mailto:${socials.email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3 text-sm font-semibold text-white shadow-soft"
          >
            <Send className="h-4 w-4" /> Open mail
          </a>
        </GlassCard>
      </section>
    </>
  );
}
