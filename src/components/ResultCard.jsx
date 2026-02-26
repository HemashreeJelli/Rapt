import { useNavigate } from "react-router-dom";
import RecommendedJobs from "./RecommendedJobs.jsx";

export default function ResultCard({ result, resumeId }) {
  const navigate = useNavigate();

  // 🛡️ Safety guard
  if (!result || !resumeId) return null;

  return (
    <div className="card analysis-card">

      {/* SCORE */}
      <p className="score">
        ATS Score: <span>{result.score}</span>
      </p>

      {/* NAVIGATE TO DETAIL */}
      <button
        className="view-analysis-btn"
        onClick={() =>
          navigate(`/resume/${resumeId}`, {
            state: {
              resume: { id: resumeId }
            }
          })
        }
      >
        View Detailed Analysis →
      </button>

      <RecommendedJobs
   resumeId={result.resume_id}
   token={localStorage.getItem("access_token")}
/>

    </div>
  );
}