import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "invitekz",
    title: "InviteKZ",
    description: "Платформа для создания и управления электронными приглашениями на события. Полнофункциональное веб-приложение с современным стеком технологий и автоматизированным CI/CD.",
    tech: [
      {
        name: "Tooling & Infrastructure",
        items: ["NX (Monorepo)", "ESLint", "Prettier"]
      },
      {
        name: "Frontend",
        items: ["Next.js", "Vite", "TypeScript", "Zustand", "Axios", "Tailwind"]
      },
      {
        name: "Backend",
        items: ["Nest.js", "TypeORM", "PostgreSQL", "JWT Authentication", "Bcrypt"]
      },
      {
        name: "DevOps",
        items: ["Docker", "Nginx", "GitLab CI/CD"]
      },
      {
        name: "Testing",
        items: ["Playwright (E2E)", "Vitest", "Jest (Unit)"]
      }
    ],
    presentation: "https://www.canva.com/design/DAG90HGlBPY/05LVy8HjY5O3SC_U48i-fQ/view?utm_content=DAG90HGlBPY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h02a0771382#1",
    repo: "https://gitlab.com/esdp-ajs-22-1/invitekz",
    image: "/images/image.png",
  },
];

export default projects;
