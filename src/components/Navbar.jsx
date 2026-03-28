import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleBrandClick = () => {
    if (role === "recruiter") navigate("/recruiter")
    else navigate("/dashboard");
  }

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="navbar">
      <div className="navbar-brand" onClick={handleBrandClick}>
        RAPT.
      </div>

      {role === "recruiter" ? (
        <div className="nav-links">
          <button className={`nav-btn ${isActive("/recruiter")}`} onClick={() => navigate("/recruiter")}>Dashboard</button>
          <button className={`nav-btn ${isActive("/recruiter/add-job")}`} onClick={() => navigate("/recruiter/add-job")}>Post a Job</button>
          <button className={`nav-btn ${isActive("/recruiter/applications")}`} onClick={() => navigate("/recruiter/applications")}>Applications</button>
        </div>
      ) : (
        <div className="nav-links">
          <button className={`nav-btn ${isActive("/dashboard")}`} onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className={`nav-btn ${isActive("/resumes")}`} onClick={() => navigate("/resumes")}>Resume Versions</button>
          <button className={`nav-btn ${isActive("/upload")}`} onClick={() => navigate("/upload")}>Upload</button>
          <button className={`nav-btn ${isActive("/jobs")}`} onClick={() => navigate("/jobs")}>Job Listings</button>
        </div>
      )}

      <div className="logout-wrap">
        <button onClick={handleLogout} className="nav-btn logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}