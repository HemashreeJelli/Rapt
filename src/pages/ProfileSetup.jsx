import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileSetup() {

  const [fullName, setFullName] = useState("");
  const [major, setMajor] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ⭐ Load existing profile data
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

        if (data.full_name) setFullName(data.full_name);
        if (data.major) setMajor(data.major);
        if (data.current_year) setCurrentYear(data.current_year);
        if (data.role) setRole(data.role);

      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();

  }, []);

  // ⭐ Save profile
  const handleSave = async () => {

    const token = localStorage.getItem("token");

    setLoading(true);

    try {

      await fetch("https://rapt-backend.onrender.com/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: fullName,
          role: role,
          ...(role === "student" && {
            major,
            current_year: currentYear,
          }),
        }),
      });

      // ⭐ Store role locally
      localStorage.setItem("role", role);

      alert("Profile saved successfully!");

      // ⭐ Redirect based on role
      if (role === "recruiter") {
        navigate("/recruiter");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Complete Your Profile</h1>
      </div>

      <div className="analysis-card" style={{ maxWidth: "600px" }}>
        <p className="company" style={{ marginBottom: "24px" }}>
          Please provide your details below to finalize your account setup.
        </p>

        {/* ⭐ ROLE SELECTOR */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        {/* ⭐ STUDENT ONLY FIELDS */}
        {role === "student" && (
          <>
            <input
              placeholder="Major (e.g. Computer Science)"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />

            <input
              placeholder="Current Year (e.g. Junior)"
              value={currentYear}
              onChange={(e) => setCurrentYear(e.target.value)}
            />
          </>
        )}

        <button 
          className="upload-btn" 
          onClick={handleSave} 
          disabled={loading}
          style={{ width: "100%", marginTop: "12px" }}
        >
          {loading ? "🚀 Saving..." : "✅ Save Profile"}
        </button>
      </div>
    </div>
  );
}

export default ProfileSetup;