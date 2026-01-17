import ContactItem from "@/components/ContactItem";
import { RichTextRenderer } from "@/components/RichTextRenderer";
import { fetchContactPage } from "@/services/contact-page";
import { Mail, Github, Linkedin, PhoneCall } from "lucide-react";

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

              return (
                <ContactItem
                  key={contact.name}
                  contact={contact}
                  config={config}
                  isLast={i == contacts.length - 1}
                />
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
