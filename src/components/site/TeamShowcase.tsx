import MemberProfileCard from "@/components/site/MemberProfileCard";
import type { TeamMember } from "@/data/types";

interface TeamShowcaseProps {
  filteredTeam: TeamMember[];
}

export default function TeamShowcase({ filteredTeam }: TeamShowcaseProps) {
  return (
    <div className="w-full mt-10">
      {/* MEET THE TEAM HEADER */}
      <div className="mb-12">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        `}</style>
        <div className="relative inline-block">
          <h2
            className="
              font-['Anton']
              uppercase
              text-black
              leading-none
              tracking-[-0.02em]
              select-none
              pointer-events-none
              text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              relative
              z-0
            "
          >
            MEET
          </h2>

          {/* PINK LABEL */}
          <div
            className="
              absolute
              z-10
              bottom-[5%]
              right-[-8%]
              sm:right-[-10%]
              md:right-[-12%]
              lg:right-[-15%]
              rotate-[-8deg]
              bg-[#d955a4]
              px-3
              sm:px-4
              md:px-5
              py-1
              shadow-lg
              whitespace-nowrap
            "
          >
            <span
              className="
                font-['Anton']
                uppercase
                text-black
                leading-none
                text-base
                sm:text-lg
                md:text-xl
                lg:text-2xl
              "
            >
              THE TEAM
            </span>
          </div>
        </div>
      </div>

      {/* TEAM MEMBERS GRID */}
      {filteredTeam.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-12">
          No matches. Try a different search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredTeam.map((member, index) => (
            <MemberProfileCard
              key={member.id}
              name={member.name}
              role={member.role}
              location={member.city && member.state ? `${member.city}, ${member.state}` : member.city || member.state}
              locationType="location"
              delay={index}
              linkedin={member.linkedin}
              image={member.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}
