export interface TechCategory {
  name: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: TechCategory[];
  href?: string;
  repo?: string;
  presentation?: string;
  image?: string;
}
