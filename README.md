# Dinesh Abbi - Personal Portfolio

A production-ready, highly animated personal portfolio website for **Dinesh Abbi**, a Software Developer based in Hyderabad, India, featuring 3+ years of experience at Teleparadigm. 

Designed with modern typography, smooth scroll controls, interactive elements, custom mouse tracking, responsive page transitions, and serverless contact delivery.

## 🛠 Tech Stack

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Anime.js v4 (staggered reveals, typing effects, custom updates, button hover lifts)
- **Transitions**: Framer Motion (page changes, modal exit/entrance)
- **Routing**: React Router v7 (SPA declarative mode)
- **Form Control**: React Hook Form + Zod (validation schemas)
- **Email Delivery**: Resend SDK (Vercel Serverless Function `/api/contact`)
- **Notifications**: Sonner (toast popups)
- **Scroll Utility**: Lenis (buttery smooth scrolling integration)
- **Icons**: Lucide React

---

## 📂 File Structure

```
Portfolio/
├── api/
│   └── contact.ts       # Vercel serverless function (Resend integration)
├── public/
│   └── resume.pdf       # Downloadable resume document
├── src/
│   ├── components/
│   │   ├── layout/      # Navbar, Footer, SmoothScroll
│   │   ├── sections/    # Hero, Stats, About, Projects, Contact
│   │   └── ui/          # CustomCursor
│   ├── data/
│   │   ├── projects.ts  # 6 Detailed academic/office projects datasets
│   │   └── skills.ts    # Skill percents and categories
│   ├── hooks/
│   │   └── useCursor.ts # Cursor tracking logic
│   ├── lib/
│   │   └── cn.ts        # Tailwind CSS class merge utility
│   ├── pages/
│   │   ├── Home.tsx     # Hero & Stats
│   │   ├── About.tsx    # Bio, skills, timeline
│   │   ├── Projects.tsx # Masonry grid + modals
│   │   └── Contact.tsx  # Contact info + validated form
│   ├── App.tsx          # Root routes and transitions
│   ├── index.css        # Global CSS theme & overrides
│   └── main.tsx         # Entrypoint with BrowserRouter
├── vercel.json          # Deployment routing & functions specs
├── .env.example         # Environment variables template
└── package.json         # Dependencies registry
```

---

## 🚀 Getting Started

### 1. Prerequisite
Ensure you have **Node.js** installed (v18.0.0 or higher, recommended v20+).

### 2. Installation
Clone the repository, navigate into the project directory, and install the npm dependencies:
```bash
npm install
```

### 3. Environment Setup
Copy the env template and replace the placeholder with your actual Resend API Key:
```bash
cp .env.example .env
```
Inside `.env`, edit the following:
```env
RESEND_API_KEY=re_your_resend_api_key_here
```

### 4. Running Locally
Run the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

*Note: Serverless API routes under `api/` will simulate successful mail submission during local development if `RESEND_API_KEY` is not present, allowing offline testing.*

---

## ⚡ Deployment on Vercel

The website is fully optimized for **Vercel** serverless environments. 

To deploy:
1. Push this code to a GitHub repository.
2. Import the project in your Vercel Dashboard.
3. In the Vercel project settings, add the Environment Variable:
   - **Key**: `RESEND_API_KEY`
   - **Value**: *[Your Resend API Key]*
4. Deploy the project. Vercel automatically detects `vercel.json` and configures the SPA rewrites and Node.js serverless functions in the `api/` directory.
