import { NavigationItem } from "@/types";
import Link from "next/link";

export function Footer({
  navigation,
  copyright,
}: {
  readonly navigation?: NavigationItem[];
  readonly copyright?: string;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="section-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Copyright */}
          <div>
            <span className="mono text-muted-foreground">
              {copyright} © {currentYear}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {navigation?.map((item) => {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
