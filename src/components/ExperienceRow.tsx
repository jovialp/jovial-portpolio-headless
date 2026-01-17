import { formatDate } from "@/lib/utils";
import { ExperienceData } from "@/types";

const ExperienceRow = ({ experience }: { experience: ExperienceData }) => {
  return (
    <div key={experience.company} className="relative">
      {/* Timeline indicator */}
      <div className="absolute -left-4 top-0 w-px h-full bg-linear-to-b from-primary/50 to-transparent hidden md:block" />
      <div className="absolute -left-1.75 top-1 w-2 h-2 rounded-full bg-primary hidden md:block" />

      <div className="md:pl-8">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3 gap-2">
          <div>
            <h3 className="text-xl font-medium text-foreground">
              {experience.role}
            </h3>
            <p className="text-primary font-medium">{experience.company}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="mono text-sm text-muted-foreground">
              {formatDate(experience.startDate)} –{" "}
              {experience.isCurrent || !experience.endDate
                ? "Present"
                : formatDate(experience.endDate)}
            </span>
            {experience.isCurrent && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-medium text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />{" "}
                Current
              </span>
            )}
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4">
          {experience.location}
        </p>
        <p className="body-md mb-6">{experience.summary}</p>

        <ul className="space-y-2">
          {experience.responsibilities.map((resp) => (
            <li
              key={resp.id}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <span className="text-primary mt-1.5">›</span>
              <span>{resp.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceRow;
