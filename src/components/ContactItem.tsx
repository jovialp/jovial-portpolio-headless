import Link from "next/link";
import React from "react";

const ContactItem = ({
  contact,
  config,
  isLast,
}: {
  contact: { name: string };
  config: {
    icon: React.ComponentType<{ className: string }>;
    getHref: (value: string) => string;
    description: string;
    external: boolean;
  };
  isLast: boolean;
}) => {
  const Icon = config.icon;
  return (
    <Link
      key={contact.name}
      href={config.getHref(contact.name)}
      target={config.external ? "_blank" : undefined}
      rel={config.external ? "noopener noreferrer" : undefined}
      className={[
        "group flex items-center gap-6 py-6 border-t border-border card-hover -mx-6 px-6",
        isLast && "border-b",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />

      <div>
        <p className="text-foreground group-hover:text-primary transition-colors duration-200">
          {contact.name}
        </p>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </div>
    </Link>
  );
};

export default ContactItem;
