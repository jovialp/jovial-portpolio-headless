import { ProjectData } from "@/types";
import Link from "next/link";
import { RichTextRenderer } from "./RichTextRenderer";

type ProjectRowProps = {
  readonly project: ProjectData;
  readonly index: number;
};

export function ProjectRow({ project, index }: ProjectRowProps) {
  const { title, description, technology } = project;

  const techList = [
    ...(technology?.frontend ?? []),
    ...(technology?.backend ?? []),
    ...(technology?.database ?? []),
    ...(technology?.infrastructure ?? []),
  ]?.slice(0, 4);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block py-8 border-t border-border first:border-t-0 card-hover -mx-6 px-6"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Main content */}
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center gap-4 mb-3">
            <span className="mono text-muted-foreground text-xs">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="heading-sm group-hover:text-primary transition-colors duration-200">
              {title}
            </h3>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-6 ml-10 md:ml-0">
          <div className="flex items-center gap-2">
            {techList?.slice(0, 3)?.map?.(({ tech }) => (
              <span
                key={tech}
                className="mono text-xs text-muted-foreground px-2 py-1 bg-accent/50 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
          →
        </div>
      </div>
      <RichTextRenderer content={description} className="body-sm ml-10" />
    </Link>
  );
}
