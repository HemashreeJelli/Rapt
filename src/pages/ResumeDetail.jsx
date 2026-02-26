import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import RecommendedJobs from "../components/RecommendedJobs.jsx";

export default function ResumeDetail() {

  const { id } = useParams();         // ⭐ ALWAYS trust URL
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

        console.log("FETCHED ANALYSIS:", data);

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
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  if (!analysis) {
    return <div style={{ padding: 40 }}>No analysis found.</div>;
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
    <div style={styles.page}>

      {/* ================= HEADER ================= */}
      <div style={styles.headerCard}>
        <h1 style={styles.score}>{analysis.score}</h1>

        <div style={styles.metaRow}>
          <span style={styles.badge}>
            {feedbackJson.seniority_estimate || "student"}
          </span>

          <span style={styles.wordCount}>
            {feedbackJson.word_count} words
          </span>
        </div>
      </div>

      {/* ================= SECTION HEALTH ================= */}
      <div style={styles.card}>
        <h2>Section Health</h2>

        {Object.entries(sectionScores).map(([key, value]) => (
          <div key={key} style={styles.progressRow}>
            <span style={styles.label}>{key}</span>

            <progress value={value} max="25" style={styles.progress} />

            <span>{value}/25</span>
          </div>
        ))}
      </div>

      {/* ================= SKILL GAPS ================= */}
      <div style={styles.card}>
        <h2>Missing Core Skills</h2>

        {missingSkills.length === 0 ? (
          <p>No major skill gaps detected 🎉</p>
        ) : (
          <div style={styles.chipContainer}>
            {missingSkills.map((skill, index) => (
              <span key={index} style={styles.chip}>
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ================= AI INSIGHTS ================= */}
      <div style={styles.card}>
        <h2>AI Resume Insights</h2>

        {insights.length === 0 ? (
          <p>No insights available.</p>
        ) : (
          insights.map((text, i) => (
            <p key={i} style={styles.insight}>
              ✨ {text}
            </p>
          ))
        )}
      </div>
      <RecommendedJobs />
    </div>
  );
}


/* =====================================================
   BASIC STYLING
===================================================== */

const styles = {
  page: {
    padding: "30px",
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    color: "#ffffff",            // 🔥 make all text visible
  },

  headerCard: {
    padding: "20px",
    borderRadius: "12px",
    background: "#1f1f1f",       // darker card
  },

  score: {
    fontSize: "48px",
    margin: 0,
    color: "#ffffff",
  },

  metaRow: {
    marginTop: "10px",
    display: "flex",
    gap: "12px",
  },

  badge: {
    padding: "6px 12px",
    background: "#000",
    color: "#fff",
    borderRadius: "999px",
    fontSize: "12px",
  },

  wordCount: {
    fontSize: "14px",
    color: "#bbbbbb",
  },

  card: {
    background: "#1f1f1f",        // 🔥 match dark theme
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
  },

  progressRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "10px",
  },

  label: {
    width: "100px",
    textTransform: "capitalize",
    color: "#ffffff",
  },

  progress: {
    flex: 1,
    height: "8px",
    accentColor: "#4da3ff",   // 🔥 bright progress color
  },

  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  chip: {
    background: "#333333",   // 🔥 visible chip bg
    color: "#ffffff",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
  },

  insight: {
    marginBottom: "8px",
    color: "#ffffff",
  },
};