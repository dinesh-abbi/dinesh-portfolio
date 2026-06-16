export interface Skill {
  name: string;
  percentage: number;
}

export interface TechCategory {
  title: string;
  items: string[];
}

export const skillsData: Skill[] = [
  { name: "TypeScript", percentage: 90 },
  { name: "React", percentage: 90 },
  { name: "NestJS", percentage: 80 },
  { name: "PostgreSQL", percentage: 75 },
  { name: "React Native", percentage: 70 },
  { name: "Python", percentage: 65 }
];

export const techCategoriesData: TechCategory[] = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "PHP", "SQL", "HTML5", "CSS3"]
  },
  {
    title: "Libraries & Frameworks",
    items: ["React", "React Native", "Redux Toolkit", "NestJS", "Express", "Tailwind CSS", "Framer Motion", "Anime.js"]
  },
  {
    title: "Database & Backend Tools",
    items: ["PostgreSQL", "MySQL", "SQLite", "Prisma", "SuperTokens", "Node.js"]
  },
  {
    title: "Infrastructure & DevOps",
    items: ["Docker", "JupyterHub", "Playwright", "NVIDIA DGX Cluster", "Vercel", "Git / GitHub", "WebSockets"]
  }
];

export const timelineData = [
  {
    role: "Software Developer",
    company: "Teleparadigm",
    duration: "Jul 2023 – Present",
    description: "Building enterprise EdTech platforms (Trinetra & Sanchit), AI-powered assessment platforms (Tesseract), and managing high-performance GPU infrastructure clusters (DrugParadigm) for drug discovery research."
  },
  {
    role: "B.Tech in Computer Science & Engineering",
    company: "KMIT (Keshav Memorial Institute of Technology)",
    duration: "2019 – 2023",
    description: "Specialized in Computer Science, software design patterns, and application engineering. Developed core web platforms and PWAs during academic years."
  }
];
