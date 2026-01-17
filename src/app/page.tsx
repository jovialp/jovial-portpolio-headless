import { fetchHomePage } from "@/services/home-page";
import { Hero } from "@/components/Hero";
import { ProjectPreview } from "@/components/ProjectPreview";

export default async function HomePage() {
  const homePageData = await fetchHomePage();

  return (
    <>
      <Hero data={homePageData.hero} />

      <ProjectPreview
        projects={homePageData.projects}
        content={homePageData.featuredProjectsSection}
      />
    </>
  );
}
