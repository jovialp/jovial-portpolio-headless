export type NavigationItem = {
  label: string;
  href: string;
};

export type PayloadResponse<T> = {
  docs: T[];
};

export type LexicalNode = {
  type: string;
  version?: number;
  children?: LexicalNode[];
  text?: string;
  format?: number;
  tag?: string;
  url?: string;
  rel?: string;
  target?: string;
  direction?: "ltr" | "rtl" | null;
};

export type RichTextContent = {
  root: LexicalNode;
};

interface Responsibility {
  item: string;
}

interface Technology {
  id: string;
  tech: string;
}

export interface ProjectData {
  id: number;
  title: string;
  slug: string;
  status: string;
  description: RichTextContent;
  featured: boolean;
  timeline: {
    startDate: string;
    endDate: string;
    durationLabel: string;
  };
  engagement: {
    company: string;
    projectType: string;
    role: string;
    teamSize: number;
  };
  caseStudy: {
    problem: RichTextContent;
    solution: RichTextContent;
    responsibilities: Responsibility[];
    impact: RichTextContent;
  };
  technology: {
    frontend: Technology[];
    backend: Technology[];
    database: Technology[];
    infrastructure: Technology[];
    architectureNotes: RichTextContent;
  };
  links: {
    liveUrl: string | null;
    githubUrl: string | null;
    caseStudyUrl: string | null;
  };
  metrics: {
    users: string | null;
    performanceGain: string | null;
    uptime: string | null;
    notes: string | null;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

export interface ExperienceData {
  visible: boolean;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  summary?: string;
  responsibilities: { id: string; text: string }[];
}

export interface SkillData {
  name: string;
  category: string;
  proficiency?: string;
  order: number;
  visible: boolean;
}
