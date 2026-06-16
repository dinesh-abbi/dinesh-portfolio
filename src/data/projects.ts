export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  stack: string[];
  contributions: string[];
  metrics: string[];
  url?: string;
}

export const projectsData: Project[] = [
  {
    id: "trinetra-sanchit",
    title: "Trinetra & Sanchit",
    shortDescription: "Enterprise academic platform with 5-level RBAC, managing 10,000+ students across 4 colleges.",
    fullDescription: "An end-to-end multi-tenant enterprise academic administration and database platform. Designed to centralize college administration, streamline academic records, handle multi-campus data routing, and support granular role-based authorization for administrative staff, professors, department heads, auditors, and students.",
    stack: ["React", "NestJS", "PHP", "PostgreSQL", "Tailwind CSS"],
    contributions: [
      "Designed and implemented a 5-level Role-Based Access Control (RBAC) security system.",
      "Optimized complex PostgreSQL queries and reporting procedures to support 10,000+ active students.",
      "Developed high-throughput data import utilities that cut processing time for student records by 45%.",
      "Created dynamic dashboards with real-time academic analytics for college directors."
    ],
    metrics: ["10,000+ Students", "4 Colleges", "5-Level RBAC"]
  },
  {
    id: "drug-paradigm",
    title: "DrugParadigm",
    shortDescription: "AI drug discovery infrastructure powered by a 15-node DGX JupyterHub cluster.",
    fullDescription: "A high-performance computing infrastructure dashboard and gateway for chemical and drug discovery research. Integrates secure user directories with distributed high-performance AI environments, featuring monitoring of active training logs, multi-GPU node scheduling, and real-time load analytics.",
    stack: ["React", "SuperTokens", "Playwright", "JupyterHub", "Docker", "NVIDIA DGX"],
    contributions: [
      "Configured and managed JupyterHub gateway instances running on a 15-node NVIDIA DGX cluster.",
      "Implemented secure single sign-on (SSO) and session management utilizing SuperTokens.",
      "Created automated end-to-end browser testing and load simulation suites using Playwright to evaluate scheduler resilience.",
      "Designed clean cluster resource monitoring dashboards visualizing live CPU/GPU temperatures, workloads, and memory utilization."
    ],
    metrics: ["15 GPU Nodes", "DGX JupyterHub", "Playwright Tested"]
  },
  {
    id: "tesseract",
    title: "Tesseract",
    shortDescription: "AI-powered assessment platform generating custom MCQs and grading via Gemini API.",
    fullDescription: "An intelligent evaluation platform that leverages large language models to ingest academic content, auto-generate contextual assessments (MCQ, short answer), perform semantic auto-grading, and render comprehensive student feedback reports.",
    stack: ["React", "Redux", "NestJS", "Gemini API", "PostgreSQL", "Tailwind CSS"],
    contributions: [
      "Integrated Gemini API for dynamic, syllabus-aligned question generation and structural grading evaluation.",
      "Built Redux state slices to coordinate real-time timer tracking, question sequencing, and autosaving of student answers.",
      "Implemented a secure assessment-proctoring UI that restricts copy-pasting, tab switching, and window resizing.",
      "Engineered automated rubric grading pipelines that output detailed score breakdowns and feedback suggestions."
    ],
    metrics: ["Gemini API", "Auto-grading", "Proctored UI"]
  },
  {
    id: "project-school",
    title: "Project School",
    shortDescription: "Full project lifecycle tracking application featuring milestones, evaluations, and mentor reviews.",
    fullDescription: "A collaborative management portal designed for tracking student project milestones. Organizes the entire execution lifecycle—from proposal submissions, advisor pairings, weekly sprint reviews, and progress tracking, to final grading panels and evaluation reports.",
    stack: ["React", "Redux", "NestJS", "PostgreSQL", "Tailwind CSS"],
    contributions: [
      "Designed a flexible milestone-tracking workflow allowing students to upload deliverables and mentors to review synchronously.",
      "Created custom notification dispatchers informing users of review deadlines, grade updates, and file submissions.",
      "Implemented interactive grading panels where multiple evaluators can score students independently on predefined rubrics.",
      "Integrated secure file storage and version logs for all project deliverables."
    ],
    metrics: ["Milestone Tracker", "Grade Rubrics", "Real-time Alerts"]
  },
  {
    id: "catalyst",
    title: "Catalyst",
    shortDescription: "AI fitness & hydration tracker featuring a Gemini-powered personal wellness coach.",
    fullDescription: "A mobile-first lifestyle assistant that tracks user physical exercises, water intake, and caloric balance. Features natural language coaching conversations, routine generation, and interactive hydration reminder schedules.",
    stack: ["React Native", "Gemini API", "Android", "TypeScript", "SQLite"],
    contributions: [
      "Developed a responsive cross-platform layout optimized for mobile screens using React Native.",
      "Implemented an interactive chat screen connecting users to a fine-tuned Gemini AI health coach for personalized diet and workout tips.",
      "Optimized local storage operations using SQLite to log workout history and water logs with zero latency.",
      "Configured local push notifications on Android to trigger customized hydration alerts based on hourly user activity."
    ],
    metrics: ["React Native", "AI Coach", "Android PWA"]
  },
  {
    id: "vv-kaksha",
    title: "VV Kaksha",
    shortDescription: "PWA educational platform for low-powered devices, with drag & drop interfaces.",
    fullDescription: "A lightweight Progressive Web Application (PWA) tailored to deliver quality interactive classroom environments in regions with poor connectivity or on low-spec hardware. Supports offline document caching, real-time board updates, and simplified drag-and-drop assignments.",
    stack: ["React PWA", "Service Workers", "Dexie.js", "Tailwind CSS", "WebSockets"],
    contributions: [
      "Configured robust Service Workers and Dexie.js IndexedDB integration, allowing students to access cached course lessons offline.",
      "Designed a highly intuitive, performant drag-and-drop assignment submission panel.",
      "Integrated lightweight WebSocket rooms to distribute real-time classroom activities with minimal payload size.",
      "Optimized image compression pipelines and web asset sizes to achieve a Lighthouse performance score of 98+ on mobile."
    ],
    metrics: ["Offline PWA", "Dexie.js Caching", "98+ Performance"]
  }
];
