import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear the authentication data
    localStorage.removeItem("token");
    
    // 2. Redirect the user to the login or landing page
    navigate("/");
    
    // Optional: Force a page reload if you want to clear all app state
    // window.location.reload(); 
  };

  return (
    <div className="navbar">
      <h3 onClick={() => navigate("/dashboard")} style={{ cursor: 'pointer' }}>
        RAPT
      </h3>

      <div className="nav-links">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/resumes")}>Resume Versions</button>
        <button onClick={() => navigate("/upload")}>Upload</button>
        <button onClick={() => navigate("/jobs")}>Job Listings</button>
        
        {/* 🔥 NEW LOGOUT BUTTON */}
        <button 
          onClick={handleLogout} 
          className="logout-btn"
          style={{ backgroundColor: '#ff4d4d', color: 'white' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}