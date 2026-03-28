import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useParams } from "react-router-dom";
import "./RecommendedJobs.css";

export default function RecommendedJobs() {
  const { id: resumeId } = useParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get(`/recommended-jobs/${resumeId}`);
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
      <p className="loading-text">
        🤖 AI is analyzing your resume...
      </p>
    );
  }

  return (
    <div className="recommended-container">
      <h2 className="recommended-title">Recommended Jobs 🤖</h2>

      {jobs.length === 0 && (
        <p className="loading-text">No strong matches yet.</p>
      )}

      <div className="job-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">

            <div className="job-top">
              <h3>{job.title}</h3>

              {job.match_score && (
                <span className="match-pill">
                  {job.match_score}% Match
                </span>
              )}
            </div>

            <p className="company">{job.company}</p>

            {job.explanation && (
              <div className="ai-insight-box">
                <span className="ai-label">AI Insight</span>
                <p className="ai-text">{job.explanation}</p>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}