import ExperienceRow from "@/components/ExperienceRow";
import HowIWorkItem from "@/components/HowIWorkItem";
import { RichTextRenderer } from "@/components/RichTextRenderer";
import Skill from "@/components/Skill";
import { fetchAboutPage } from "@/services/about-page";

const About = async () => {
  const aboutData = await fetchAboutPage();

  return (
    <article className="section-spacing">
      <div className="section-container">
        {/* Header */}
        <header className="max-w-3xl mb-24">
          <p className="label mb-6">{aboutData?.summarySection?.label}</p>
          <h1 className="heading-lg mb-8">{aboutData?.pageTitle}</h1>
        </header>

        {/* Summary */}
        <div className="max-w-3xl space-y-6 mb-32">
          <RichTextRenderer
            className="body-lg"
            content={aboutData?.summarySection?.description}
          />
        </div>

        {/* Experience Section */}
        <section className="mb-32">
          <h2 className="heading-md mb-10 pb-6 border-b border-border">
            {aboutData?.experienceSectionLabel}
          </h2>
          <div className="space-y-16 max-w-3xl">
            {aboutData?.experience?.map((exp) => (
              <ExperienceRow key={exp.company} experience={exp} />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-32">
          <h2 className="heading-md mb-10 pb-6 border-b border-border">
            {aboutData.skillSectionLabel}
          </h2>
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-3">
              {aboutData?.skills?.map((skill) => (
                <Skill key={skill.name} skill={skill} />
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground mono">
              Proficiency levels: Expert • Advanced • Intermediate
            </p>
          </div>
        </section>

        {/* How I Work Section */}
        <section>
          <h2 className="heading-md mb-10 pb-6 border-b border-border">
            {aboutData?.howIWorkSection?.label}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 max-w-3xl">
            {aboutData?.howIWorkSection?.items.map((item, index) => (
              <HowIWorkItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};

export default About;
