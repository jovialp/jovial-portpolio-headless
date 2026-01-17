import Link from "next/link";
import { ProjectRow } from "./ProjectRow";
import { ProjectData } from "@/types";
import { FeaturedProjectsSection } from "@/services/home-page";

type ProjectPreviewProps = {
  readonly projects: ProjectData[];
  readonly content?: FeaturedProjectsSection;
};

export function ProjectPreview({ projects, content }: ProjectPreviewProps) {
  return (
    <section className="section-spacing border-t border-border">
      <div className="section-container">
        <div>
          {/* Header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="label mb-3">{content?.label}</p>
              <p className="heading-md text-3xl font-medium">
                {content?.heading}
              </p>
            </div>

            <Link
              href={content?.ctaHref || "/projects"}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hidden md:block"
            >
              {content?.ctaLabel} →
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
            href={content?.ctaHref || "/projects"}
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mt-8 md:hidden"
          >
            {content?.ctaLabel} →
          </Link>
        </div>
      </div>
    </section>
  );
}
