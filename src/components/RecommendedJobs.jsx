import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useParams } from "react-router-dom";

export default function RecommendedJobs() {
  const { id: resumeId } = useParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get(`/recommended-jobs/${resumeId}`);

        console.log("🤖 AI JOB RESPONSE:", res.data);

        setJobs(res.data || []);
      } catch (err) {
        console.error("Failed to fetch recommended jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [resumeId]);

  if (loading) {
    return (
      <p style={{ opacity: 0.6, marginTop: 20 }}>
        🤖 AI is analyzing your resume...
      </p>
    );
  }

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Recommended Jobs 🤖</h2>

      {jobs.length === 0 && (
        <p style={{ opacity: 0.6 }}>No strong matches yet.</p>
      )}

      <div style={styles.grid}>
        {jobs.map((job) => (
          <div key={job.id} style={styles.card}>

            {/* ===== TOP ROW ===== */}
            <div style={styles.headerRow}>
              <h3 style={styles.jobTitle}>{job.title}</h3>

              {job.match_score && (
                <span style={styles.matchBadge}>
                  {job.match_score}% Match
                </span>
              )}
            </div>

            {/* ===== COMPANY ===== */}
            <p style={styles.company}>{job.company}</p>

            {/* ===== AI EXPLANATION ===== */}
            {job.explanation && (
              <div style={styles.aiBox}>
                <span style={styles.aiLabel}>AI Insight</span>
                <p style={styles.aiText}>{job.explanation}</p>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   PREMIUM DARK UI STYLES
===================================================== */

const styles = {

  wrapper: {
    marginTop: 30,
  },

  title: {
    fontSize: "26px",
    marginBottom: "20px",
    fontWeight: 600,
  },

  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  card: {
    padding: "22px",
    borderRadius: "16px",
    background:
      "linear-gradient(145deg, rgba(35,35,35,0.9), rgba(20,20,20,0.9))",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
    transition: "all 0.25s ease",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  jobTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 600,
  },

  company: {
    marginTop: 6,
    opacity: 0.65,
    fontSize: "15px",
  },

  matchBadge: {
    background: "rgba(0, 180, 255, 0.15)",
    color: "#45d1ff",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 500,
  },

  aiBox: {
    marginTop: 14,
    padding: "12px",
    borderRadius: "10px",
    background: "rgba(0,150,255,0.08)",
    border: "1px solid rgba(0,150,255,0.15)",
  },

  aiLabel: {
    fontSize: "11px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    opacity: 0.6,
  },

  aiText: {
    marginTop: 6,
    fontSize: "14px",
    lineHeight: 1.4,
    color: "#9fdcff",
  },
};