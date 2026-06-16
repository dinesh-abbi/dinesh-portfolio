export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
  stack: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "drugparadigm",
    title: "DrugParadigm & Tantrik",
    subtitle: "AI Research Infrastructure",
    description:
      "Built the entire frontend and monitoring dashboards for a 15-node GPU research cluster used for drug-discovery AI inference. Designed secure auth with SuperTokens, created real-time cluster health dashboards, and wrote Playwright load-testing suites that caught 3 critical performance bottlenecks before the system went live.",
    detail:
      "The system runs pharmaceutical AI models on NVIDIA DGX GPUs via JupyterHub. My Playwright suites simulated concurrent researcher sessions to expose bottlenecks at the gateway layer — issues that would have caused data loss mid-inference. The monitoring dashboard visualizes GPU utilization, model queue depth, and memory pressure in real time.",
    stack: ["React", "Vite", "NestJS", "SuperTokens", "Playwright", "JupyterHub"],
    tags: ["AI Infrastructure", "Load Testing", "Secure Auth"],
  },
  {
    id: "tesseract",
    title: "Tesseract & Project School",
    subtitle: "AI-Powered EdTech Suite",
    description:
      "Tesseract auto-generates, assigns, and grades MCQs and assignments using the Gemini API — cutting manual grading work for faculty. Project School is a companion app for milestone-driven student–mentor project management, both actively used in production across multiple colleges.",
    detail:
      "Tesseract integrates Gemini API at multiple points: question generation from syllabus content, answer evaluation with rubric-based scoring, and personalized feedback generation. I built the Redux state machine coordinating real-time timer tracking, question sequencing, and autosaving — as well as the anti-cheating UI layer.",
    stack: ["React", "Redux", "NestJS", "Gemini API", "PostgreSQL"],
    tags: ["Gemini API", "Auto-Grading", "EdTech"],
  },
  {
    id: "trinetra",
    title: "Trinetra & Sanchit",
    subtitle: "Cross-Campus Enterprise Platform",
    description:
      "Academic management software running live across KMIT, NGIT, KMEC, and KMCE — 4 engineering colleges serving 10,000+ students. A 5-level RBAC system (Admin, Director, HOD, Teacher, Student) with centralized analytics eliminated manual record-keeping and reduced reporting effort by ~60%.",
    detail:
      "The multi-tenant architecture isolates data between institutions while enabling aggregated director-level reporting. I designed the PostgreSQL schema for cross-campus student record routing, implemented granular role checks in NestJS guards, and built the analytics dashboards that replaced 12+ manual spreadsheet processes.",
    stack: ["React", "Vite", "NestJS", "PHP", "PostgreSQL", "RBAC"],
    tags: ["Enterprise", "Multi-tenant", "10,000+ Users"],
  },
  {
    id: "catalyst",
    title: "Catalyst",
    subtitle: "AI Fitness & Hydration Tracker",
    description:
      "A cross-platform React Native app with an embedded Gemini AI wellness coach that tracks workouts, hydration, and nudges you when you're slipping. Custom UI/UX, adaptive icons, and push notification reminders — all optimized for mobile performance.",
    detail:
      "The Gemini integration acts as a context-aware conversational coach — it sees your logged workout history and hydration data before responding, making advice personalized rather than generic. I optimized SQLite read performance to ensure zero-latency log updates, and configured Android push notifications to respect the user's activity patterns.",
    stack: ["React Native", "Gemini API", "SQLite", "Android", "Push Notifications"],
    tags: ["Mobile", "AI Coach", "React Native"],
  },
];
