import { ProjectRow } from "@/components/ProjectRow";
import { fetchProjects } from "@/lib/project";

const Projects = async () => {
  const projects = await fetchProjects();
  return (
    <section className="section-spacing">
      <div className="section-container">
        <header className="max-w-3xl mb-20">
          <p className="label mb-6">Projects</p>
          <h1 className="heading-lg mb-8">Selected work</h1>
          <p className="body-lg">
            Production systems I&apos;ve designed and built. Each project
            represents real engineering challenges, real trade-offs, and real
            impact.
          </p>
        </header>

        <div className="space-y-1">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
