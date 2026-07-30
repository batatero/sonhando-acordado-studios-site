export type NavigationItem = {
  label: string;
  href: string;
};

export type Universe = {
  id: string;
  number: string;
  title: string;
  description: string;
  services: string[];
  href: string;
  icon: "story" | "creative" | "ai" | "systems";
};

export type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  status: "disponível" | "em desenvolvimento";
  visual: "cinema" | "world" | "portrait" | "system";
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

