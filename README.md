## 🎨 Frontend Architecture & UX Design

The RAPT frontend is a high-performance Single Page Application (SPA) built with **React** and **Vite**. It is designed to provide recruiters and candidates with a seamless, dark-themed dashboard for managing the entire placement lifecycle.

### 1. Component-Driven UI

The interface is built using a modular component architecture, ensuring reusability and clean code:

* **Dynamic Resume Cards:** Displays candidate scores, seniority estimates, and AI-generated feedback at a glance.
* **Interactive Job Forms:** A specialized interface for recruiters to input job descriptions that are then sent to the backend for vectorization.
* **Real-Time Analysis View:** Visualizes "Section Health" (e.g., Experience, Education) using progress bars and highlights "Missing Core Skills" using dynamic chips.

### 2. State Management & Navigation

* **React Router:** Handles complex protected routing, ensuring that sensitive dashboard data is only accessible to authenticated users.
* **Axios Interceptors:** A centralized API client that automatically attaches JWT tokens to every outgoing request, simplifying secure communication with the FastAPI backend.
* **Location State:** Efficiently passes resume data between the dashboard and detail views to reduce unnecessary API calls.

### 3. Responsive Data Visualization

Since RAPT deals with AI analysis, the frontend translates raw JSON data into human-readable insights:

* **Score Visualization:** Large, high-impact typography for the overall resume match score.
* **Skill Gap Analysis:** Maps arrays of "missing skills" into a clean, searchable chip container for quick review.
* **AI Insights:** A dedicated section for "✨ AI Resume Insights" that renders qualitative feedback directly from the AI engine.

