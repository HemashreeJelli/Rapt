import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Upload from "./pages/Upload.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProfileSetup from "./pages/ProfileSetup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./components/AppLayout.jsx";
import ResumeDetail from "./pages/ResumeDetail.jsx";
import Resumes from "./pages/Resumes.jsx";
import Jobs from "./pages/Jobs.jsx";
import RecruiterDashboard from "./pages/RecruiterDashboard.jsx";
import AddJob from "./pages/AddJob.jsx";
import RecruiterApplicants from "./pages/RecruiterApplicants.jsx";
import "./styles/global.css"; 


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />

        {/* PROTECTED WITH LAYOUT */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Upload />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/setup-profile"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProfileSetup />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ResumeDetail />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/resumes" element={
          <ProtectedRoute>
            <AppLayout>
              <Resumes />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/jobs" element={
          <ProtectedRoute>
            <AppLayout>
              <Jobs />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route
        path="/recruiter"
        element={
          <ProtectedRoute requiredRole="recruiter">
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/recruiter/add-job"
  element={
    <ProtectedRoute requiredRole="recruiter">
      <AddJob />
    </ProtectedRoute>
  }
/>
      <Route
        path="/recruiter/applications"
        element={
          <ProtectedRoute requiredRole="recruiter">
            <RecruiterApplicants />
          </ProtectedRoute>
        }
      />

      </Routes>
    </BrowserRouter>
  );
}

export default App;