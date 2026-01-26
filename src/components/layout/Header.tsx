"use client";
import { NavigationItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
  readonly navigation: NavigationItem[];
};

export function Header({ navigation }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.min.svg"
              alt="Jovial P Thomas"
              width={52}
              height={52}
            />
            <Link
              href="/"
              className="mono text-foreground hover:text-primary transition-colors duration-200"
            >
              jovial.
            </Link>
          </div>

          <ul className="flex items-center gap-8 md:gap-10">
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
