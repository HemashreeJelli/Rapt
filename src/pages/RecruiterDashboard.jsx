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

      <h1>Recruiter Dashboard</h1>

      <p>
        Welcome {profile?.full_name || "Recruiter"} 👋
      </p>

      {/* ⭐ MAIN ACTIONS */}
      <div style={{ marginTop: "20px" }} prove-style>

        <button
          onClick={() => navigate("/recruiter/add-job")}
          style={{ marginRight: "10px" }}
        >
          ➕ Add Job
        </button>

        <button
          onClick={() => navigate("/recruiter/applications")}
        >
          📄 View Applications
        </button>

      </div>

      {/* ⭐ FUTURE SECTION */}
      <div style={{ marginTop: "40px" }}>
        <h3>Quick Info</h3>

        <p>
          From here you can create jobs, review applicants, and manage hiring
          decisions using AI recommendations.
        </p>
      </div>

      <div style={{ marginTop: "40px" }}>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
}

export default RecruiterDashboard;