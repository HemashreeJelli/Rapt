import { useEffect, useState } from "react";
import ResumeCard from "../components/resume/ResumeCard";

export default function Resumes() {

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchResumes = async () => {

      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          "https://rapt-backend.onrender.com/my-resumes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setResumes(data);

      } catch (err) {
        console.error("Failed to load resumes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();

  }, []);

  return (
    <div className="container">

      <h1>Your Resume Versions</h1>

      {loading && <p>Loading...</p>}

      {!loading && resumes.length === 0 && (
        <p>No resumes uploaded yet.</p>
      )}

      <div className="resume-grid">
        {resumes.map((r) => (
          <ResumeCard key={r.id} resume={r} />
        ))}
      </div>

    </div>
  );
}