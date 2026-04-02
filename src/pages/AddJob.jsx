import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddJob() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    const token = localStorage.getItem("token");

    if (!title || !description) {
      alert("Title and description required");
      return;
    }

    if (!companyName) {
      alert("Company name required");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch(
        "https://rapt-backend.onrender.com/jobs/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            company_name: companyName,
            title,
            description,
            requirements: requirements
              .split(",")
              .map((r) => r.trim())
              .filter(Boolean),
          }),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        alert(data.detail || "Failed to create job");
        return;
      }

      alert("Job created successfully! Embedding generating in background.");

      setTitle("");
      setDescription("");
      setRequirements("");
      setCompanyName("");

      navigate("/recruiter");

    } catch (err) {
      console.error(err);
      alert("Error creating job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <div className="dashboard-header">
        <h1>Create a New Job Listing</h1>
      </div>

      <div className="analysis-card" style={{ maxWidth: "700px" }}>
        <p className="company" style={{ marginBottom: "24px" }}>
          Fill out the details below to post a new job. Candidates will be able to apply immediately.
        </p>

        <input
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Requirements (e.g. React, Node.js, Python)"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />

        <button 
          className="upload-btn"
          onClick={handleSubmit} 
          disabled={loading}
          style={{ width: "100%", marginTop: "12px" }}
        >
          {loading ? "Creating..." : "Create Job Post"}
        </button>
      </div>

    </div>
  );
}

export default AddJob;