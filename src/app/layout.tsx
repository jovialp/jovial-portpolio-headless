import type { Metadata } from "next";
import "./globals.css";
import { fetchSiteSettings } from "@/lib/site-settings";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Jovial P Thomas — Senior Software Engineer",
  description:
    "Architect-level software engineer with a frontend-first and AI-forward mindset. SSR-first, accessibility-first, production-grade systems.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await fetchSiteSettings();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {siteSettings.navigation && (
          <Header navigation={siteSettings.navigation} />
        )}

        <main
          id="main-content"
          className="flex-1 pt-16 md:pt-20 border-t border-border"
        >
          {children}
        </main>

        <Footer
          navigation={siteSettings?.footerLinks}
          copyright={siteSettings?.footerText}
        />
      </body>
    </html>
  );
}
