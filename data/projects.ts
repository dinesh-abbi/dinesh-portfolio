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
    id: "trinetra",
    title: "Trinetra & Sanchit",
    subtitle: "Cross-Campus Enterprise Platform",
    description:
      "Academic management software and data distribution platform deployed live across KMIT, NGIT, KMEC, and KMCE — 4 engineering colleges serving 10,000+ students. Features a 5-tier RBAC system (Admin, Director, HOD, Teacher, Student) with centralized analytics that reduced HOD manual reporting by ~60%.",
    detail:
      "Architected the NestJS schema-driven backend with role-isolated data access and RESTful APIs consumed by the React frontend. Centralized student data, assignment tracking, and teaching-quality metrics into a single unified platform.",
    stack: ["React", "Vite", "NestJS", "PHP", "PostgreSQL", "RBAC"],
    tags: ["Enterprise", "Multi-tenant", "10,000+ Users"],
  },
  {
    id: "drugparadigm",
    title: "DrugParadigm & Tantrik",
    subtitle: "AI Research Infrastructure",
    description:
      "Secure frontend and load-testing infrastructure for sensitive drug-discovery AI models inferencing on DGX GPU servers. Authored Playwright load-testing suites across a 15-node JupyterHub cluster, identifying 3 critical performance bottlenecks before launch.",
    detail:
      "Implemented secure authentication and session management using SuperTokens. Built real-time monitoring dashboards giving researchers live visibility into GPU utilization and inference queues.",
    stack: ["React", "Vite", "NestJS", "SuperTokens", "Playwright", "JupyterHub"],
    tags: ["AI Infrastructure", "Load Testing", "GPU Cluster"],
  },
  {
    id: "tesseract",
    title: "Tesseract & Project School",
    subtitle: "AI-Powered EdTech Suite",
    description:
      "Multi-role assessment platform with AI-generated assignments and student milestone tracking. Built an AI assessment engine using the Gemini API that auto-generates, assigns, and grades MCQs and assignments.",
    detail:
      "Shipped companion Project School app for milestone-driven project tracking where mentors assign stages, review demos, and issue grades within a single interface. Optimized state management using Redux.",
    stack: ["React", "Redux", "NestJS", "Gemini API", "TypeScript", "PostgreSQL"],
    tags: ["Gemini API", "State Management", "EdTech"],
  },
  {
    id: "vv-kaksha",
    title: "VV Kaksha",
    subtitle: "Interactive K-10 Educational PWA",
    description:
      "Tablet-optimized Progressive Web App with interactive mechanics for K-10 classroom activities. Developed complex drag-and-drop puzzle mechanics with real-time feedback designed for low-powered tablet hardware.",
    detail:
      "Delivered offline capabilities and achieved 100% responsive coverage across all mobile, tablet, and desktop breakpoints.",
    stack: ["React", "TypeScript", "PWA", "Responsive UI/UX"],
    tags: ["Progressive Web App", "Interactions", "Education"],
  },
  {
    id: "roboparadigm",
    title: "RoboParadigm",
    subtitle: "Robotics Showcase Website",
    description:
      "Marketing and showcase website for a robotics company featuring an interactive 3D robot model. Integrated interactive Three.js graphics and scroll-driven Hero section animations.",
    detail:
      "Converted a robot model from Blender to GLB format and rendered it live in the browser using Three.js — giving visitors a real-time, interactive 3D product view.",
    stack: ["React", "TypeScript", "Three.js", "Framer Motion", "TanStack Router", "Tailwind CSS"],
    tags: ["Three.js", "3D Rendering", "Framer Motion"],
  },
  {
    id: "applied-robotics",
    title: "Applied Robotics Otto DIY Workshop",
    subtitle: "Hardware & IoT Curriculum",
    description:
      "Engineered and programmed bipedal, humanoid, and quadruped robots from scratch using Arduino Nano and ESP32-CAM. Built wireless Android control interfaces students use to operate robots over BLE.",
    detail:
      "Calibrated servos, troubleshot hardware wiring, and authored comprehensive step-by-step workshop documentation covering wiring, servo calibration, and Otto Blockly programming.",
    stack: ["Arduino Nano", "ESP32-CAM", "Otto Blockly", "Android", "BLE", "Servo Control"],
    tags: ["IoT", "Hardware", "Robotics"],
  },
  {
    id: "catalyst",
    title: "Catalyst",
    subtitle: "AI Fitness & Hydration Tracker",
    description:
      "Cross-platform mobile app for workout and hydration tracking with an AI wellness coach. Integrated Gemini API as an in-app conversational coach that responds to user activity data in context.",
    detail:
      "Built from scratch in React Native with custom UI/UX, adaptive icons, and push notification reminders.",
    stack: ["React Native", "Gemini API", "SQLite", "Android", "Push Notifications"],
    tags: ["Mobile App", "Gemini API", "SQLite"],
  },
];
