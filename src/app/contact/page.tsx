import { RichTextRenderer } from "@/components/RichTextRenderer";
import { fetchContactPage } from "@/lib/contact-page";
import { Mail, Github, Linkedin, PhoneCall } from "lucide-react";
import Link from "next/link";

const CONTACT_CONFIG = {
  email: {
    icon: Mail,
    getHref: (value: string) => `mailto:${value}`,
    description: "Preferred for initial contact",
    external: false,
  },
  github: {
    icon: Github,
    getHref: (value: string) => value,
    description: "Open source contributions",
    external: true,
  },
  linkedin: {
    icon: Linkedin,
    getHref: (value: string) => value,
    description: "Professional background",
    external: true,
  },
  phone: {
    icon: PhoneCall,
    getHref: (value: string) => `tel:${value}`,
    description: "Preferred for initial contact",
    external: false,
  },
} as const;

const Contact = async () => {
  const contactPageData = await fetchContactPage();
  const { contacts, notes, header } = contactPageData;
  return (
    <section className="section-spacing">
      <div className="section-container">
        <header className="max-w-3xl mb-20">
          <p className="label mb-6">{header.title}</p>
          <h1 className="heading-lg mb-8">{header.heading}</h1>
          <p className="body-lg">{header.description}</p>
        </header>

        <div className="max-w-xl">
          <div className="space-y-8">
            {contacts.map((contact, i) => {
              const config = CONTACT_CONFIG[contact.contactType];
              if (!config) return null;

              const Icon = config.icon;

              return (
                <Link
                  key={contact.name}
                  href={config.getHref(contact.name)}
                  target={config.external ? "_blank" : undefined}
                  rel={config.external ? "noopener noreferrer" : undefined}
                  className={[
                    "group flex items-center gap-6 py-6 border-t border-border card-hover -mx-6 px-6",
                    i == contacts.length - 1 && "border-b",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />

                  <div>
                    <p className="text-foreground group-hover:text-primary transition-colors duration-200">
                      {contact.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {config.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-16 p-8 bg-card border border-border rounded-lg">
            <h2 className="heading-sm mb-4">{notes.title}</h2>
            <RichTextRenderer className="body-sm" content={notes.content} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
