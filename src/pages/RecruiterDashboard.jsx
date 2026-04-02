import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecruiterDashboard() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProfile = async () => {

      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          "https://rapt-backend.onrender.com/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setProfile(data);

      } catch (err) {
        console.error("Failed to load recruiter profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  if (loading) {
    return <div>Loading recruiter dashboard...</div>;
  }

  return (
    <div className="container">

      <div className="dashboard-header">
        <h1>Recruiter Dashboard</h1>
      </div>

      <div className="analysis-card">
        <h2>Welcome, {profile?.full_name || "Recruiter"}</h2>
        <p className="company" style={{ marginTop: "8px" }}>
          Manage your company's hiring process and review candidates efficiently.
        </p>

        {/* MAIN ACTIONS */}
        <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
          <button
            className="apply-btn"
            onClick={() => navigate("/recruiter/add-job")}
          >
            Post a New Job
          </button>

          <button
            className="view-analysis-btn"
            onClick={() => navigate("/recruiter/applications")}
          >
            View Applications
          </button>
        </div>
      </div>

      {/* QUICK INFO SECTION */}
      <div className="tracker-grid">
        <div className="tracker-card">
          <h3>Quick Actions</h3>
          <p className="company">
            From here you can create jobs, review applicants, and manage hiring decisions using AI recommendations.
          </p>
        </div>
        <div className="tracker-card">
          <h3>Analytics Overview</h3>
          <p className="company">
            Insights and analytics on your job posts will appear here.
          </p>
        </div>
      </div>

    </div>
  );
}

export default RecruiterDashboard;