import { useNavigate } from "react-router-dom";   // 🔥 NEW

export default function ResumeCard({ resume }) {

  const navigate = useNavigate();   // 🔥 NEW

  const analysis = resume.analysis?.[0];

  if (!analysis) {
    return (
      <div className="card">
        <h3>{resume.file_name}</h3>
        <p>No analysis yet</p>
      </div>
    );
  }

  const skills =
    typeof analysis?.skills === "string"
        ? JSON.parse(analysis.skills)
        : analysis?.skills || [];

  const missing =
    typeof analysis?.missing_skills === "string"
        ? JSON.parse(analysis.missing_skills)
        : analysis?.missing_skills || [];

  const feedbackData =
    typeof analysis?.feedback_json === "string"
        ? JSON.parse(analysis.feedback_json)
        : analysis?.feedback_json || {};

  const feedback = feedbackData.feedback || {};

  return (
  <div
    className="resume-card"
    onClick={() =>
      navigate(`/resume/${resume.id}`, { state: { resume } })
    }
  >
    <div className="resume-left">
      <h3>{resume.file_name}</h3>

      <p className="score">
        Score: <span>{analysis.score}</span>
      </p>
    </div>

  </div>
);
}