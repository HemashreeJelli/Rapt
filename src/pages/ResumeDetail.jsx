import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import RecommendedJobs from "../components/RecommendedJobs.jsx";
import "./ResumeDetail.css";

export default function ResumeDetail() {
  const { id } = useParams();
  const location = useLocation();

  const [resume, setResume] = useState(location.state?.resume || null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `https://rapt-backend.onrender.com/analysis/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setAnalysis(data);
      } catch (err) {
        console.error("Failed to fetch analysis", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!analysis) {
    return <div className="container">No analysis found.</div>;
  }

  const feedbackJson =
    typeof analysis.feedback_json === "string"
      ? JSON.parse(analysis.feedback_json)
      : analysis.feedback_json || {};

  const sectionScores = feedbackJson.section_scores || {};
  const insights = feedbackJson.insights || [];
  const missingSkills =
    typeof analysis.missing_skills === "string"
      ? JSON.parse(analysis.missing_skills)
      : analysis.missing_skills || [];

  return (
    <div className="container">
      <div className="resume-detail-layout">

        {/* ================= HEADER ================= */}
        <div className="analysis-card header-card">
          <h1 className="score-massive">{analysis.score}</h1>
          <div className="meta-row">
            <span className="badge">
              {feedbackJson.seniority_estimate || "student"}
            </span>
            <span className="word-count">
              {feedbackJson.word_count} words
            </span>
          </div>
        </div>

        {/* ================= SECTION HEALTH ================= */}
        <div className="analysis-card">
          <h2>Section Health</h2>
          {Object.entries(sectionScores).map(([key, value]) => (
            <div key={key} className="progress-row">
              <span className="progress-label">{key}</span>
              <progress className="custom-progress" value={value} max="25" />
              <span className="progress-value">{value}/25</span>
            </div>
          ))}
        </div>

        {/* ================= SKILL GAPS ================= */}
        <div className="analysis-card">
          <h2>Missing Core Skills</h2>
          {missingSkills.length === 0 ? (
            <p className="success-text">No major skill gaps detected</p>
          ) : (
            <div className="skill-container">
              {missingSkills.map((skill, index) => (
                <span key={index} className="missing-skill">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ================= AI INSIGHTS ================= */}
        <div className="analysis-card">
          <h2>AI Resume Insights</h2>
          {insights.length === 0 ? (
            <p>No insights available.</p>
          ) : (
            insights.map((text, i) => (
              <p key={i} className="ai-line">
                {text}
              </p>
            ))
          )}
        </div>
        
        <RecommendedJobs />
      </div>
    </div>
  );
}