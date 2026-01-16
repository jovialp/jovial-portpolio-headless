import Link from "next/link";
import { ProjectRow } from "./ProjectRow";
import { ProjectData } from "@/types";

type ProjectPreviewProps = {
  readonly projects: ProjectData[];
};

export function ProjectPreview({ projects }: ProjectPreviewProps) {
  return (
    <section className="section-spacing border-t border-border">
      <div className="section-container">
        <div>
          {/* Header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="label mb-3">Selected Work</p>
              <p className="heading-md text-3xl font-medium">Recent projects</p>
            </div>

            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hidden md:block"
            >
              View all projects →
            </Link>
          </div>

          {/* Project list */}
          <div className="space-y-1">
            {projects?.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Mobile CTA */}
          <Link
            href="/projects"
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mt-8 md:hidden"
          >
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
