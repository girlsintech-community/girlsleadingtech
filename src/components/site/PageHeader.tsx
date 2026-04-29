import { GradientMesh } from "./GradientMesh";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <GradientMesh />
      <div className="container mx-auto max-w-4xl px-6 text-center animate-fade-up">
        {eyebrow && (
          <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-6 text-5xl font-medium leading-tight md:text-7xl">
          <span className="text-gradient">{title}</span>
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
