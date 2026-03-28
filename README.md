# RAPT Frontend (Recruitment Application Processing Tool)

The RAPT frontend is a high-performance Single Page Application (SPA) built with **React** and **Vite**. It provides a seamless, dark-themed dashboard (Midnight Space UI) designed to manage the entire placement lifecycle from both the Candidate and Recruiter perspectives.

## 🚀 Core Features & Functionality

### 🎓 Candidate (Student) Flow
* **Authentication & Profile Management:** Secure login via Supabase. First-time users are seamlessly guided to complete their profile (major, graduation year).
* **Resume Management & Upload:** A dedicated drag-and-drop interface (`UploadBox`) allows students to upload their resumes. The platform tracks different versions of uploaded resumes for iterative feedback.
* **AI Resume Analysis:** Once uploaded, the backend analyzes the document and the frontend visualizes the results:
  * **Overall Match Score:** Highlighted via dynamic SVG rings and massive typography.
  * **Section Health:** Custom progress bars indicating the robustness of Education, Experience, and Skills sections.
  * **Skill Gap Analysis:** Color-coded dynamic chips showing both acquired and missing core skills based on industry standards.
  * **AI Insights:** Real-time qualitative feedback rendered directly from the backend AI engine.
* **Smart Job Matches:** The system pairs the candidate's vector-embedded resume with active job postings and displays recommended jobs sorted by match percentage.

### 🏢 Recruiter Flow
* **Role-Based Access Control:** The application dynamically adjusts routing, API endpoints, and navigation links (via the context-aware `Navbar`) if the authenticated user is a Recruiter.
* **Job Posting Generation:** Recruiters can input job details (title, description, required skills). The frontend packages this data and sends it to the FastAPI backend for immediate vector-embedding.
* **Applicant Tracking System (ATS):** A localized dashboard for recruiters to filter job postings and review candidate applications, enriched with an AI-generated match score for rapid shortlisting.

## 🛠️ Architecture & Tech Stack

* **Framework:** React 19 + Vite for ultra-fast HMR and optimized production builds.
* **Routing:** `react-router-dom` using nested `<ProtectedRoute>` wrappers to restrict unregistered users and separate recruiter/student boundaries.
* **API Communication:** An `axios` instance intercepts all incoming/outgoing requests, automatically attaching the JWT Bearer token natively stored in `localStorage`.
* **State Management:** Lean local component state management with `useState` and `useEffect`, leveraging React Router's location state to pass complex analytics objects seamlessly between dashboard and analysis pages.

## 🎨 UI/UX Design System (Midnight Space)

The application abandons massive external CSS libraries in favor of a bespoke, token-driven vanilla CSS system (`global.css` and `index.css`).

* **Glassmorphism:** Elegant use of `backdrop-filter: blur()` applied to core panels (`.analysis-card`, `.job-card`) to create a floating sensation over the deep space background.
* **Dynamic Interactions:** High-contrast focus states, hover micro-animations, and fluid transitions make for an extremely responsive layout that passes comprehensive accessibility scaling.

## 💻 Local Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Environment Variables**:
   Ensure you have configured your local `.env` file pointing accurately to the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as well as ensuring the FastAPI backend URL is correctly configured in your `fetch`/`axios` endpoints.
3. **Start the Dev Server**:
   ```bash
   npm run dev
   ```
