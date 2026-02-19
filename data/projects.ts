import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "portfolio-1",
    title: "Personal portfolio",
    description: "Portfolio site built with Next.js, TypeScript and Tailwind CSS.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    href: "#",
    repo: "#",
    image: "/images/project-placeholder.svg",
  },
  {
    id: "project-2",
    title: "Example app",
    description: "A small demo app showing components and routing.",
    tech: ["React", "API"],
    href: "#",
    repo: "#",
    image: "/images/project-placeholder.svg",
  },
];

export default projects;
