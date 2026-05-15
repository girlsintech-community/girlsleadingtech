import { PageHeader } from "@/components/site/PageHeader";
import { GlassCard } from "@/components/site/GlassCard";
import { Sparkles } from "lucide-react";

export function ComingSoonResource({
  category,
  title,
  description,
}: {
  category: string;
  title: string;
  description: string;
}) {
  return (
    <>
      <PageHeader
        eyebrow={`Resources / ${category}`}
        title={title}
        description={description}
      />
      <section className="container mx-auto max-w-2xl px-6 pb-32">
        <GlassCard strong glow className="p-10 text-center md:p-14">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-soft">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h2 className="mt-6 font-display text-2xl">Curating in progress</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Our team is hand-picking the very best for this section. Bookmark and check back soon — or follow our newsletter for the drop.
          </p>
        </GlassCard>
      </section>
    </>
  );
}
