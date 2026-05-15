import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: "Events — Girls Leading Tech" }, { name: "description", content: "Upcoming and past events, talks and workshops." }] }),
  component: EventsLayout,
});

function EventsLayout() {
  const { pathname } = useLocation();
  const isPast = pathname.includes("/past");
  const isDetail = /\/events\/[^/]+$/.test(pathname) && !pathname.endsWith("/past") && !pathname.endsWith("/upcoming");

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Talks, workshops, magic."
        description="Live sessions with engineers, founders and creators from the companies you love."
      />
      {!isDetail && (
        <div className="container mx-auto max-w-6xl px-6">
          <div className="glass mx-auto flex w-fit gap-1 rounded-full p-1.5">
            <Link
              to="/events/upcoming"
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition",
                !isPast ? "gradient-primary text-white shadow-soft" : "text-foreground/70 hover:text-primary",
              )}
            >
              Upcoming
            </Link>
            <Link
              to="/events/past"
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition",
                isPast ? "gradient-primary text-white shadow-soft" : "text-foreground/70 hover:text-primary",
              )}
            >
              Past
            </Link>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}
