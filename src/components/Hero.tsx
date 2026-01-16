import Link from "next/link";
import type { HeroSection } from "@/lib/home-page";

interface HeroProps {
  readonly data: HeroSection;
}

export function Hero({ data }: HeroProps) {
  return (
    <section className="section-spacing relative">
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"
      />

      <div className="section-container relative">
        <div className="max-w-4xl">
          {/* Status */}
          <div
            className="flex items-center gap-3 mb-8 animate-hero-enter"
            style={{ animationDelay: "100ms" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>

            <span className="mono text-xs text-muted-foreground uppercase tracking-widest">
              Available for select projects
            </span>
          </div>

          {/* Headline */}
          <p
            className="heading-xl text-balance optical-align mb-6 animate-hero-enter"
            style={{ animationDelay: "200ms" }}
          >
            {data.headline1}
            <br />
            <span className="text-muted-foreground">{data.headline2}</span>
          </p>

          {/* Description */}
          <p
            className="body-lg max-w-2xl mb-10 animate-hero-enter"
            style={{ animationDelay: "350ms" }}
          >
            {data.description}
          </p>

          {/* Tech stack */}
          <div
            className="flex flex-wrap gap-3 mb-12 animate-hero-enter"
            style={{ animationDelay: "450ms" }}
          >
            {data.techstack?.map((tech) => (
              <span
                key={tech.name}
                className="mono text-xs px-3 py-1.5 border border-border/50 text-muted-foreground"
              >
                {tech.name}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div
            className="flex items-center gap-6 animate-hero-enter"
            style={{ animationDelay: "550ms" }}
          >
            <Link
              href={data.callToAction?.href || "/projects"}
              className="group inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <span>{data.callToAction?.label || "View work"}</span>
              <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>

            <span className="text-border" aria-hidden>
              |
            </span>

            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Decorative line */}
        <div
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block animate-hero-enter"
          style={{ animationDelay: "600ms" }}
        >
          <div className="w-px h-32 bg-linear-to-b from-transparent via-border to-transparent" />
        </div>
      </div>
    </section>
  );
}
