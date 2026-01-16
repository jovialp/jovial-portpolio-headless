const About = () => {
  return (
    <article className="section-spacing">
      <div className="section-container">
        <header className="max-w-3xl mb-24">
          <p className="label mb-6">About</p>
          <h1 className="heading-lg mb-8">Engineering as craft</h1>
        </header>

        <div className="max-w-3xl space-y-8">
          <p className="body-lg">
            I'm a senior software engineer focused on distributed systems,
            developer tooling, and production infrastructure. I've spent the
            last decade building systems that other engineers rely on.
          </p>

          <p className="body-md">
            My work sits at the intersection of architecture and implementation.
            I design systems that scale, but I also write the code that makes
            them work. I believe the best architects are the ones who still ship
            production code.
          </p>

          <p className="body-md">
            Currently, I'm particularly interested in developer experience,
            AI-assisted development workflows, and making infrastructure
            invisible to product teams.
          </p>
        </div>

        <section className="mt-32">
          <h2 className="heading-md mb-10 pb-6 border-b border-border">
            Background
          </h2>
          <div className="space-y-12 max-w-3xl">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-lg font-medium text-foreground">
                  Staff Engineer
                </h3>
                <span className="mono text-sm text-muted-foreground">
                  2022 – Present
                </span>
              </div>
              <p className="text-muted-foreground mb-2">
                Infrastructure Platform
              </p>
              <p className="body-sm">
                Leading architecture for internal developer platform. Designing
                systems that enable 500+ engineers to deploy and operate
                services independently.
              </p>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-lg font-medium text-foreground">
                  Senior Engineer
                </h3>
                <span className="mono text-sm text-muted-foreground">
                  2019 – 2022
                </span>
              </div>
              <p className="text-muted-foreground mb-2">Distributed Systems</p>
              <p className="body-sm">
                Built real-time data pipeline processing millions of events
                daily. Designed caching infrastructure serving global traffic.
              </p>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-lg font-medium text-foreground">
                  Software Engineer
                </h3>
                <span className="mono text-sm text-muted-foreground">
                  2016 – 2019
                </span>
              </div>
              <p className="text-muted-foreground mb-2">Backend Engineering</p>
              <p className="body-sm">
                Full-stack development with focus on API design and database
                optimization. Led migration from monolith to microservices.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <h2 className="heading-md mb-10 pb-6 border-b border-border">
            How I work
          </h2>
          <div className="grid gap-12 md:grid-cols-2 max-w-3xl">
            <div>
              <h3 className="label mb-4">Writing</h3>
              <p className="body-sm">
                I document decisions. Design docs, ADRs, runbooks. Clear writing
                is clear thinking.
              </p>
            </div>
            <div>
              <h3 className="label mb-4">Collaboration</h3>
              <p className="body-sm">
                Best work happens in small teams with high trust. I prefer
                working sessions over status meetings.
              </p>
            </div>
            <div>
              <h3 className="label mb-4">Mentorship</h3>
              <p className="body-sm">
                Growing engineers is part of the job. Code review, pairing, and
                honest feedback.
              </p>
            </div>
            <div>
              <h3 className="label mb-4">Ownership</h3>
              <p className="body-sm">
                I ship and operate what I build. On-call is not someone else's
                problem.
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default About;
