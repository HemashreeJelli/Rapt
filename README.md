## 🎨 Frontend Architecture & UX Design

The RAPT frontend is a high-performance Single Page Application (SPA) built with **React** and **Vite**. It features a custom **"Midnight Space"** design system, providing recruiters and candidates with a completely responsive, highly interactive, and premium dark-themed experience.

### 1. Custom "Midnight Space" Design System

* **Centralized Design Tokens:** Fully customized CSS variables (`var(--color-bg-base)`, `var(--color-primary)`, etc.) to enforce strict theme consistency without relying on heavy external UI frameworks.
* **Glassmorphism:** Elegant use of `backdrop-filter: blur()` to create glass-like translucent cards (`.analysis-card`, `.resume-card`) floating cleanly over the deep space background.
* **Micro-Animations & Aesthetics:** Smooth, subtle hover transitions and custom glowing drop shadows keep the application feeling alive and responsive.
* **Typography:** Integrates modern sans-serif fonts (**Outfit** for headings, **Inter** for readable body text) via Google Fonts.

### 2. Component-Driven Layouts

* **Context-Aware Navigation (`Navbar`):** A smart sidebar that dynamically adapts based on User Role (Candidate vs. Recruiter), seamlessly injecting the exact tools each user needs without changing pages.
* **Drag-and-Drop Interactive Uploads (`UploadBox`):** A custom-designed file uploader featuring animated hit-boxes, feedback states, and glowing accents to replace the clunky default browser input.
* **Responsive Data Visualization:** 
  * Large glowing typography for overall match scores.
  * Custom CSS gradient progress bars for section health (Experience, Education, etc).
  * Array mapping of "missing skills" translated directly into structured, color-coded skill chips (`.skill`, `.missing-skill`).

### 3. State Management & Navigation

* **React Router:** Handles complex protected routing and shared layout states (`AppLayout.jsx`), ensuring that sensitive dashboard data is only accessible to authenticated users.
* **Axios Interceptors:** A centralized API client that automatically attaches JWT tokens to every outgoing request, simplifying secure communication with the FastAPI backend.
* **Location State:** Efficiently passes resume data and API feedback directly between the upload, dashboard, and detail views to reduce unnecessary API latency.
