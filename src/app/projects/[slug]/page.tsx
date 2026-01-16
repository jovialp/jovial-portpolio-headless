import { RichTextRenderer } from "@/components/RichTextRenderer";
import { fetchProjectBySlug } from "@/lib/project";
import {
  ArrowLeft,
  Calendar,
  Users,
  Building2,
  ExternalLink,
  Github,
  FileText,
  Zap,
} from "lucide-react";
import Link from "next/link";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const ProjectDetail = async ({ params }: PageProps) => {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  console.log("ProjectDetail---", slug, project);

  if (!project) {
    return (
      <div className="section-spacing section-container">
        <p className="body-lg">Project not found.</p>
        <Link
          href="/projects"
          className="text-primary hover:underline mt-4 inline-block"
        >
          ← Back to projects
        </Link>
      </div>
    );
  }

  const techCategories = [
    { label: "Frontend", items: project.technology.frontend },
    { label: "Backend", items: project.technology.backend },
    { label: "Database", items: project.technology.database },
    { label: "Infrastructure", items: project.technology.infrastructure },
  ].filter((cat) => cat.items.length > 0);

  return (
    <article className="section-spacing">
      <div className="section-container">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All projects</span>
        </Link>

        {/* Header */}
        <header className="max-w-4xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mono uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {project.engagement.projectType}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                Featured
              </span>
            )}
          </div>

          <h1 className="heading-lg mb-6">{project.title}</h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="mono text-sm">{project.engagement.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="mono text-sm">
                {formatDate(project.timeline.startDate)} –{" "}
                {formatDate(project.timeline.endDate)} (
                {project.timeline.durationLabel})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="mono text-sm">
                Team of {project?.engagement?.teamSize || "N/A"}
              </span>
            </div>
          </div>

          {project?.engagement?.role && (
            <p className="label mt-6 text-foreground">
              {project.engagement.role}
            </p>
          )}
        </header>

        <div className="space-y-20 md:space-y-28">
          {/* Problem */}
          {project?.caseStudy?.problem && (
            <section>
              <h2 className="heading-md mb-8 pb-4 border-b border-border flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <span className="text-destructive text-sm">01</span>
                </span>{" "}
                Problem
              </h2>
              <RichTextRenderer
                className="body-lg max-w-3xl text-foreground/90 leading-relaxed"
                content={project.caseStudy.problem}
              />
            </section>
          )}

          {/* Solution */}
          {project?.caseStudy?.solution && (
            <section>
              <h2 className="heading-md mb-8 pb-4 border-b border-border flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-sm">02</span>
                </span>{" "}
                Solution
              </h2>
              <RichTextRenderer
                className="body-lg max-w-3xl text-foreground/90 leading-relaxed"
                content={project.caseStudy.solution}
              />
            </section>
          )}

          {/* Responsibilities */}
          <section>
            <h2 className="heading-md mb-8 pb-4 border-b border-border flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground text-sm">03</span>
              </span>{" "}
              Key Responsibilities
            </h2>
            <ul className="space-y-4 max-w-3xl">
              {project?.caseStudy?.responsibilities?.map((r, i) => (
                <li key={r.item} className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded bg-muted flex items-center justify-center shrink-0 mt-0.5">
                    <span className="mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="body-md text-foreground/90">{r.item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Impact */}
          <section>
            <h2 className="heading-md mb-8 pb-4 border-b border-border flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-green-500" />
              </span>{" "}
              Impact
            </h2>
            <RichTextRenderer
              className="body-lg max-w-3xl text-foreground/90 leading-relaxed"
              content={project.caseStudy.impact}
            />
            {project.metrics.performanceGain && (
              <div className="mt-6 p-4 rounded-lg bg-green-500/5 border border-green-500/20 max-w-3xl">
                <p className="mono text-sm text-green-600 dark:text-green-400">
                  📈 {project.metrics.performanceGain}
                </p>
              </div>
            )}
            {project.metrics.notes && (
              <p className="mt-4 mono text-sm text-muted-foreground max-w-3xl">
                {project.metrics.notes}
              </p>
            )}
          </section>

          {/* Tech Stack */}
          <section>
            <h2 className="heading-md mb-8 pb-4 border-b border-border flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground text-sm">04</span>
              </span>{" "}
              Technology Stack
            </h2>
            <div className="grid gap-8 md:grid-cols-2 max-w-3xl">
              {techCategories.map((category) => (
                <div key={category.label}>
                  <h3 className="label mb-4 text-muted-foreground">
                    {category.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item.id}
                        className="mono text-sm px-3 py-1.5 bg-accent/50 rounded-md text-foreground border border-border/50"
                      >
                        {item.tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {project.technology.architectureNotes && (
              <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border max-w-3xl">
                <p className="label mb-2 text-muted-foreground">
                  Architecture Notes
                </p>
                <RichTextRenderer
                  className="body-md text-foreground/80"
                  content={project.technology.architectureNotes}
                />
              </div>
            )}
          </section>

          {/* Links */}
          {(project.links.liveUrl ||
            project.links.githubUrl ||
            project.links.caseStudyUrl) && (
            <section>
              <h2 className="heading-md mb-8 pb-4 border-b border-border">
                Links
              </h2>
              <div className="flex flex-wrap gap-4">
                {project.links.liveUrl && (
                  <a
                    href={project.links.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live
                  </a>
                )}
                {project.links.githubUrl && (
                  <a
                    href={project.links.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {project.links.caseStudyUrl && (
                  <a
                    href={project.links.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Full Case Study
                  </a>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-24 pt-12 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="body-lg text-foreground mb-2">
                Interested in working together?
              </p>
              <p className="text-muted-foreground">
                Let&apos;s discuss how I can help with your next project.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              Get in touch
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectDetail;
